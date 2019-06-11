import {
  ERROR_MESSAGE_CONTRACT_NO_ADDRESS as NO_ADDRESS,
  CONTRACTS_ENDPOINT as ENDPOINT
} from './constants'
import {is, get} from './utils'

class Contract {
  constructor(web3data) {
    this.web3data = web3data
  }

  getDetails(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {hash, endpoint: ENDPOINT, filterOptions})
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

  getAudit(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'audit',
      filterOptions
    })
  }

  getAbi(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'abi',
      filterOptions
    })
  }

  getSourceCode(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'source-code',
      filterOptions
    })
  }
}

export default Contract
