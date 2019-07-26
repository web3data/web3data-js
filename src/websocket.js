const WebSocket = require('isomorphic-ws')
const {DEFAULT_WEBSOCKET_URL} = require('./constants')
const {is, uuid} = require('./utils')

/**
 * Creates a string in json rpc format.
 * @param {object} options - The json rpc options.
 * @return {string} The json rpc formatted string.
 */
const formatJsonRpc = options => {
  if (!options) return ''
  if (options.params) {
    options.params = Array.isArray(options.params)
      ? options.params
      : [options.params]
  }

  return JSON.stringify({
    jsonrpc: options.version || '2.0',
    method: options.method || 'subscribe',
    id: options.id || 0,
    params: options.params || []
  })
}

const RESPONSE_TYPE = {
  SUB_ACK: 0,
  DATA: 1,
  UNSUB_ACK: 2
}

/**
 * Returns enum corresponding to the response type.
 * @param {object} message - The response message from the server.
 * @return {number} The response type (see constants above).
 */
const responseType = message => {
  if (message.params) {
    return RESPONSE_TYPE.DATA
  }

  if (is.string(message.result)) {
    return RESPONSE_TYPE.SUB_ACK
  }

  if (is.bool(message.result)) {
    return RESPONSE_TYPE.UNSUB_ACK
  }
}

const MAX_RECONNECTS = 3
const NO_DATA_TIMEOUT = 180000 // 3 minutes
const NO_RESPONSE_TIMEOUT = 5000 // 5 seconds

/**
 * Wrapper for Web3data websockets
 */
class WebSocketClient {
  constructor(apiKey, options) {
    this.socket = null
    this.baseWsUrl =
      options && options.websocketUrl
        ? options.websocketUrl
        : DEFAULT_WEBSOCKET_URL
    this.apiKey = apiKey

    // Internal state management
    this.connected = false
    this.reconnects = 0
    this.responseReceived = false
    this.dataReceived = false

    // Keep track of subscriptions, key/value mapping of subscription ID to listeners
    this.registry = {}

    // Key/value mapping of subscription ID to the uuid (hash) of subscription
    this.registrySubIds = {}

    // Keeps track of last data received by subscription key
    this.latestState = {}

    return this
  }

  /**
   * Connects to the websocket server and inits listeners.
   * @param {function} callBack - The method to call once connection process is complete.
   */
  connect(callBack) {
    // Check if connected already, if so skip
    if (!is.null(this.socket)) return

    this.socket = new WebSocket(`${this.baseWsUrl}?x-api-key=${this.apiKey}`)

    // Initialize connection attempt
    this.socket.addEventListener('open', result => {
      console.log('websocket client connection opened')

      this.connected = true

      // Send subscription messages if registered before connection est.
      this._refreshSubscriptions()

      // Bootstrap all the listeners now!
      this._listen()

      // Fire connected callback
      if (callBack) callBack(result)

      setTimeout(() => {
        if (
          !this.responseReceived &&
          is.nonEmptyObject(this.registry) &&
          this.socket
        )
          this.socket.close()
      }, NO_RESPONSE_TIMEOUT)

      setTimeout(() => {
        if (!this.dataReceived && is.nonEmptyObject(this.registry)) {
          this.socket.close()
        }
      }, NO_DATA_TIMEOUT)
    })

    this.socket.addEventListener('error', err => {
      if (callBack && err) {
        callBack('connection error occurred', err)
      } else {
        console.error('connection error occurred')
      }

      this._reconnect()
    })

    this.socket.addEventListener('close', data => {
      console.log('Websocket client connection closed - code', data.code)
      this._reconnect()
    })
  }

  /**
   * Destroys WebSocket i.e. disconnects client and drops reference.
   * @param {function} callBack -The callback function that executes on close.
   */
  disconnect(callBack = null) {
    if (this.socket && this.socket.readyState === 1) {
      this.socket.onclose = callBack
        ? () => callBack('Websocket client connection closed')
        : () => console.log('Websocket client connection closed')
      this.socket.close()
      this.socket = null
    } else {
      console.error('socket is not yet connected')
    }
  }

  /**
   * Creates a new event listener for the specified event. Registers event and callback function.
   * @param {object} An object containing the event name and filters
   * @config {string} eventName - The event for which to listen.
   * @config {object} filters - The extra arguments associated with the subscription.
   * @param {function} callback - The callback function that executes when the
   * specified event is received by the websocket data listener.
   */
  on({eventName, filters}, callback) {
    if (!callback) console.warn('no callback provided')
    if (!eventName) {
      console.error('no event specified')
      return
    }

    const id = uuid({eventName, filters})

    if (this.connected) {
      this._subscribe(eventName, filters)
    }

    this.registry[id] = {}
    this.registry[id].callback = callback
    this.registry[id].args = {eventName, filters}
  }

  /**
   * Subscribes to the first occurrence of an event then unsubscribes.
   * @param {object} An object containing the event name and filters
   * @config {string} eventName - The event for which to listen.
   * @config {object} filters - The extra arguments associated with the subscription.
   * @param {function} callback - The callback function that executes when the
   * specified event is received by the websocket data listener.
   */
  once({eventName, filters}, callback) {
    this.on({eventName, filters}, data => {
      this.off({eventName, filters}, () => {})
      if (callback) callback(data)

      // Kill the callback so that we don't stack em and call more than one
      this.registry[uuid({eventName, filters})].callback = null
    })
  }

