const {get, throwIf} = require('./utils')
const {MARKET_ENDPOINT: ENDPOINT} = require('./constants')

class Market {
  constructor(web3data) {
    this.web3data = web3data
  }

  async getEtherPrice() {
    const response = await get(this.web3data, {
      endpoint: ENDPOINT + '/prices/eth/latest'
    })
    throwIf(
      !response || response.status !== 200 || !response.payload,
      'Failed to retrieve Ether price.'
    )
    return response.payload
  }
}

module.exports = Market
