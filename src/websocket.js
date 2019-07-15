import {DEFAULT_WEBSOCKET_URL} from './constants'
import {is, throwIf, uuid} from './utils'

const WebSocket = require('isomorphic-ws')

/**
 * Creates a string in json rpc format
 * @param options the json rpc options
 * @return {string} the json rpc formatted string
 */
const formatJsonRpc = options => {
  return JSON.stringify({
    jsonrpc: options.version || '2.0',
    method: options.method || 'subscribe',
    id: options.id || 0,
    params: options.params || [] // TODO: This is unsafe, force to be array
  })
}

/**
 * Returns true if the websocket message is a subscription response
 * as seen here: docs.amberdata.io/reference/subscriptions#section-example-
 * @param msg the websocket response method
 * @return {boolean}
 */
const isSubscriptionAck = msg => !msg.params

const MAX_RECONNECTS = 3
const NO_DATA_TIMEOUT = 180000 /* 3 minutes */
const NO_RESPONSE_TIMEOUT = 5000 /* 5 seconds */

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

  connect(callBack) {
    // Check if connected already, if so skip
    if (!is.null(this.socket)) return

    this.socket = new WebSocket(`${this.baseWsUrl}?x-api-key=${this.apiKey}`)

    // Initialize connection attempt
    this.socket.addEventListener('open', result => {
      console.log('websocket client connection opened')

      this.connected = true

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
        callBack(err)
      } else {
        console.error('connection error occurred')
      }

      console.error('connection error occurred')
      this._reconnect()
    })

    this.socket.addEventListener('close', data => {
      console.log('Websocket client connection closed - code', data.code)
      this._reconnect()
    })

    return this
  }

  /**
   * Destroys WebSocket i.e. disconnects client and drops reference.
   * @param callBack {function} the callback function that executes on close
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
   * Creates a new event listener for the specified event.
   * @param eventName {string} the event for which to listen
   * @param filters {object} the extra arguments associated with the subscription
   * @param callback {function} the callback function that executes when the
   * specified event is received by the websocket data listener.
   */
  on({eventName, filters = {}}, callback) {
    // TODO: Check with Trevor
    throwIf(!eventName, 'no event specified')
    throwIf(!callback, 'no callback provided')

    /* Derive uuid */
    const id = uuid({eventName, filters})

    if (this.connected) {
      this._subscribe(eventName, filters)
    }

    this.registry[id] = {}
    this.registry[id].callback = callback
    this.registry[id].args = {eventName, filters}
  }

  /**
   * Destroys a single event listener. Deregisters event and callback function
   * @param eventName {string} the event to deregister
   * @param filters
   * @param callback {function} the callback function to execute
   */
  off({eventName, filters = {}}, callback) {
    if (!eventName) console.error('no event specified')
    if (callback) console.error('no callback provided')

    /* Sends the unsubscribe message to the server */
    const id = this._unsubscribe(eventName, filters)

    if (is.notUndefined(this.registry[id])) delete this.registry[id]
    callback('successfully unsubscribed')
  }

  /**
   * Initiates a reconnect given the following conditions:
   * 1. initial connection doesnt respond within 5 seconds
   * 2. connection doesn't get any event within 3 minutes,
   *    and has at least 1 successful subscription
   * 3. we got a socket error of any kind, see above
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
   * Loops through each registry item and sends subscription message
   */
  _refreshSubscriptions() {
    if (!this.registry) return
    for (const {
      args: {eventName, filters}
    } of Object.values(this.registry)) {
      this.subscribe(eventName, filters)
    }
  }

  /**
   * Sets up the on event listener
   */
  _listen() {
    this.socket.addEventListener('message', message => {
      let data
      try {
        data = JSON.parse(message.data)
      } catch (error) {
        console.error(`error parsing json request`, error)
        data = {error: ''}
      }

      this.responseReceived = true

      if (isSubscriptionAck(data)) {
        const id = data && data.id ? data.id : ''

        // Map the subscriptionId to the uuid
        this.registrySubIds[data.result] = id
        this.registry[id].subId = data.result
      } else {
        this.dataReceived = true

        const res =
          data && data.params && data.params.result ? data.params.result : {}
        const id =
          data && data.params && data.params.subscription
            ? data.params.subscription
            : ''

        // Get the uuid
        const uuid = this.registrySubIds[id]

        // Fire individual methods if they exist
        if (is.notUndefined(this.registry[uuid]))
          this.registry[uuid].callback(res)

        // Store latest state for easy retrieval later
        if (is.notUndefined(this.latestState[uuid]))
          this.latestState[uuid] = res
        // This.reconnects = 0
      }
    })
  }

  /**
   * Sends subscription message to the websocket connection
   * @param eventName the name of the event to subscribe to
   * @param filters the extra arguments associated with the subscription
   * @return string the uuid of the subscription
   */
  _subscribe(eventName, filters) {
    const params = is.notUndefined(filters) ? [filters] : []
    const id = uuid({eventName, filters})

    /* Format and send json rpc message */
    const jsonRpcMessage = formatJsonRpc({id, params: [eventName, ...params]})
    this.socket.send(jsonRpcMessage)
    return id
  }

  /**
   *
   * @param eventName
   * @param filters
   * @return {*}
   */
  _unsubscribe(eventName, filters) {
    // TODO: silent error if eventName has been subscribed to yet
    /* Derive uuid */
    const id = uuid({eventName, filters})

    /* Format and send json rpc message */
    const jsonRpcMessage = formatJsonRpc({
      id,
      method: 'unsubscribe',
      params: [this.registry[id].subId]
    })
    if (this.socket.readyState === this.socket.OPEN)
      this.socket.send(jsonRpcMessage)
    return uuid
  }
}

export default WebSocketClient
