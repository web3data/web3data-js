//TODO: Add comments accorrding to best practices

import got from 'got'
// if (!process.env.BROWSER) {
//   const got = require('got')
// }

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
      'x-amberdata-blockchain-id': this.config.blockchainId,
    }

    this.url = ''
    this.params = '?'
  }

  // TODO: Create Address object

  /* ---- Methods --- */

  addresses() {
    // Not yet implemented
  }

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
    if (arguments.length === 0) {
      this.url += '/transactions'
    } else {
      this.url += `/transactions/${txhash}`
    }
    return this
  }

  logs(logHash) {
    if (arguments.length === 0) {
      this.url += '/logs'
    } else {
      this.url += `/logs/${logHash}`
    }
    return this
  }

  messages(messageHash) {
    if (arguments.length === 0) {
      this.url += '/functions'
    } else {
      this.url += `/functions/${messageHash}`
    }
    return this
  }

  tokens(tokenHash) {
    if (arguments.length === 0) {
      this.url += '/tokens'
    } else {
      this.url += `/tokens/${tokenHash}`
    }
    return this
  }

  /* ---- Modifiers --- */

  filter(filterOptions) {
    // {
    // blockNumber: '',
    // from: 'f',
    // to: '',
    // topic: '',
    // transactionHash: '',
    // startDate: 'filterOptions',
    // endDate: '',
    // page: 's',
    // size: '',
    // tokenAddress: ''
    // }
    for (const filter in filterOptions) {
      this.params += `${filter}=${filterOptions[filter]}&`
    }
    return this
  }

  limit(n) {
    this.params += `size=${n}&`
    return this
  }

  offset(index) {
    this.params += `page=${index}&`
    return this
  }

  page(index) {
    this.offset(index)
    return this
  }

  orderBy(fieldName) {
    this.params += `orderBy=${fieldName}&`
    return this
  }

  direction(dir) {
    this.params += `direction=${dir}&`
    return this
  }

  async retrieve() {
    if(this.params.length == 1) {
      this.params = ''
    }
    //console.log(this.baseUrl + this.url + this.params)
    try {
      const response = await got(this.url + this.params, {
        baseUrl: this.baseUrl,
        headers: this.headers,
        json: true,
      })
      console.log(`-------response------\n${response}`)
      return response.body
    } catch (error) {
      console.log(`-------error------\n${error}`)
      return error.response
    }
  }
}

export default Web3Data
