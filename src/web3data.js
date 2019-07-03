import axios from 'axios'
import {
  API_KEY_HEADER,
  BLOCKCHAIN_ID_HEADER,
  DEFAULT_BASE_URL
} from './constants'
import {is, throwIf} from './utils'
import Address from './address'
import Token from './token'
import Contract from './contract'
import Transaction from './transaction'
import Block from './block'
import Signature from './signature'
import WebSocketClient from './websocket'

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

    this.websocketUrl = options.websocketUrl
    /*   ROW   ? options.websocketUrl
      : DEFAULT_WEBSOCKET_URL
    this.websocketUrl += '?api_key=' + apiKey */

    this.baseUrl = options.baseUrl ? options.baseUrl : DEFAULT_BASE_URL

    // TODO: Map to normal naming conventions
    /* Web3Data composite modules */
    this.address = new Address(this)
    this.token = new Token(this)
    this.contract = new Contract(this)
    this.transaction = new Transaction(this)
    this.block = new Block(this)
    this.signature = new Signature(this)

    // TODO: This should receive options, but not handle URL gen
    this.websocket = null
    this.apiKey = apiKey
  }

  connect(callback) {
    if (is.null(this.websocket)) {
      this.websocket = new WebSocketClient(this.apiKey, {
        websocketUrl: this.websocketUrl
      })
    }

    return this.websocket.connect(callback)
  }

  // TODO: The following methods must error if called before `connect()`
  disconnect(callback) {
    throwIf(!this.websocket, 'must run `connect` method first')
    this.websocket.disconnect(callback)
  }

  on({eventName, filters}, callback) {
    // TODO: Check with Trevor
    throwIf(!eventName, 'no event specified')
    throwIf(!callback, 'no callback provided')
    this.websocket.on({eventName, args: filters}, callback)
  }

  off({eventName, filters}, callback) {
    // TODO: Check with Trevor
    throwIf(!eventName, 'no event specified')
    throwIf(!callback, 'no callback provided')
    this.websocket.off({eventName, args: filters}, callback)
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
