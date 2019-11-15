const {
  BLOCKCHAIN_ID_STELLAR: BLOCKCHAIN_ID,
  BTC_METHODS: METHODS
} = require('./constants')
const {methodFactory} = require('./utils')

/**
 * Class for all Stellar based methods.
 *
 * @private
 */
class Xlm {
  constructor(Web3data, apiKey, options) {
    options.blockchainId = BLOCKCHAIN_ID
    this.web3data = new Web3data(apiKey, options)
    methodFactory(this, METHODS)
  }

  /* See Web3Data class for details on rpc method */
  rpc(method, params) {
    return this.web3data.rpc(method, params)
  }
}

module.exports = Xlm
