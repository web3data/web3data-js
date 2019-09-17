const {BLOCKCHAIN_ID_BITCOIN: BLOCKCHAIN_ID} = require('./constants')

/**
 * Class for all Bitcoin based methods.
 */
class Btc {
  constructor(Web3data, apiKey, options) {
    options.blockchainId = BLOCKCHAIN_ID
    this.web3data = new Web3data(apiKey, options)
  }

  rpc(method, params) {
    return this.web3data.rpc(method, params)
  }
}

module.exports = Btc