  /**
   * Destroys a single event listener. De-registers event and callback function.
   * @param {object} An object containing the event name and filters
   * @config {string} eventName - The event to de-register.
   * @config {object} filters - The extra arguments associated with the subscription.
   * @param {function} callback - The callback function to execute once unsubscribe is complete.
   */
  off({eventName, filters}, callback) {
    if (!callback) console.warn('no callback provided')
    if (!eventName) {
      console.error('no event specified')
      return
    }

    const id = uuid({eventName, filters})
    if (!this.registry[id] || !this.registry[id].subId) {
      console.error(`Not subscribed to: '${eventName}'`)
      return
    }

    // Sends the unsubscribe message to the server
    this._unsubscribe(eventName, filters, id)
    this.registry[id].unsubCallback = callback
  }

  /**
   * Initiates a reconnect given the following conditions:
   * 1. Initial connection doesnt respond within 5 seconds.
   * 2. Connection doesn't get any event within 3 minutes,
   *    and has at least 1 successful subscription.
   * 3. We got a socket error of any kind, see above.
   * @private
   */
  _reconnect() {
    if (this.connected) {
      this.disconnect()
    }

    if (++this.reconnects <= MAX_RECONNECTS) {
      console.log(
        `attempting to reconnect...${this.reconnects}/${MAX_RECONNECTS}`
      )
      this.connect()
    }
  }

  /**
   * Loops through each registry item and sends subscription message.
   * @private
   */
  _refreshSubscriptions() {
    if (!this.registry) return
    for (const {
      args: {eventName, filters}
    } of Object.values(this.registry)) {
      this._subscribe(eventName, filters)
    }
  }

  /**
   * Sets up the on message listener.
   * @private
   */
  _listen() {
    this.socket.addEventListener('message', message => {
      let data
      try {
        data = JSON.parse(message.data)
      } catch (error) {
        console.error('error parsing json request')
        return
      }

      this.responseReceived = true

      switch (responseType(data)) {
        case RESPONSE_TYPE.SUB_ACK:
          this._subHandler(data)
          break
        case RESPONSE_TYPE.DATA:
          this._dataHandler(data)
          break
        case RESPONSE_TYPE.UNSUB_ACK:
          this._unsubHandler(data)
          break
        default:
      }
    })
  }

  /**
   * Handles subscription responses. Registers the server's
   * given subscription Id.
   * @param {object} data - The parsed json data sent from the server.
   * @private
   */
  _subHandler(data) {
    const id = data && data.id ? data.id : ''

    // Map the subscriptionId to the uuid
    this.registrySubIds[data.result] = id
    this.registry[id].subId = data.result
  }

  /**
   * Handles data responses. Calls registered callbacks.
   * @param {object} data - The parsed json data sent from the server.
   * @private
   */
  _dataHandler(data) {
    this.dataReceived = true

    const res =
      data && data.params && data.params.result ? data.params.result : {}
    const subId =
      data && data.params && data.params.subscription
        ? data.params.subscription
        : ''

    // Get the uuid
    const id = this.registrySubIds[subId]

    // Fire individual methods if they exist
    if (this.registry[id] && this.registry[id].callback)
      this.registry[id].callback(res)

    // Store latest state for easy retrieval later
    if (is.notUndefined(this.latestState[id])) this.latestState[id] = res
    // This.reconnects = 0
  }

  /**
   * Handles the unsubscription response. Calls the unsubscribe call back registered in the off method then de-registers the event.
   * @param {object} data - The parsed json data sent from the server.
   * @private
   */
  _unsubHandler(data) {
    const id = data && data.id ? data.id : ''
    const {eventName} = this.registry[id].args
    if (data.result) {
      this.registry[id].unsubCallback(
        `successfully unsubscribed from - ${eventName}`
      )
      delete this.registry[id]
    } else {
      this.registry[id].unsubCallback(
        `Error: Not unsubscribed from - ${eventName}`
      )
    }
  }

  /**
   * Sends subscription message to the websocket connection.
   * @param {string} eventName - The name of the event to subscribe to.
   * @param {object} filters - The extra arguments associated with the subscription.
   * @private
   */
  _subscribe(eventName, filters) {
    const params = is.notUndefined(filters) ? [filters] : []
    const id = uuid({eventName, filters})
    const jsonRpcMessage = formatJsonRpc({id, params: [eventName, ...params]})
    this.socket.send(jsonRpcMessage)
  }

  /**
   * Sends unsubscription message to the websocket connection.
   * @param {string} eventName - The name of the event to unsubscribe from.
   * @param {object} filters - The extra arguments associated with the subscription.
   * @param {*} id - The derived uuid.
   * @private
   */
  _unsubscribe(eventName, filters, id) {
    const jsonRpcMessage = formatJsonRpc({
      id,
      method: 'unsubscribe',
      params: [this.registry[id].subId]
    })

    if (this.socket.readyState === this.socket.OPEN)
      this.socket.send(jsonRpcMessage)
  }
}

module.exports = WebSocketClient
