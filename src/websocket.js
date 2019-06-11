import {is} from './utils'

const WebSocket = require('isomorphic-ws')

// TODO: put in constants (maybe?)
const WEBSOCKET_OPEN = 1

const dataHandler = data => {
  // Console.log("data received: ", data.data)
  console.log('Type:', data.data.split(' ')[0].trim())
}

// Const eventHandlers = {}

const subscribe = (websocket, event, callback) => {
  // TODO: R.O.W.
  console.log('subscribed to', event)

  /* Send subscribe message with event */
  websocket.send(`subscribe:${event}`)

  /* Register callback with event handler */
  // TODO: Do this
  console.log(callback)
}

/**
 * TODO: ---
 */
class WebSocketClient {
  /**
   * Creates the WebSocketClient instance.
   * @param websocketUrl
   */
  constructor(websocketUrl) {
    this.websocketUrl = websocketUrl
    this.websocket = null
  }

  /**
   * Initialises the WebSocket connection.
   * @param callback {function} the callback function to execute //ASK: to many callbacks?
   */
  connect(callback) {
    /* Check to see if the websocket has been initialized */
    if (is.null(this.websocket)) {
      try {
        /* Create new WebSocket instance and initialize connection */
        this.websocket = new WebSocket(this.websocketUrl)

        /* Register the event handlers */
        this.websocket.addEventListener('message', data => dataHandler(data))
        this.websocket.addEventListener('open', () => {
          callback('connected!')
        }) // TODO: think about this

        this.websocket.addEventListener('error', err => callback(err))
      } catch (error) {
        callback(error)
      }
    } else {
      callback('Client is already connected')
    }
  }

  /**
   * Destroys WebSocket i.e. disconnects client and drops reference.
   * @param callback {function} the callback function that executes on close
   */
  disconnect(callback) {
    this.websocket.onclose = () => callback('WebSocket connection closed')
    this.websocket.close()
    this.websocket = null
  }

  /**
   * Creates a new event listener for the specified event.
   * @param event {string} the event for which to listen
   * @param callback {function} the callback function that executes when the
   * specified event is received by the websocket data listener.
   */
  on(event, callback) {
    if (this.websocket.readyState === WEBSOCKET_OPEN) {
      subscribe(this.websocket, event, callback)
    } else {
      this.websocket.on('open', () => {
        subscribe(this.websocket, event, callback)
      })
    }
  }

  /**
   * Destroys event listener. Deregisters event and callback function
   * @param event {string} the event to deregister
   * @param callback {function} the callback function to execute
   */
  off(event, callback) {
    // TODO: Deregister
    console.log(event, callback)
  }
}

export default WebSocketClient
