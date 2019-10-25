const {
  TRANSACTIONS_ENDPOINT: ENDPOINT,
  ERROR_MESSAGE_TRANSACTION_NO_HASH: NO_HASH
} = require('./constants')

const {is, get, onFulfilled, onError, throwIf} = require('./utils')

class Transaction {
  constructor(web3data) {
    this.web3data = web3data
  }

  getTransactions(filterOptions) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      filterOptions
    }).then(onFulfilled, onError)
  }

  getTransaction(hash, filterOptions) {
    throwIf(is.notHash(hash), NO_HASH)
    return get(this.web3data, {
      pathParam: hash,
      endpoint: ENDPOINT,
      filterOptions
    }).then(onFulfilled, onError)
  }

  getPendingTransactions() {
    return this.getTransactions({status: 'pending'}).then(
      pendingTransactions => {
        throwIf(
          is.undefined(pendingTransactions) || is.null(pendingTransactions),
          'Failed to retrieve pending transactions.'
        )
        return pendingTransactions
      },
      console.error
    )
  }

  getGasPrediction() {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'gas/predictions'
    }).then(onFulfilled, onError)
  }

  getGasPrice() {
    return this.getGasPrediction().then(gasPrediction => {
      throwIf(
        !gasPrediction.average || !gasPrediction.average.gasPrice,
        'Failed to retrieve gas price.'
      )
      return `${gasPrediction.average.gasPrice}`
    })
  }

  // TODO: Needs tests
  getVolume(filterOptions) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'volume',
      filterOptions
    }).then(onFulfilled, onError)
  }

  // TODO: Needs tests
  getMetrics(filterOptions) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'metrics/latest',
      filterOptions
    }).then(onFulfilled, onError)
  }
}

module.exports = Transaction
