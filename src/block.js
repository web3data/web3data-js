import {get, is} from './utils'
import {
  BLOCKS_ENDPOINT as ENDPOINT,
  ERROR_MESSAGE_BLOCK_NO_NUMBER as NO_BLOCK_NUMBER
} from './constants'

class Block {
  constructor(web3data) {
    this.web3data = web3data
  }

  getTokenTransfers(blocknumber, filterOptions) {
    if (is.undefined(blocknumber))
      return Promise.reject(new Error(NO_BLOCK_NUMBER))
    return get(this.web3data, {
      pathParam: blocknumber,
      endpoint: ENDPOINT,
      subendpoint: 'token-transfers',
      filterOptions
    })
  }
}

export default Block
