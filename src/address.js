const {
  ERROR_MESSAGE_ADDRESS_NO_ADDRESS: NO_ADDRESS,
  ADDRESSES_ENDPOINT: ENDPOINT
} = require('./constants')

const {
  is,
  get,
  throwIf,
  onFulfilled,
  onError,
  recordsFormatter
} = require('./utils')

/**
 * Contains methods pertaining to the `/address` endpoint of Amberdata's API.
 */
class Address {
  /**
   * Creates an instance of Address.
   *
   * @param web3data - The web3data instance.
   * @example
   */
  constructor(web3data) {
    this.web3data = web3data
  }

  /**
   * Alias of getAll().
   *
   * @param [filterOptions] - The filters associated with the request.
   * @example web3data.address.getAllAddresses({
   * size: 100,
   * })
   */
  getAllAddresses(filterOptions = {}) {
    return this.getAll(filterOptions)
  }

  /**
   * Returns every address that has been seen on the network.
   *
   * @param filterOptions - The filters associated with the request.
   * @param [filterOptions.hash] - Filter by a specific address.
   * @param [filterOptions.size] - The size of the response. <b>Default:</b> `100`.
   * @returns Containing an object with an array of objects containing. See [API docs](https://docs.amberdata.io/reference#get-all-addresses) for details on response.
   * @public
   * @example web3data.address.getAll({
   * size: 100,
   * })
   */
  getAll(filterOptions = {}) {
    return get(this.web3data, {endpoint: ENDPOINT, filterOptions}).then(
      onFulfilled.bind({formatter: recordsFormatter}),
      onError
    )
  }

  getInformation(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'information',
      filterOptions
    }).then(onFulfilled, onError)
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
    }).then(onFulfilled, onError)
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
    return this.web3data.address.getFunctions(hash, filterOptions)
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
      ? this.web3data.address
          .getHistoricalBalance(hash, filterOptions)
          .then(data => data)
      : this.web3data.address
          .getLatestBalance(hash, filterOptions)
          .then(data => data)
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
    }).then(onFulfilled, onError)
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
    }).then(onFulfilled, onError)
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
      ? this.web3data.address.getBalancesBatch(hashes, filterOptions)
      : this.web3data.address.getBalances(hashes, filterOptions)
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
   * @example const await getBalancesBatch(['0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be', '0x06012c8cf97bead5deae237070f9587f8e7a266d'], {
   * includePrice: true
   * })
   */
  getBalancesBatch(hashes, filterOptions = {}) {
    throwIf(!Array.isArray(hashes), 'Must be array of valid address hashes')
    hashes.forEach(hash => throwIf(is.notHash(hash), NO_ADDRESS))
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
    }).then(onFulfilled, onError)
  }

  getUsage(hash, filterOptions) {
    if (is.notHash(hash)) return Promise.reject(new Error(NO_ADDRESS))
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'usage',
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

module.exports = Address
