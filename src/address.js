const {
  ERROR_MESSAGE_ADDRESS_NO_ADDRESS: NO_ADDRESS,
  ADDRESSES_ENDPOINT: ENDPOINT,
  HTTP_CODE_NOT_FOUND: NOT_FOUND
} = require('./constants')
const {is, get, throwIf} = require('./utils')

class Address {
  constructor(web3data) {
    this.web3data = web3data
  }

  getAllAddresses(filterOptions) {
    return get(this.web3data, {endpoint: ENDPOINT, filterOptions})
  }

  getInformation(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'information',
      filterOptions
    })
  }

  getStats(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'metadata',
      filterOptions
    })
  }

  getAdoption(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'adoption',
      filterOptions
    })
  }

  getInternalMessages(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'internal-messages',
      filterOptions
    })
  }

  getFunctions(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'functions',
      filterOptions
    })
  }

  getLogs(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'logs',
      filterOptions
    })
  }

  getTransactions(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'transactions',
      filterOptions
    })
  }

  /**
   * Retrieves the latest or historical balance data of the given address depending upon
   * Returns null if no address is found.
   * @param {String} hash - the address of the account
   * @param {Object} filterOptions - the filter options associated with the request
   * @return {*} the balance data of the account or if no address is found.
   */
  getBalance(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return filterOptions.startDate || filterOptions.endDate
      ? this.getHistoricalBalance(hash, filterOptions).then(data => data)
      : this.getLatestBalance(hash, filterOptions).then(data => data)
  }

  /**
   * Retrieves the latest balance data of the given address. Returns null if no address is found.
   * @param {String} hash - the address of the account
   * @param {Object} filterOptions - the filter options associated with the request
   * @return {*} the balance data of the account or if no address is found.
   */
  getLatestBalance(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'account-balances/latest',
      filterOptions
    })
      .then(
        /* If response has an error throw, if the address is not found return null, otherwise return the data */
        response =>
          throwIf(response.error, response.message) ||
          response.status === NOT_FOUND
            ? null
            : response.payload
      )
      .catch(error =>
        error.response
          ? throwIf(true, error.response.data.message)
          : 'Error with request'
      )
  }

  /**
   * Retrieves the historical balance data of the given address. Returns null if no address is found.
   * @param {String} hash - the address of the account
   * @param {Object} filterOptions - the filter options associated with the request
   * @return {*} the historical balance data of the account or if no address is found.
   */
  getHistoricalBalance(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'account-balances/historical',
      filterOptions
    })
      .then(
        /* If response has an error throw, if the address is not found return null, otherwise return the data */
        response =>
          throwIf(response.error, response.message) ||
          response.status === NOT_FOUND
            ? null
            : response.payload
      )
      .catch(error =>
        error.response
          ? throwIf(true, error.response.data.message)
          : 'Error with request'
      )
  }

  getTokens(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'tokens',
      filterOptions
    })
  }

  getTokenBalances(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'token-balances',
      filterOptions
    })
  }

  getUsage(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'usage',
      filterOptions
    })
  }
}

module.exports = Address
