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

  getBlock(blocknumber, filterOptions) {
    return get(this.web3data, {
      pathParam: blocknumber,
      endpoint: ENDPOINT,
      filterOptions
    })
  }
  // TODO" Update error messages and add them to constants file
  async getBlockNumber() {
    const response = await this.getBlock('latest')
    return new Promise(
        (resolve, reject) => {
          if (is.null(response) || is.undefined(response) || response.status !== 200) {
            reject('/blocks/latest failed to respond')
          } else if (!response.payload) {
            reject('/blocks/latest failed to respond with payload')
          } else if (!response.payload.number) {
            reject('/blocks/latest failed to respond with expected data')
          } else {
            resolve(parseInt(response.payload.number))
          }
        })
  }
}

export default Block
