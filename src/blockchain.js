const {BLOCKCHAINS_ENDPOINT: ENDPOINT} = require('./constants')

const {get, onFulfilled, onError} = require('./utils')

class Blockchain {
  /**
   * Creates an instance of Address.
   *
   * @param {object} web3data - The web3data instance.
   * @example
   * const address = new Address(new Web3Data('API_KEY'))
   */
  constructor(web3data) {
    this.web3data = web3data
  }

  /**
   * Get metrics for a blockchain for a given blockchain ID. Default metrics are for Ethereum over a 24h period.
   *
   * @param {object} [filterOptions] - The filters associated with the request. See [API docs](https://docs.amberdata.io/reference#blockchains-metrics-latest) for details.
   * @returns {Promise<object>} The blockchain metrics.
   * @example
   * const metrics = await web3data.blockchain.getMetrics()
   */
  getMetrics(filterOptions) {
    const subendpoint =
      filterOptions && (filterOptions.startDate || filterOptions.endDate)
        ? 'historical'
        : 'latest'
    return get(this.web3data, {
      endpoint: `${ENDPOINT}/metrics`,
      subendpoint,
      filterOptions
    }).then(onFulfilled, onError)
  }
}

module.exports = Blockchain
