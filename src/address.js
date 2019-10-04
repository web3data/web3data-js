const {
  ERROR_MESSAGE_ADDRESS_NO_ADDRESS: NO_ADDRESS,
  ADDRESSES_ENDPOINT: ENDPOINT,
  HTTP_CODE_NOT_FOUND: NOT_FOUND
} = require('./constants')

const {is, get, throwIf, onFulfilled, onError} = require('./utils')

/**
 * Contains methods pertaining to the `/address` endpoint of Amberdata's API.
 */
class Address {
  /**
   * Creates an instance of Address.
   *
   * @param web3data
   * @example
   */
  constructor(web3data) {
    this.web3data = web3data
  }

  /**
   * Returns every address that has been seen on the network.
   * @param filterOptions - The filters associated with the request.
   * @param [filterOptions.hash] - Filter by a specific address.
   * @param [filterOptions.size] - The size of the response. <b>Default:</b> `100`.
   * @returns Containing an object with an array of objects containing. See [API docs](https://docs.amberdata.io/reference#get-all-addresses) for details on return.
   * @public
   * @example web3data.address.getAllAddresses({
   * size: 100,
   * })
   */
  getAllAddresses(filterOptions = {}) {
    return get(this.web3data, {endpoint: ENDPOINT, filterOptions}).then(
      response =>
        response.error ? throwIf(true, response.message) : response.payload,
      error => throwIf(true, error.response.data.message)
    )
  }

  getInformation(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'information',
      filterOptions
    }).then(
      response =>
        response.error ? throwIf(true, response.message) : response.payload,
      error => throwIf(true, error.response.data.message)
    )
  }

  getMetadata(hash, filterOptions) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'metadata',
      filterOptions
    }).then(onFulfilled, onError)
  }

  getAdoption(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'adoption',
      filterOptions
    }).then(
      response =>
        response.error ? throwIf(true, response.message) : response.payload,
      error => throwIf(true, error.response.data.message)
    )
  }

  /**
   * Retrieves the functions (aka internal messages) where this address is either the originator or a recipient.
   *
   * @param hash - The address of the account.
   * @param filterOptions - The filter options associated with the request.
   * @returns The balance data of the account or if no address is found.
   * @example
   */
  getInternalMessages(hash, filterOptions = {}) {
    return this.getFunctions(hash, filterOptions)
  }

  /**
   * Retrieves the functions (aka internal messages) where this address is either the originator or a recipient.
   *
   * @param hash - The address of the account.
   * @param filterOptions - The filter options associated with the request.
   * @returns The balance data of the account or if no address is found.
   * @example
   */
  getFunctions(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'functions',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the logs for the transactions where this address is either the originator or a recipient.
   *
   * @param hash - The address of the account.
   * @param filterOptions - The filter options associated with the request.
   * @returns Promise object containing the array of logs.
   * @public
   * @example web3data.getLogs('0x...')
   */
  getLogs(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'logs',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the transactions where this address was either the originator or a recipient.
   *
   * @param hash - The address of the account.
   * @param filterOptions - The filter options associated with the request.
   * @returns The object containing the array of transaction objects.
   * @example
   */
  getTransactions(hash, filterOptions = {}) {
    throwIf(!hash, NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'transactions',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves pending transactions the specified address is involved in.
   *
   * @param hash - The address of the account.
   * @param filterOptions - The filter options associated with the request.
   * @returns The array of pending transactions.
   * @example
   */
  getPendingTransactions(hash, filterOptions = {}) {
    throwIf(!hash, NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'pending-transactions',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the latest or historical balance data of the given address depending upon
Returns null if no address is found.
   *
   * @param hash - the address of the account
   * @param filterOptions - the filter options associated with the request
   * @returns the balance data of the account or if no address is found.
   * @example
   */
  getBalance(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return filterOptions.startDate || filterOptions.endDate
      ? this.getHistoricalBalance(hash, filterOptions).then(data => data)
      : this.getLatestBalance(hash, filterOptions).then(data => data)
  }

  /**
   * Retrieves the latest balance data of the given address. Returns null if no address is found.
   *
   * @param hash - The address of the account.
   * @param filterOptions - The filter options associated with the request.
   * @returns The balance data of the account or if no address is found.
   * @example
   */
  getLatestBalance(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'account-balances/latest',
      filterOptions
    })
      .then(
        /* If response has an error throw, if the address is not found return null, otherwise return the data */
        response =>
          throwIf(response.error, response.message) ||
          response.status === NOT_FOUND
            ? null
            : response.payload
      )
      .catch(error =>
        error.response
          ? throwIf(true, error.response.data.message)
          : 'Error with request'
      )
  }

  /**
   * Retrieves the historical balance data of the given address. Returns null if no address is found.
   *
   * @param hash - The address of the account.
   * @param filterOptions - The filter options associated with the request.
   * @returns The historical balance data of the account or if no address is found.
   * @example
   */
  getHistoricalBalance(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'account-balances/historical',
      filterOptions
    })
      .then(
        /* If response has an error throw, if the address is not found return null, otherwise return the data */
        response =>
          throwIf(response.error, response.message) ||
          response.status === NOT_FOUND
            ? null
            : response.payload
      )
      .catch(error =>
        error.response
          ? throwIf(true, error.response.data.message)
          : 'Error with request'
      )
  }

  /**
   * Retrieves the latest account and token balances for the specified address(es).
   *
   * @param hashes - The array or string containing the address(es) of the account.
   * @param filterOptions - The filter options associated with the request.
   * @returns The balance data of the account(s).
   * @example
   */
  getMultipleBalances(hashes, filterOptions = {}) {
    return Array.isArray(hashes)
      ? this.getBalancesBatch(hashes, filterOptions)
      : this.getBalances(hashes, filterOptions)
  }

  /**
   * Retrieves the latest account and token balances for the specified address.
   *
   * @param hash - The address of the account.
   * @param filterOptions - The filter options associated with the request.
   * @returns The balance data of the account.
   * @example
   */
  getBalances(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'balances',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the latest account and token balances for the specified addresses.
   *
   * @param hashes - The array containing the address(es) of the account.
   * @param filterOptions - The filter options associated with the request.
   * @returns The balance data of the account(s).
   * @example
   */
  getBalancesBatch(hashes, filterOptions = {}) {
    throwIf(!Array.isArray(hashes), 'Must be array of valid address hashes')
    hashes.map(hash => throwIf(is.notHash(hash), NO_ADDRESS))
    filterOptions.addresses = hashes
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'balances',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the balance data of the given address. Returns null if no address is found.
   *
   * @param hash - The address of the account.
   * @param filterOptions - The filter options associated with the request.
   * @returns The token balance data of the account.
   * @example
   */
  getTokens(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'tokens',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves all token transfers involving the specified address.
   *
   * @param hash - The address of the account.
   * @param filterOptions - The filter options associated with the request.
   * @returns The object containing the array of token transfer objects.
   * @example
   */
  getTokenTransfers(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'token-transfers',
      filterOptions
    }).then(onFulfilled, onError)
  }

  getTokenBalances(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'token-balances',
      filterOptions
    }).then(
      response =>
        response.error ? throwIf(true, response.message) : response.payload,
      error => throwIf(true, error.response.data.message)
    )
  }

  getUsage(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'usage',
      filterOptions
    }).then(
      response =>
        response.error ? throwIf(true, response.message) : response.payload,
      error => throwIf(true, error.response.data.message)
    )
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

module.exports = Address
