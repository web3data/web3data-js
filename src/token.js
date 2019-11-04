const {is, get, onFulfilled, onError, throwIf} = require('./utils')
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
   * @param web3data - The web3data instance.
   * @example
   */
  constructor(web3data) {
    this.web3data = web3data
  }

  /**
   * Retrieves the top ranked tokens by a specific metric.
   *
   * @param [filterOptions] - The filters associated with the request. See [docs](https://docs.amberdata.io/reference#get-token-rankings) for more details.
   * @returns The token rankings.
   * @example const rankings = await web3data.token.getRankings()
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
   * @param hash - The address of the token contract.
   * @param [filterOptions] - The filters associated with the request. See [docs](https://docs.amberdata.io/reference#get-token-volume) for more details.
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
   * @param hash - The address of the token contract.
   * @param [filterOptions] - The filters associated with the request.
   * @returns
   * @example
   */
  getVelocity(hash, filterOptions = {}) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'velocity',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * @param hash - The address for which to retrieve token holders.
   * @param [filterOptions] - The filters associated with the request.
   * @returns
   * @example
   */
  getHolders(hash, filterOptions = {}) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'holders/latest',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * @param hash - The address for which to retrieve token holders.
   * @param [filterOptions] - The filters associated with the request.
   * @returns
   * @example
   */
  getHoldersHistorical(hash, filterOptions = {}) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    if (is.notInObject(filterOptions, 'holderAddresses'))
      return Promise.reject(new Error(NO_HOLDER_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'holders/historical',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * @param hash - The address for which to retrieve token supplies.
   * @param [filterOptions] - The filters associated with the request.
   * @returns
   * @example
   */
  getSupplies(hash, filterOptions = {}) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'supplies/latest',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * @param hash - The address for which to retrieve token holders.
   * @param [filterOptions] - The filters associated with the request.
   * @returns
   * @example
   */
  getTransfers(hash, filterOptions = {}) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'transfers',
      filterOptions
    }).then(onFulfilled, onError)
  }
}

module.exports = Token
