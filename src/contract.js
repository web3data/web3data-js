const {
  ERROR_MESSAGE_CONTRACT_NO_ADDRESS: NO_ADDRESS,
  CONTRACTS_ENDPOINT: ENDPOINT
} = require('./constants')
const {is, get, throwIf, onFulfilled, onError} = require('./utils')

/**
 * Contains methods pertaining to the `/contract` endpoint of Amberdata's API.
 */
class Contract {
  /**
   * Creates an instance of Contract.
   *
   * @param web3data - The web3data instance.
   * @example
   */
  constructor(web3data) {
    this.web3data = web3data
  }

  /**
   * Retrieves all the detailed information for the specified contract (ABI, bytecode, sourcecode...).
   *
   * @param hash - The address.
   * @returns The detailed information for the specified contract.
   * @example
   */
  getDetails(hash) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      pathParam: hash,
      endpoint: ENDPOINT
    }).then(onFulfilled, onError)
  }

  getFunctions(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      pathParam: hash,
      endpoint: ENDPOINT,
      subendpoint: 'functions',
      filterOptions
    })
  }

  getAudit(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      pathParam: hash,
      endpoint: ENDPOINT,
      subendpoint: 'audit',
      filterOptions
    })
  }

  getAbi(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      pathParam: hash,
      endpoint: ENDPOINT,
      subendpoint: 'abi',
      filterOptions
    })
  }

  getSourceCode(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      pathParam: hash,
      endpoint: ENDPOINT,
      subendpoint: 'source-code',
      filterOptions
    })
  }

  getCode(hash) {
    return this.getDetails(hash).then(details => details.bytecode || '0x')
  }
}

module.exports = Contract
