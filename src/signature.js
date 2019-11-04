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
   * @param web3data - The web3data instance.
   * @example
   */
  constructor(web3data) {
    this.web3data = web3data
  }

  /**
   * Retrieves detailed information about the specified signature hash.
   *
   * @param hash - The (keccak 256) of the signature.
   * @returns Information pertaining to the specified signature hash.
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
