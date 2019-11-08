const {get, is, throwIf, onError, onFulfilled} = require('./utils')
const {
  SIGNATURES_ENDPOINT: ENDPOINT,
  ERROR_MESSAGE_SIGNATURE_NO_HASH: NO_HASH
} = require('./constants')

/**
 * Contains methods pertaining to the `/signatures` endpoint of Amberdata's API.
 */
class Signature {
  /**
   * Creates an instance of Signature.
   *
   * @param {object} web3data - The web3data instance.
   * @example new Signature(new Web3Data('API_KEY'))
   */
  constructor(web3data) {
    this.web3data = web3data
  }

  /**
   * Alias for getSignature.
   *
   * @param {string} hash - The (keccak 256) of the signature.
   * @returns {Promise<Array>} Information pertaining to the specified signature hash.
   * @example const signatureDetails = await web3data.signature.getAudit('0xe2f0a05a')
   */
  getAudit(hash) {
    return this.getSignature(hash)
  }

  /**
   * Retrieves detailed information about the specified signature hash.
   *
   * @param {string} hash - The (keccak 256) of the signature.
   * @returns {Promise<Array>} Information pertaining to the specified signature hash.
   * @example const signatureDetails = await web3data.signature.getSignature('0xe2f0a05a')
   */
  getSignature(hash) {
    throwIf(is.notHash(hash), NO_HASH)
    return get(this.web3data, {hash, endpoint: ENDPOINT}).then(
      onFulfilled,
      onError
    )
  }
}

module.exports = Signature
