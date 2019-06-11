import {TRANSACTIONS_ENDPOINT as ENDPOINT} from './constants'
import {get} from './utils'

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

export default Transaction
