const {
  ERROR_MESSAGE_CONTRACT_NO_ADDRESS: NO_ADDRESS,
  CONTRACTS_ENDPOINT: ENDPOINT
} = require('./constants')
const {is, get, throwIf, onFulfilled, onError} = require('./utils')

/**
 * Contains methods pertaining to the `/contracts` endpoint of Amberdata's API.
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
   * @param {string} hash - The address.
   * @returns {Promise<object>} The detailed information for the specified contract.
   * @example const details = await web3data.contract.getDetails('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   */
  getDetails(hash) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      pathParam: hash,
      endpoint: ENDPOINT
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the functions of the specified contract (if available). If not available on chain, the byte code is decompiled and a list of functions is extracted from it.
   *
   * @param {string} hash - The contract address.
   * @returns {Promise<object>} The functions or decompiled functions of the specified contract.
   * @example const functions = await web3data.contract.getFunctions('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   */
  getFunctions(hash) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      pathParam: hash,
      endpoint: ENDPOINT,
      subendpoint: 'functions'
    }).then(onFulfilled, onError)
  }

  /**
   * Alias for getSecurityAudit.
   *
   * @param {string} hash - The contract address.
   * @returns {Promise<object>} The vulnerabilities audit for the specified contract.
   * @example const signatureDetails = await web3data.signature.getAudit('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   */
  getAudit(hash) {
    return this.getSecurityAudit(hash)
  }

  /**
   * Retrieves the vulnerabilities audit for the specified contract (if available).
   *
   * @param {string} hash - The contract address.
   * @returns {Promise<object>} The vulnerabilities audit for the specified contract.
   * @example const audit = await web3data.contract.getSecurityAudit('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   */
  getSecurityAudit(hash) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      pathParam: hash,
      endpoint: ENDPOINT,
      subendpoint: 'audit'
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the contract's abi.
   *
   * @param {string} hash - The contract address.
   * @returns {Promise<object>} The abi of the contract.
   * @example const abi = await web3data.contract.getAbi('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   */
  getAbi(hash) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return this.getDetails(hash).then(({abi}) => abi)
  }

  /**
   * Retrieves the contract's source code.
   *
   * @param {string} hash - The contract address.
   * @returns {Promise<object>} The source of the contract.
   * @example const source = await web3data.contract.getSourceCode('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   */
  getSourceCode(hash) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      pathParam: hash,
      endpoint: ENDPOINT,
      subendpoint: 'source-code'
    }).then(onFulfilled, onError)
  }

  /**
   * Returns the contract's bytecode.
   *
   * @param {string} hash - The contract address.
   * @returns {Promise<object>} The contract's bytecode.
   * @example const code = await web3data.contract.getCode('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   */
  getCode(hash) {
    return this.getDetails(hash).then(details => details.bytecode || '0x')
  }
}

module.exports = Contract
