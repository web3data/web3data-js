const {BLOCKCHAINS_ENDPOINT: ENDPOINT} = require('./constants')

const {get, onFulfilled, onError} = require('./utils')

class Blockchain {
  constructor(web3data) {
    this.web3data = web3data
  }

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
