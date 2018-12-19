const axios = require('axios')

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
    this.url = new URL(
      this.config.baseUrl ? this.config.baseUrl : DEFAULT_BASE_URL
    )
    this.headers = {
      'x-amberdata-api-key': this.config.apiKey,
      'x-amberdata-blockchain-id': this.config.blockchainId
    }
  }

  /* ---- Methods --- */

  // addresses() {
  // }

  addresses(hash) {
    if (!hash) {
      throw new Error('No address hash provided')
    }

    this.url.pathname += `/addresses/${hash}`
    return this
  }

  info() {
    this.url.pathname += '/information'
    return this
  }

  stats() {
    this.url.pathname += '/statistics'
    return this
  }

  transactions(txhash) {
    this.url.pathname += '/transactions'
    if (arguments.length === 1) {
      return this.filter({transactionHash: txhash})
    }

    return this
  }

  logs() {
    this.url.pathname += '/logs'
    return this
  }

  functions(functionHash) {
    this.url.pathname += '/functions'
    if (arguments.length === 1) {
      return this.filter({transactionHash: functionHash})
    }
    return this
  }

  tokens(tokenHash) {
    this.url.pathname += '/tokens'
    if (arguments.length === 1) {
      return this.filter({tokenAddress: tokenHash})
    }

    return this
  }

  /* ---- Modifiers --- */

  filter(filterOptions) {
    for (const filter in filterOptions) {
      if ({}.hasOwnProperty.call(filterOptions, filter)) {
        this.url.search += `${filter}=${filterOptions[filter]}&`
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

  async retrieve() {
    const config = {
      headers: this.headers
    }
    try {
      const response = await axios.get(this.url.href, config)
      return response.data
    } catch (error) {
      return error
    }
  }
}

module.exports = Web3Data
