import ky from 'ky'

const BASE_URL = "https://staging-0000-data-api.amberdata.io/api/v1"

class Web3Data {

  constructor(config) {
    this.config = config

    if(!this.config){
      throw new Error("No configuration object supplied")
    }
    if(!this.config.apiKey){
      throw new Error("No api key supplied")
    }
    if(!this.config.blockchainId){
      throw new Error("No Blockchain specified")
    }

    this.headers = {"x-amberdata-api-key": this.config.apiKey,
                   "x-amberdata-blockchain-id": this.config.blockchainId
    }

    this.url = ""
    this.params = "?"
  }

  //TODO: Create Address object

  /* ---- Methods --- */

  addresses() {
    // Not yet implemented
  }

  addresses(hash) {

    if(!hash) {
      throw new Error("No address hash provided")
    }

    this.url += `/addresses/${hash}`

    return ( this )
  }

  info () {
    this.url += '/information'
    return ( this )
  }

  stats () {
    this.url += '/statistics'
    return ( this )
  }

  transactions(txhash) {
    if (arguments.length === 0) {
      this.url += '/transactions'
    } else {
      this.url += `/transactions/${txhash}`
    }
    return ( this )
  }

  logs(logHash) {
    if (arguments.length === 0) {
      this.url += '/logs'
    } else {
      this.url += `/logs/${logHash}`
    }
    return ( this )
  }

  messages(messageHash) {
    if (arguments.length === 0) {
      this.url += '/functions'
    } else {
      this.url += `/functions/${messageHash}`
    }
    return ( this )
  }

  tokens(tokenHash) {
    if (arguments.length === 0) {
      this.url += '/tokens'
    } else {
      this.url += `/tokens/${tokenHash}`
    }
    return ( this )
  }

  /* ---- Modifiers --- */

  filte(filterOptions) {
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
    for(let filter in filterOptions) {
        this.params += `${filter}=${filterOptions[filter]}&`
    }
    return ( this )
  }

  limit(n){
    this.params += `size=${n}&`
    return ( this )
  }

  offset(index) {
    this.params += `page=${index}&`
    return ( this )
  }

  page(index) {
    this.offset(index)
    return ( this )
  }

  orderBy(fieldName) {
    this.params += `orderBy=${fieldName}&`
    return ( this )
  }

  direction(dir){
    this.params += `direction=${dir}&`
    return ( this )
  }

  async retrieve () {

    try {
      const response = await ky.get(BASE_URL + this.url + this.params, {
          headers: this.headers
      }).json()
      return response
    } catch (error) {
      return response
    }
  }
}

export default Web3Data
