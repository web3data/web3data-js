const {ethFactory} = require('./utils')
const {BLOCKCHAIN_ID_ETHEREUM_MAINNET: BLOCKCHAIN_ID} = require('./constants')

/**
 * Class for all Ethereum based methods.
 *
 * @private
 */
class Eth {
  constructor(Web3data, apiKey, options) {
    options.blockchainId = BLOCKCHAIN_ID
    this.web3data = new Web3data(apiKey, options)

    /* Get object containing eth specific methods */
    const methods = ethFactory(this.web3data)

    /* Defines the methods from above on the Eth instance */
    for (const method in methods) {
      if ({}.hasOwnProperty.call(methods, method)) {
        this[method] = methods[method]
      }
    }
  }

  /* See Web3Data class for details on rpc method */
  rpc(method, params) {
    return this.web3data.rpc(method, params)
  }
}

module.exports = Eth
