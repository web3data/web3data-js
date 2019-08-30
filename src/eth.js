const {throwIf, ethFactory} = require('./utils')

/**
 * Class for all Ethereum based methods.
 */
class Eth {
  constructor(web3data) {
    this.web3data = web3data

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
   * exist.
   * @param {String} hash - the address of the account
   * @return {Promise<*>} - the balance or null if it doesn't exist
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
}

module.exports = Eth
