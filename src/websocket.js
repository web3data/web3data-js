const WebSocket = require('isomorphic-ws')
import { DEFAULT_WEBSOCKET_URL } from './constants'
import { is } from './utils'

const formatJsonRpc = options => {
  return JSON.stringify({
    jsonrpc: '2.0',
    method: 'subscribe',
    id: options.id || 0,
    // TODO: This is unsafe, force to be array
    params: options.params
  })
}

class WebSocketClient {
  constructor(options) {
    this.socket = null
    this.baseWsUrl = DEFAULT_WEBSOCKET_URL
    this.apiKey = options && options.apiKey ? options.apiKey : null

    // Internal state management
    this.connected = false

    // Keep track of subscriptions, key/value mapping of subscription ID to listeners
    this.registry = {}

    // Keeps track of last data received by subscription key
    this.registryArgs = {}

    // Keeps track of last data received by subscription key
    this.latestState = {}

    return this
  }

  connect(cb) {
    // Check if connected already, if so skip (TODO: Assess this!)
    if (!is.null(this.socket)) return
    this.socket = new WebSocket(`${this.baseWsUrl}?x-api-key=${this.apiKey}`)

    // Initialize connection attempt
    this.socket.addEventListener('open', (e) => {
      console.log('ws client connection opened')
      this.connected = true
      // Fire connected callback
      if (cb) cb(e)
      // TODO: bootstrap all the listeners now!
    })

    this.socket.addEventListener('error', err => {
      if (cb && err) cb(err)
      // TODO: attempt re-connect here!
    })

    // Make chainable
    return this
  }

  /**
   * Destroys WebSocket i.e. disconnects client and drops reference.
   * @param callback {function} the callback function that executes on close
   */
  disconnect(cb) {
    this.socket.close()
    this.socket = null
    this.socket.onclose = () => cb('WebSocket client closed')
  }

  reconnect() {
    // TODO: Attempt up to 3 times to re-connect if one of the following is true:
    // 1. initial connection doesnt respond within 5 seconds
    // 2. connection doesn't get any event within 3 minutes, and has at least 1 successful subscription
    // 3. we got a socket error of any kind, see above
    // Next: if reconnect is successful, trigger a subscription refresh
  }

  refreshSubscriptions() {
    // TODO: loop each registry item and re-attempt to subscribe, using registryArgs
  }

  // message handler & method redirect based on received data
  listen() {
    // TODO: verify this works!!!
    // TODO: Filter out messages for connection state update!
    this.socket.addEventListener('message', (e) => {
      const data = JSON.parse(e.data)
      const id = data && data.id ? data.id
      const res = data && data.params && data.params.result ? data.params.result : {}

      // fire individual methods if they exist
      if (is.notUndefined(this.registry[id])) this.registry[id](res)

      // Store latest state for easy retrieval later
      if (is.notUndefined(this.latestState[id])) this.latestState[id] = res
    })
  }

  subscribe(name, args) {
    // TODO: change this to generate a UUID, unless specified!
    // Pass in all variables to enable a unique hash, so we can validate it doesnt exist before
    const id = is.notUndefined(args.id) ? args.id : uuid({ name, args })
    // TODO: Test this works
    const evt = formatJsonRpc({ id, params: [name, ...args] })
    this.socket.send(evt)

    return id
  }

  /**
   * Creates a new event listener for the specified event.
   * @param name {string} the event for which to listen
   * @param filters {object}
   * @param callback {function} the callback function that executes when the
   * specified event is received by the websocket data listener.
   */
  on({ name, filters }, callback) {
    // sends the subscription event over to
    const subId = this.subscribe(name, filters)
    this.registry[subId] = callback
    this.registryArgs[subId] = { name, filters }
  }

  /**
   * Destroys a single event listener. Deregisters event and callback function
   * @param event {string} the event to deregister
   * @param callback {function} the callback function to execute
   */
  off({ name, filters }, callback) {
    const id = is.notUndefined(args.id) ? args.id : uuid({ name, filters })
    // TODO: finish & Test!
    if (is.notUndefined(this.registry[id])) delete this.registry[id]
    if (is.notUndefined(this.registryArgs[id])) delete this.registryArgs[id]
  }
}

export default Web3Data
