import {TRANSACTIONS_ENDPOINT as ENDPOINT} from './constants'
import {get, throwIf, is} from './utils'

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

    throwIf(is.null(response) || is.undefined(response) || response.status !== 200, '/gas/predictions failed to respond')
    throwIf(!response.payload, '/gas/predictions failed to respond with payload')
    throwIf(!response.payload.average, '/gas/predictions failed to respond with average gas price')

    return new Promise(
        (resolve, reject) => {
          if (is.null(response) || is.undefined(response) || response.status !== 200) {
            reject('/gas/predictions failed to respond')
          } else if (!response.payload) {
            reject('/gas/predictions failed to respond with payload')
          } else if (!response.payload.average) {
            reject('/gas/predictions failed to respond with average gas price')
          } else {
            resolve(`${response.payload.average.gasPrice}`)
          }
      })
  }
}

export default Transaction
