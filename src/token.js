const {is, get} = require('./utils')
const {
  ERROR_MESSAGE_TOKEN_NO_ADDRESS: NO_ADDRESS,
  ERROR_MESSAGE_TOKEN_NO_HOLDER_ADDRESS: NO_HOLDER_ADDRESS,
  TOKENS_ENDPOINT: ENDPOINT
} = require('./constants')

class Token {
  constructor(web3data) {
    this.web3data = web3data
  }

  getTokenVolume(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'volume',
      filterOptions
    })
  }

  getTokenVelocity(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'velocity',
      filterOptions
    })
  }

  getTokenHolders(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'holders/latest',
      filterOptions
    })
  }

  getTokenHoldersHistorical(hash, filterOptions = {}) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    if (is.notInObject(filterOptions, 'holderAddresses'))
      return Promise.reject(new Error(NO_HOLDER_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'holders/historical',
      filterOptions
    })
  }

  getTokenSupply(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'supplies/latest',
      filterOptions
    })
  }

  getTokenTransfers(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'transfers',
      filterOptions
    })
  }
}

module.exports = Token
