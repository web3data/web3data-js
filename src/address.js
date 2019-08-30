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

  getStats(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'metadata',
      filterOptions
    }).then(
      response =>
        response.error ? throwIf(true, response.message) : response.payload,
      error => throwIf(true, error.response.data.message)
    )
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

  getInternalMessages(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'internal-messages',
      filterOptions
    }).then(
      response =>
        response.error ? throwIf(true, response.message) : response.payload,
      error => throwIf(true, error.response.data.message)
    )
  }

  getFunctions(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'functions',
      filterOptions
    }).then(
      response =>
        response.error ? throwIf(true, response.message) : response.payload,
      error => throwIf(true, error.response.data.message)
    )
  }

  getLogs(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'logs',
      filterOptions
    }).then(
      response =>
        response.error ? throwIf(true, response.message) : response.payload,
      error => throwIf(true, error.response.data.message)
    )
  }

  getTransactions(hash, filterOptions) {
    throwIf(!hash, NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'transactions',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the balance data of the given address. Returns null if no address is found.
   * @param {String} hash - the address of the account
   * @param {Object} filterOptions - the filter options associated with the request
   * @return {*} the balance data of the account or if no address is found.
   */
  async getBalance(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    let response
    try {
      response = await get(this.web3data, {
        hash,
        endpoint: ENDPOINT,
        subendpoint: 'account-balances/latest',
        filterOptions
      })
    } catch (error) {
      if (error.response) {
        throwIf(true, error.response.data.message)
      }
    }

    throwIf(response.error, response.message)

    return response.status === NOT_FOUND ? null : response.payload
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
