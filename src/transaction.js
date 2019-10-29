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
   * @param [filterOptions.includePrice] - Indicates whether or not to include price data with the results.
   * @returns All transactions matched by the specified filters.
   * @example const transactions = await web3data.transaction.getTransactions()
   *
   * // Include pricing data with transactions
   * const transactions = await web3data.transaction.getTransactions({
   * includePrice: true
   * })
   */
  getTransactions(filterOptions = {}) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the transaction data for the specified hash.
   *
   * @param hash - The transaction hash.
   * @param [filterOptions] - The filter options associated with the request. See [docs](https://docs.amberdata.io/reference#get-transaction) for more details.
   * @param [filterOptions.validationMethod=none] - The validation method to be added to the response: `none`, `basic`, `full`.
   * @param [filterOptions.includePrice=true] - Indicates whether or not to include price data with the results.
   * @returns The data for the specified transaction hash.
   * @example const transaction = await web3data.transaction.getTransaction('0xd0a5a0912fdf87993b3cebd696f1ee667a8fbbe8fc890a22dcbdf114f36de4cf')
   */
  getTransaction(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_HASH)
    return get(this.web3data, {
      pathParam: hash,
      endpoint: ENDPOINT,
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves all pending transaction.
   *
   * @returns The pending transactions.
   * @example const pendingTransactions = await web3data.transaction.getPendingTransactions()
   */
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

  /**
   * Retrieves the latest gas predictions for the transactions.
   *
   * @returns The latest gas predictions for the transactions.
   * @example
   */
  getGasPrediction() {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'gas/predictions'
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the latest gas price percentiles for the transactions.
   *
   * @param [filterOptions] - The filter options associated with the request.
   * @param [filterOptions.numBlocks] - Number of past blocks on which to base the percentiles.
   * @returns The latest gas price percentiles for the transactions.
   * @example
   */
  getGasPercentiles(filterOptions = {}) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'gas/percentiles',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the latest average gas price. Uses `getGasPrediction` under the hood.
   *
   * @returns The latest gas price.
   * @example
   */
  getGasPrice() {
    return this.getGasPrediction().then(gasPrediction => {
      throwIf(
        !gasPrediction.average || !gasPrediction.average.gasPrice,
        'Failed to retrieve gas price.'
      )
      return `${gasPrediction.average.gasPrice}`
    })
  }

  /**
   * Retrieves the historical (time series) volume of transactions.
   *
   * @param [filterOptions] - The filter options associated with the request. See [docs](https://docs.amberdata.io/reference#get-historical-transaction-volume) for more details.
   * @returns The historical (time series) volume of transactions.
   * @example
   */
  getVolume(filterOptions = {}) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'volume',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Get metrics for recent confirmed transactions for a given blockchain. Default metrics are over a 24h period.
   *
   * @returns Metrics for recent confirmed transactions.
   * @example
   */
  getMetrics(filterOptions = {}) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'metrics/latest',
      filterOptions
    }).then(onFulfilled, onError)
  }
}

module.exports = Transaction
