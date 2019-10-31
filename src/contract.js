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
   * @example const details = await web3data.contract.getDetails('0x06012c8cf97bead5deae237070f9587f8e7a266d')
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

  /**
   * Retrieves the contract's abi.
   *
   * @param hash - The contract address.
   * @returns The abi of the contract.
   * @example
   * const abi = await web3data.contract.getAbi('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   */
  getAbi(hash) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return this.getDetails(hash).then(({abi}) => abi)
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
