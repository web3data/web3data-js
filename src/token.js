const {is, get, onFulfilled, onError} = require('./utils')
const {
  ERROR_MESSAGE_TOKEN_NO_ADDRESS: NO_ADDRESS,
  ERROR_MESSAGE_TOKEN_NO_HOLDER_ADDRESS: NO_HOLDER_ADDRESS,
  TOKENS_ENDPOINT: ENDPOINT
} = require('./constants')

class Token {
  constructor(web3data) {
    this.web3data = web3data
  }

  // TODO: Needs tests
  getRankings(filterOptions) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'rankings',
      filterOptions
    }).then(onFulfilled, onError)
  }

  getVolume(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'volume',
      filterOptions
    }).then(onFulfilled, onError)
  }

  getVelocity(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'velocity',
      filterOptions
    }).then(onFulfilled, onError)
  }

  getHolders(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'holders/latest',
      filterOptions
    }).then(onFulfilled, onError)
  }

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

  getSupplies(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'supplies/latest',
      filterOptions
    }).then(onFulfilled, onError)
  }

  getTransfers(hash, filterOptions) {
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
