const {TRANSACTIONS_ENDPOINT: ENDPOINT} = require('./constants')
const {get} = require('./utils')

class Transaction {
  constructor(web3data) {
    this.web3data = web3data
  }

  getGasPrediction() {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'gas/predictions'
    })
  }
}

module.exports = Transaction
