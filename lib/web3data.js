const DEFAULT_BASE_URL = 'https://web3api.io/api/v1'

class Web3Data {
  constructor(config) {
    this.config = config

    if (!this.config) {
      throw new Error('No configuration object supplied')
    }
    if (!this.config.apiKey) {
      throw new Error('No api key supplied')
    }
    if (!this.config.blockchainId) {
      throw new Error('No Blockchain specified')
    }
    this.baseUrl = this.config.baseUrl ? this.config.baseUrl : DEFAULT_BASE_URL
    this.headers = {
      'x-amberdata-api-key': this.config.apiKey,
      'x-amberdata-blockchain-id': this.config.blockchainId
    }

    this.url = ''
    this.params = '?'
  }

  /* ---- Methods --- */

  // addresses() {
  // }

  addresses(hash) {
    if (!hash) {
      throw new Error('No address hash provided')
    }

    this.url += `/addresses/${hash}`
    return this
  }

  info() {
    this.url += '/information'
    return this
  }

  stats() {
    this.url += '/statistics'
    return this
  }

  transactions(txhash) {
    this.url += '/transactions'
    if (arguments.length === 1) {
      return this.filter({transactionHash: txhash})
    }

    return this
  }

  logs() {
    this.url += '/logs'
    return this
  }

  functions(functionHash) {
    this.url += '/functions'
    if (arguments.length === 1) {
      return this.filter({transactionHash: functionHash})
    }
    return this
  }

  tokens(tokenHash) {
    this.url += '/tokens'
    if (arguments.length === 1) {
      return this.filter({tokenAddress: tokenHash})
    }

    return this
  }

  /* ---- Modifiers --- */

  filter(filterOptions) {
    for (const filter in filterOptions) {
      if ({}.hasOwnProperty.call(filterOptions, filter)) {
        this.params += `${filter}=${filterOptions[filter]}&`
      }
    }
    return this
  }

  limit(n) {
    return this.filter({size: n})
  }

  size(n) {
    return this.limit(n)
  }

  offset(index) {
    return this.filter({page: index})
  }

  page(index) {
    return this.offset(index)
  }

  orderBy(fieldName) {
    return this.filter({orderBy: fieldName})
  }

  direction(dir) {
    return this.filter({direction: dir})
  }
}

module.exports = Web3Data
