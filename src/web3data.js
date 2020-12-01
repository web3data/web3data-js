const axios = require('axios')
const {
  API_KEY_HEADER,
  BLOCKCHAIN_ID_HEADER,
  DEFAULT_BASE_URL,
  DEFAULT_RPC_URL,
  ERROR_RPC_NO_METHOD
} = require('./constants')
const {is, throwIf, formatJsonRpc} = require('./utils')
const Address = require('./address')
const Token = require('./token')
const Contract = require('./contract')
const Transaction = require('./transaction')
const Block = require('./block')
const Blockchain = require('./blockchain')
const Signature = require('./signature')
const Market = require('./market')
const Eth = require('./eth')
const Btc = require('./btc')
const Bch = require('./bch')
const Bsv = require('./bsv')
const Ltc = require('./ltc')
const Xlm = require('./xlm')
const Zec = require('./zec')
const WebSocketClient = require('./websocket')

/**
 * Contains common methods used in.
 *
 * @private
 */
class Web3DataFactory {
  /**
   * Creates a Web3Data instance.
   *
   * @param apiKey - The Amberdata api key needed to access data.
   * @param {object} options Contains additional configuration options:
   * @param blockchainId: specifies the blockchain to get data from
   * @param - baseUrl: the base url of API calls
   * @param - websocketUrl: the websocket url to use
   * @example
   */
  constructor(apiKey, options = {}) {
    throwIf(
      is.undefined(apiKey) || is.emptyString(apiKey),
      'No api key supplied'
    )

    this.apiKey = apiKey
    this.blockchainId = null

    /* Setup required request headers */
    this.headers = {}
    this.headers[API_KEY_HEADER] = this.apiKey

    /* Setup optional request headers */
    if (options.blockchainId) {
      this.blockchainId = options.blockchainId
      this.headers[BLOCKCHAIN_ID_HEADER] = options.blockchainId
    }

    this.wsConfig = {
      ...options,
      websocketUrl: options.websocketUrl ? options.websocketUrl : null
    }

    this.baseUrl = options.baseUrl ? options.baseUrl : DEFAULT_BASE_URL

    /* Web3Data composite modules */
    this.address = new Address(this)
    this.token = new Token(this)
    this.contract = new Contract(this)
    this.transaction = new Transaction(this)
    this.block = new Block(this)
    this.blockchain = new Blockchain(this)
    this.signature = new Signature(this)
    this.market = new Market(this)
  }

  /**
   * Appends the API base url with the endpoint  url. Then sends an
http request to the Amberdata API endpoint.
   *
   * @param url - The endpoint url with any query/path params if set.
   * @returns The axios request object.
   * @example
   */
  rawQuery(url) {
    return axios
      .get(this.baseUrl + url, {
        headers: this.headers
      })
      .then(r => r.data)
  }

  /**
   * Method used to interact with web3api json rpc endpoints.
   *
   * @param method - The json rpc method to call.
   * @param parameters
   * @param params - The parameters to the json rpc call.
   * @returns Returns the json rpc result.
   * @example
   */
  rpc(method, parameters = []) {
    throwIf(!method, ERROR_RPC_NO_METHOD)
    return axios
      .post(
        `${DEFAULT_RPC_URL}?${API_KEY_HEADER}=${this.apiKey}&${BLOCKCHAIN_ID_HEADER}=${this.blockchainId}`,
        formatJsonRpc({method, params: parameters}),
        {
          headers: this.headers
        }
      )
      .then(
        response => response.data,
        response => response.response.data
      )
  }
}

/**
 * Class Web3data contains methods for hitting Amberdata's
 * API endpoints.
 *
 * @class Web3Data
 * */
class Web3Data extends Web3DataFactory {
  constructor(apiKey, options = {}) {
    super(apiKey, options)

    /* Instantiates a new Web3data.js instance with blockchain specific methods */
    this.eth = new Eth(Web3DataFactory, apiKey, options)
    this.btc = new Btc(Web3DataFactory, apiKey, options)
    this.bch = new Bch(Web3DataFactory, apiKey, options)
    this.bsv = new Bsv(Web3DataFactory, apiKey, options)
    this.ltc = new Ltc(Web3DataFactory, apiKey, options)
    this.xlm = new Xlm(Web3DataFactory, apiKey, options)
    this.zec = new Zec(Web3DataFactory, apiKey, options)

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
}

module.exports = Web3Data
