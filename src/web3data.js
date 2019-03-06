import axios from 'axios'
import {
  API_KEY_HEADER,
  BLOCKCHAIN_ID_HEADER,
  DEFAULT_BASE_URL,
  DEFAULT_WEBSOCKET_URL
} from '../constants'
import { is, throwIf } from './utils'
import Address from './address'
import Token from './token'
import Contract from './contract'

const WebSocket = require('isomorphic-ws')
/**
 * Class Web3data contains methods for hitting Amberdata's
 * API endpoints.
 * */
class Web3Data {
  /**
   * Creates a Web3Data instance
   * @param {string} apiKey  The Amberdata api key needed to access data
   * @param {object} options  Contains additional configuration options:
   *  - blockchainId: specifies the blockchain to get data from
   *  - baseUrl: the base url of API calls
   */
  constructor(apiKey, options = {}) {
    throwIf(
      is.undefined(apiKey) || is.emptyString(apiKey),
      'No api key supplied'
    )

    /* Setup required request headers */
    this.headers = {}
    this.headers[API_KEY_HEADER] = apiKey

    /* Setup optional request headers */
    if (options.blockchainId) {
      this.headers[BLOCKCHAIN_ID_HEADER] = options.blockchainId
    }
    this.websocketUrl = options.websocketUrl ? options.websocketUrl : DEFAULT_WEBSOCKET_URL + apiKey
    this.baseUrl = options.baseUrl ? options.baseUrl : DEFAULT_BASE_URL

    /* Web3Data composite modules */
    this.address = new Address(this)
    this.token = new Token(this)
    this.contract = new Contract(this)
    this.websocket = null
  }

  connect(callback) {
    if (is.null(this.websocket)) {
      try {
        this.websocket = new WebSocket(this.websocketUrl);
        this.websocket.onclose = () => callback('WebSocket connection closed');
        // TODO: Make more robust
        this.websocket.onerror = (err) => callback(err)
      } catch (error) {
        callback(error)
      }
    } else {
      callback("Client is already connected")
    }
  }

  disconnect() {
    this.websocket.close()
  }

  on() {
    // this.websocket.
  }

  off() {

  }
  /**
   * Appends the API base url with the endpoint  url. Then sends an
   * http request to the Amberdata API endpoint.
   * @param {string} url The endpoint url with any query/path params if set
   */
  async rawQuery(url) {
      const response = await axios.get(this.baseUrl + url, {
        headers: this.headers
      })
      return response.data
  }
}

export default Web3Data
