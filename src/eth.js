const {throwIf, ethFactory} = require('./utils')
const {BLOCKCHAIN_ID_ETHEREUM_MAINNET: BLOCKCHAIN_ID} = require('./constants')

/**
 * Class for all Ethereum based methods.
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

  /**
   * Returns the balance of the account in wei or null if the account doesn't
exist.
   *
   * @param hash - The address of the account.
   * @returns - The balance or null if it doesn't exist.
   * @example
   */
  async getBalance(hash) {
    let balance
    try {
      balance = await this.web3data.address.getBalance(hash)
    } catch (error) {
      throwIf(true, error.message)
    }

    return balance && balance.value ? balance.value : null
  }

  /* See Web3Data class for details on rpc method */
  rpc(method, params) {
    return this.web3data.rpc(method, params)
  }
}

module.exports = Eth
