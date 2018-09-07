import got from 'got'

const BASE_URL = "https://staging-0000-data-api.amberdata.io/api/v1/"

class Web3Data {

  constructor(config) {
    this.headers = {"x-amberdata-api-key": config.apiKey,
                   "x-amberdata-blockchain-id": config.blockchainId
    }
    this.url = ""
  }

  //TODO: Create Address object

  /* ---- Methods --- */

  addresses() {

  }

  addresses(hash) {
    this.url += `addresses/${hash}/`
    //TODO: Implement .info()
    return ( this )
  }

  info () {
    this.url += 'information/'
    return ( this )
  }

  stats () {
    this.url += 'statistics/'
    return ( this )
  }

  transactions () {
    this.url += 'transactions/'
    return ( this )
  }

  transactions(txhash) {
    this.url += `transactions/${txhash}/`
    return ( this )
  }

  logs () {
    this.url += 'logs/'
    return ( this )
  }

  logs (logHash) {
    this.url += `logs/${logHash}/`
    return ( this )
  }

  messages() {
    this.url += 'functions/'
    return ( this )
  }

  messages(messageHash) {
    this.url += `functions/${messageHash}/`
    return ( this )
  }

  tokens() {
    this.url += 'tokens/'
    return ( this )
  }

  tokens(tokenHash) {
    this.url += `tokens/${tokenHash}/`
    return ( this )
  }

  /* ---- Modifiers --- */

  async retrieve () {
    let ret
    try {
      const response = await got(this.url, {
          baseUrl: BASE_URL,
          headers: headers,
          json: true
      })
      return response.body
    } catch (error) {
      return error.response.body
    }
  }
}

export default Web3Data
