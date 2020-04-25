const {
  BLOCKCHAIN_ID_ZCASH: BLOCKCHAIN_ID,
  BTC_METHODS: METHODS
} = require('./constants')
const {methodFactory} = require('./utils')

/**
 * Class for all ZCash based methods.
 *
 * @private
 */
class Zec {
  constructor(Web3data, apiKey, options) {
    options.blockchainId = BLOCKCHAIN_ID
    this.web3data = new Web3data(apiKey, options)
    methodFactory(this, METHODS)
  }

  /* See Web3Data class for details on rpc method */
  rpc(method, parameters) {
    return this.web3data.rpc(method, parameters)
  }
}

module.exports = Zec
