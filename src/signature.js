const {get, is} = require('./utils')
const {
  SIGNATURES_ENDPOINT: ENDPOINT,
  ERROR_MESSAGE_SIGNATURE_NO_HASH: NO_HASH
} = require('./constants')

class Signature {
  constructor(web3data) {
    this.web3data = web3data
  }

  get4Byte(hash) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_HASH))
    return get(this.web3data, {pathParam: hash, endpoint: ENDPOINT})
  }
}

module.exports = Signature
