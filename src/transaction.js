import {
  ERROR_MESSAGE_TRANSACTION_NO_HASH as NO_HASH,
  TRANSACTIONS_ENDPOINT as ENDPOINT
} from './constants'
import {get, is} from './utils'

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

  async getTransactions(filterOptions) {
      const response = await get(this.web3data, {
          endpoint: ENDPOINT,
          filterOptions
      })
      return new Promise((resolve, reject) => {
          if (!response || response.status !== 200 || !response.payload || !response.payload.records) {
              reject(new Error('There was an error with the request'))
          } else {
              resolve(response.payload.records)
          }
      })
  }

  async getTransaction(hash, filterOptions) {
    if (!hash) return Promise.reject(new Error(NO_HASH))
    const response = await get(this.web3data, {
      pathParam: hash,
      endpoint: ENDPOINT,
      filterOptions
    })
    return new Promise((resolve, reject) => {
      if (!response || response.status !== 200 || !response.payload) {
        reject(new Error('There was an error with the request'))
      } else {
        resolve(response.payload)
      }
    })
  }

  async getPendingTransactions() {
      const pendingTransactions = await this.getTransactions({status: 'pending'})
      return new Promise((resolve, reject) => {
          if (is.undefined(pendingTransactions) || is.null(pendingTransactions)) {
              reject(new Error('There was an error with the request'))
          } else {
              resolve(pendingTransactions)
          }
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
      } else if (!response.payload) {
        reject(new Error('/gas/predictions failed to respond with payload'))
      } else if (!response.payload.average) {
        reject(
          new Error('/gas/predictions failed to respond with average gas price')
        )
      } else {
        resolve(`${response.payload.average.gasPrice}`)
      }
    })
  }
}

export default Transaction
