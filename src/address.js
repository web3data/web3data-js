const {
  ERROR_MESSAGE_ADDRESS_NO_ADDRESS: NO_ADDRESS,
  ADDRESSES_ENDPOINT: ENDPOINT,
  HTTP_CODE_NOT_FOUND: NOT_FOUND
} = require('./constants')

const {is, get, throwIf, onFulfilled, onError} = require('./utils')

class Address {
  constructor(web3data) {
    this.web3data = web3data
  }

  getAllAddresses(filterOptions) {
    return get(this.web3data, {endpoint: ENDPOINT, filterOptions}).then(
      response =>
        response.error ? throwIf(true, response.message) : response.payload,
      error => throwIf(true, error.response.data.message)
    )
  }

  getInformation(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'information',
      filterOptions
    }).then(
      response =>
        response.error ? throwIf(true, response.message) : response.payload,
      error => throwIf(true, error.response.data.message)
    )
  }

  getMetadata(hash, filterOptions) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'metadata',
      filterOptions
    }).then(onFulfilled, onError)
  }

  getAdoption(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'adoption',
      filterOptions
    }).then(
      response =>
        response.error ? throwIf(true, response.message) : response.payload,
      error => throwIf(true, error.response.data.message)
    )
  }

  /**
   * Retrieves the functions (aka internal messages) where this address is either the originator or a recipient.
   * @param {String} hash - the address of the account.
   * @param {Object} filterOptions - the filter options associated with the request.
   * @return {*} the balance data of the account or if no address is found.
   */
  getInternalMessages(hash, filterOptions = {}) {
    return this.getFunctions(hash, filterOptions)
  }

  /**
   * Retrieves the functions (aka internal messages) where this address is either the originator or a recipient.
   * @param {String} hash - the address of the account.
   * @param {Object} filterOptions - the filter options associated with the request.
   * @return {*} the balance data of the account or if no address is found.
   */
  getFunctions(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'functions',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the logs for the transactions where this address is either the originator or a recipient.
   * @param {String} hash - the address of the account
   * @param {Object} filterOptions - the filter options associated with the request
   * @return {Promise<Object>} the object containing the array of logs
   */
  getLogs(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'logs',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the transactions where this address was either the originator or a recipient.
   * @param {String} hash - the address of the account
   * @param {Object} filterOptions - the filter options associated with the request
   * @return {Promise<Object>} the object containing the array of transaction objects
   */
  getTransactions(hash, filterOptions = {}) {
    throwIf(!hash, NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'transactions',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves pending transactions the specified address is involved in.
   * @param {String} hash - the address of the account
   * @param {Object} filterOptions - the filter options associated with the request
   * @return {Promise<Object>} the array of pending transactions
   */
  getPendingTransactions(hash, filterOptions = {}) {
    throwIf(!hash, NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'pending-transactions',
      filterOptions
    }).then(onFulfilled, onError)
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
    }).then(
      response =>
        response.error ? throwIf(true, response.message) : response.payload,
      error => throwIf(true, error.response.data.message)
    )
  }

  /**
   * Retrieves all token transfers involving the specified address.
   * @param {String} hash - the address of the account
   * @param {Object} filterOptions - the filter options associated with the request
   * @return {Promise<Object>} the object containing the array of token transfer objects.
   */
  getTokenTransfers(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'token-transfers',
      filterOptions
    }).then(onFulfilled, onError)
  }

  getTokenBalances(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'token-balances',
      filterOptions
    }).then(
      response =>
        response.error ? throwIf(true, response.message) : response.payload,
      error => throwIf(true, error.response.data.message)
    )
  }

  getUsage(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'usage',
      filterOptions
    }).then(
      response =>
        response.error ? throwIf(true, response.message) : response.payload,
      error => throwIf(true, error.response.data.message)
    )
  }
}

module.exports = Address
