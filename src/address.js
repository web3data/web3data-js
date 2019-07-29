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
