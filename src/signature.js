import {get, is} from './utils'
import {
  SIGNATURES_ENDPOINT as ENDPOINT,
  ERROR_MESSAGE_SIGNATURE_NO_HASH as NO_HASH
} from './constants'

class Signature {
  constructor(web3data) {
    this.web3data = web3data
  }

  get4Byte(hash) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_HASH))
    return get(this.web3data, {pathParam: hash, endpoint: ENDPOINT})
  }
}

export default Signature
