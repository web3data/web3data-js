import got from 'got'

const BASE_URL0 = "https://staging-0000-data-api.amberdata.io/api/v1/addresses/0x314159265dd8dbb310642f98f50c066173c1259b/functions"

const BASE_URL = "https://staging-0000-data-api.amberdata.io/api/v1/"
const HEADERS = {
  "x-amberdata-api-key" : "UAK78209f698716e0002b8cefe330b8049f",
  "x-amberdata-blockchain-id" : "1c9c969065fcd1cf"
}
class Web3Data {

  constructor(config) {
    this.config = config
    this.url = ""
  }

  //TODO: Create Address object

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
    this.url += 'transactions/'
    return ( this )
  }

  logs () {

  }

  logs (logHash) {

  }

  messages() {

  }

  messages(messageHash) {

  }



  async retrieve () {
    let ret
    try {
      const response = await got(this.url, {
          baseUrl: BASE_URL,
          headers: HEADERS,
          json: true
      })
      return response.body
    } catch (error) {
      return error.response.body
    }
  }
}

export default Web3Data
