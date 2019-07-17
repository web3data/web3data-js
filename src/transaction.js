const {TRANSACTIONS_ENDPOINT: ENDPOINT} = require('./constants')
const {get, is} = require('./utils')

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

  async getGasPrice() {
    const response = await this.getGasPrediction()

    // TODO" Update error messages and add them to constants file
    return new Promise((resolve, reject) => {
      if (
        is.null(response) ||
        is.undefined(response) ||
        response.status !== 200
      ) {
        reject(new Error('/gas/predictions failed to respond'))
      } else if (!response.payload || !response.payload.average) {
        reject(new Error('error with request'))
      } else {
        resolve(`${response.payload.average.gasPrice}`)
      }
    })
  }
}

module.exports = Transaction
