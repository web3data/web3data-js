const {
  is,
  get,
  onFulfilled,
  onError,
  throwIf,
  recordsFormatter
} = require('./utils')
const {
  ERROR_MESSAGE_TOKEN_NO_ADDRESS: NO_ADDRESS,
  ERROR_MESSAGE_TOKEN_NO_HOLDER_ADDRESS: NO_HOLDER_ADDRESS,
  TOKENS_ENDPOINT: ENDPOINT
} = require('./constants')

/**
 * Contains methods pertaining to the `/tokens` endpoint of Amberdata's API.
 */
class Token {
  /**
   * Creates an instance of Token.
   *
   * @param {Web3Data} web3data - The web3data instance.
   * @example
   * const token = new Token(new Web3data('API_KEY'))
   */
  constructor(web3data) {
    this.web3data = web3data
  }

  /**
   * Retrieves the top ranked tokens by a specific metric.
   *
   * @param {object} [filterOptions] - The filters associated with the request. See [docs](https://docs.amberdata.io/reference#get-token-rankings) for more details.
   * @returns {Promise<object>} The token rankings.
   * @example
   * const rankings = await web3data.token.getRankings()
   */
  getRankings(filterOptions = {}) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'rankings',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the historical volume of token transfers for the specified address.
   *
   * @param {string} hash - The address of the token contract.
   * @param {object} [filterOptions]  - The filters associated with the request. See [docs](https://docs.amberdata.io/reference#get-token-volume) for more details.
   * @returns {Promise<object>} The historical volume of token transfers.
   * const tokenVolume = await web3data.token.getVolume('0x06012c8cf97bead5deae237070f9587f8e7a266d').
   * @example
   */
  getVolume(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'volume',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the historical velocity for the specified address.
   *
   * @param {string} hash - The address of the token contract.
   * @param {object} [filterOptions] - The filters associated with the request. See [docs](https://docs.amberdata.io/reference#get-token-velocity) for more details.
   * @returns {Promise<object>} The historical velocity.
   * @example const velocity = await web3data.token.getVelocity('0x06012c8cf97bead5deae237070f9587f8e7a266d');
   */
  getVelocity(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'velocity',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the latest or historical token holders for the specified address.
   *
   * @param {string} hash - The address for which to retrieve token holders.
   * @param {object} [filterOptions] - The filters associated with the request. See [docs](https://docs.amberdata.io/reference#get-token-velocity) for more details.
   * @param {object} [filterOptions.holderAddresses] - The address for which to retrieve token holders.
   * @returns {Promise<object>} The latest or historical token holders for the specified address.
   * @example
   *
   * // Latest
   * const latestHodlers =  await web3data.token.getHolders('0x06012c8cf97bead5deae237070f9587f8e7a266d');
   *
   * // Historical
   * const historicalHodlers =  await web3data.token.getHolders('0x06012c8cf97bead5deae237070f9587f8e7a266d', {holderAddresses: '0xbbf0cc1c63f509d48a4674e270d26d80ccaf6022'});
   */
  getHolders(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    let subendpoint = 'holders/latest'
    let formatter = {formatter: recordsFormatter}

    // If this parameter is present then we want historical data
    if (filterOptions.holderAddresses) {
      subendpoint = 'holders/historical'
      formatter = {}
    }

    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint,
      filterOptions
    }).then(onFulfilled.bind(formatter), onError)
  }

  /**
   * Retrieves the historical (time series) token holders for the specified token address. If the `holderAddresses` filter is present it will return historical data.
   *
   * @param {string} hash - The address for which to retrieve token holders.
   * @param {object} [filterOptions] - The filters associated with the request.
   * @returns {Promise<object>} The historical (time series) token holders for the specified token address.
   * @example
   * const historicalHolders = getHoldersHistorical('0x06012c8cf97bead5deae237070f9587f8e7a266d', {holderAddresses: '0xbbf0cc1c63f509d48a4674e270d26d80ccaf6022'})
   */
  getHoldersHistorical(hash, filterOptions) {
    throwIf(is.notInObject(filterOptions, 'holderAddresses'), NO_HOLDER_ADDRESS)
    return this.getHolders(hash, filterOptions)
  }

  /**
   * Retrieves the latest or historical token supplies (and derivatives) for the specified address. Use the `startDate` or `endDate` filters to get historical data.
   *
   * @param {string} hash - The address for which to retrieve token supplies.
   * @param {object} [filterOptions] - The filters associated with the request. See [docs](https://docs.amberdata.io/reference#get-token-supply-latest) for more details.
   * @param {number} [filterOptions.startDate] - Filter by token prices after this date - The interval can not exceed 6 months (d), or 30 days (h).
   * @param {number} [filterOptions.endDate] - Filter by token prices before this date - The interval can not exceed 6 months (d), or 30 days (h).
   * @returns {Promise<object>} The latest or historical token supplies.
   * @example
   * // Latest
   * const latestSupplies = await web3data.token.getSupplies('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   * // Historical
   * const historicalSupplies = await t.context.web3data.token.getSupplies('0x06012c8cf97bead5deae237070f9587f8e7a266d', {startDate: 1571011200, endDate: 1571097600, timeFormat: 'iso'})
   */
  getSupplies(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    const subendpoint =
      filterOptions.startDate || filterOptions.endDate
        ? 'supplies/historical'
        : 'supplies/latest'
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint,
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves all token transfers involving the specified address.
   *
   * @param {string} hash - The address for which to retrieve token transfers.
   * @param {object} [filterOptions] - The filters associated with the request.
   * @returns {Promise<Array>} All token transfers involving the specified address.
   * @example
   * const transfers = await web3data.token.getTransfers('0x06012c8cf97bead5deae237070f9587f8e7a266d', {validationMethod: 'full'})
   */
  getTransfers(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'transfers',
      filterOptions
    }).then(onFulfilled.bind({formatter: recordsFormatter}), onError)
  }
}

module.exports = Token
