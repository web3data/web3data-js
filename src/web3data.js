const axios = require('axios')
const {
  API_KEY_HEADER,
  BLOCKCHAIN_ID_HEADER,
  DEFAULT_BASE_URL
} = require('./constants')
const {is, throwIf} = require('./utils')
const Address = require('./address')
const Token = require('./token')
const Contract = require('./contract')
const Transaction = require('./transaction')
const Block = require('./block')
const Signature = require('./signature')
const Market = require('./market')
const Eth = require('./eth')
const WebSocketClient = require('./websocket')

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

    this.apiKey = apiKey

    /* Setup required request headers */
    this.headers = {
      'Cache-Control': 'no-cache'
    }
    this.headers[API_KEY_HEADER] = this.apiKey

    /* Setup optional request headers */
    if (options.blockchainId) {
      this.headers[BLOCKCHAIN_ID_HEADER] = options.blockchainId
    }

    this.wsConfig = {
      websocketUrl: options.websocketUrl ? options.websocketUrl : null
    }

    this.baseUrl = options.baseUrl ? options.baseUrl : DEFAULT_BASE_URL

    /* Web3Data composite modules */
    this.address = new Address(this)
    this.token = new Token(this)
    this.contract = new Contract(this)
    this.transaction = new Transaction(this)
    this.block = new Block(this)
    this.signature = new Signature(this)
    this.market = new Market(this)

    /* Attach eth specific methods under eth namespace */
    this.eth = new Eth(this)

    this.websocket = null
  }

  connect(callback) {
    this.websocket = this.websocket
      ? this.websocket
      : new WebSocketClient(this.apiKey, this.wsConfig)
    return this.websocket.connect(callback)
  }

  disconnect(callback) {
    if (this.websocket) {
      this.websocket.disconnect(callback)
    } else {
      console.error('socket is not yet connected')
    }
  }

  on({eventName, filters}, callback) {
    if (!callback) console.warn('no callback provided')
    if (!eventName) {
      console.error('no event specified')
      return
    }

    this.websocket.on({eventName, filters}, callback)
  }

  once({eventName, filters}, callback) {
    this.websocket.once({eventName, filters}, callback)
  }

  off({eventName, filters}, callback) {
    if (!callback) console.warn('no callback provided')
    if (!eventName) {
      console.error('no event specified')
      return
    }

    this.websocket.off({eventName, filters}, callback)
  }

  /**
   * Appends the API base url with the endpoint  url. Then sends an
   * http request to the Amberdata API endpoint.
   * @param {string} url - The endpoint url with any query/path params if set
   * @return {*} the axios request object
   */
  rawQuery(url) {
    return axios
      .get(this.baseUrl + url, {
        headers: this.headers
      })
      .then(r => r.data)
  }
}

module.exports = Web3Data
