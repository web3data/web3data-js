const {
  TRANSACTIONS_ENDPOINT: ENDPOINT,
  ERROR_MESSAGE_TRANSACTION_NO_HASH: NO_HASH
} = require('./constants')

const {is, get, onFulfilled, onError, throwIf} = require('./utils')

/**
 * Contains methods pertaining to the `/address` endpoint of Amberdata's API.
 * See [documentation](https://docs.amberdata.io/reference#get-all-transactions) details about our transaction endpoints.
 */
class Transaction {
  /**
   * Creates an instance of Transaction. Meant to be used in conjunction with the Web3Data class.
   *
   * @param web3data - The web3data instance.
   * @example
   */
  constructor(web3data) {
    this.web3data = web3data
  }

  /**
   * Retrieves all transactions matching the specified filters.
   *
   * @param [filterOptions] - The filter options associated with the request.
   * @param [filterOptions.status] - Filter by the status of the transactions to retrieve (all, completed, failed, pending).
   * @returns - All transactions matched by the specified filters.
   * @example const transactions = await web3data.transaction.getTransactions()
   */
  getTransactions(filterOptions = {}) {
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

  getGasPercentiles(filterOptions) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'gas/percentiles',
      filterOptions
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

  getVolume(filterOptions) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'volume',
      filterOptions
    }).then(onFulfilled, onError)
  }

  getMetrics(filterOptions) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'metrics/latest',
      filterOptions
    }).then(onFulfilled, onError)
  }
}

module.exports = Transaction
