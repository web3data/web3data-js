const {
  TRANSACTIONS_ENDPOINT: ENDPOINT,
  ERROR_MESSAGE_TRANSACTION_NO_HASH: NO_HASH
} = require('./constants')

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

  async getTransactions(filterOptions) {
    const response = await get(this.web3data, {
      endpoint: ENDPOINT,
      filterOptions
    })
    return new Promise((resolve, reject) => {
      if (
        !response ||
        response.status !== 200 ||
        !response.payload ||
        !response.payload.records
      ) {
        reject(new Error('Failed to retrieve transactions.'))
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
        reject(new Error('Failed to retrieve transaction.'))
      } else {
        resolve(response.payload)
      }
    })
  }

  async getPendingTransactions() {
    const pendingTransactions = await this.getTransactions({status: 'pending'})
    return new Promise((resolve, reject) => {
      if (is.undefined(pendingTransactions) || is.null(pendingTransactions)) {
        reject(new Error('Failed to retrieve pending transactions.'))
      } else {
        resolve(pendingTransactions)
      }
    })
  }

  async getGasPrice() {
    const response = await this.getGasPrediction()
    return new Promise((resolve, reject) => {
      if (
        is.null(response) ||
        is.undefined(response) ||
        response.status !== 200
      ) {
        reject(new Error('Failed to retrieve gas price.'))
      } else if (!response.payload || !response.payload.average) {
        reject(new Error('Failed to retrieve gas price.'))
      } else {
        resolve(`${response.payload.average.gasPrice}`)
      }
    })
  }
}

module.exports = Transaction
