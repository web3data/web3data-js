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
   * @param {object} web3data - The web3data instance.
   * @example
   * const address = new Address(new Web3Data('API_KEY'))
   */
  constructor(web3data) {
    this.web3data = web3data
  }

  /**
   * Alias of getAll().
   *
   * @param {object} [filterOptions] - The filters associated with the request.
   * @returns {Promise<Array>} Containing an object with an array of objects containing.
   * @example
   * const addresses = web3data.address.getAllAddresses({
   * size: 100,
   * })
   */
  getAllAddresses(filterOptions = {}) {
    return this.getAll(filterOptions)
  }

  /**
   * Returns every address that has been seen on the network.
   *
   * @param {object} [filterOptions] - The filters associated with the request.
   * @param {string} [filterOptions.hash] - Filter by a specific address.
   * @param {number} [filterOptions.size] - The size of the response. <b>Default:</b> `100`.
   * @returns {Promise<Array>} Containing an object with an array of objects containing. See [API docs](https://docs.amberdata.io/reference#get-all-addresses) for details on response.
   * @public
   * @example
   * const addresses = await web3data.address.getAll({
   * size: 100,
   * })
   */
  getAll(filterOptions = {}) {
    return get(this.web3data, {endpoint: ENDPOINT, filterOptions}).then(
      onFulfilled.bind({formatter: recordsFormatter}),
      onError
    )
  }

  /**
   * Retrieves information about the specified address: network(s) and blockchain(s) this address exist within.
   *
   * @param {string} hash - The address of the account.
   * @param {object} [filterOptions] - The filter options associated with the request. See [docs](https://docs.amberdata.io/reference#get-account-information) for more details.
   * @returns {Promise<object>} The information about the specified address.
   * @example
   * const info = await web3data.address.getInformation('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   */
  getInformation(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'information',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves statistics about the specified address: balances, holdings, etc.
   *
   * @param {string} hash - The address of the account.
   * @param {object} [filterOptions] - The filter options associated with the request.
   * @returns {Promise<Array>} The statistics about the specified address.
   * @example
   * const metadata = await web3data.address.getMetadata('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   */
  getMetadata(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'metadata',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the historical adoption for the specified address.
   *
   * @param {string} hash - The address of the account.
   * @param {object} [filterOptions] - The filters associated with the request. See [API docs](https://docs.amberdata.io/reference#get-address-adoption) for details.
   * @returns {Promise<object>} The historical adoption data for the specified address.
   * @example
   * const adoption = await web3data.address.getAdoption('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   */
  getAdoption(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
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
   * @param {string} hash - The address of the account.
   * @param {object} [filterOptions] - The filter options associated with the request.
   * @returns {Promise<object>} The balance data of the account or if no address is found.
   * @example
   * const internalMessages = await web3data.address.getInternalMessages('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   */
  getInternalMessages(hash, filterOptions = {}) {
    return this.web3data.address.getFunctions(hash, filterOptions)
  }

  /**
   * Retrieves the functions (aka internal messages) where this address is either the originator or a recipient.
   *
   * @param {string} hash - The address of the account.
   * @param {object} [filterOptions] - The filter options associated with the request.
   * @returns {Promise<object>}The balance data of the account or if no address is found.
   * @example
   * const functions = await web3data.address.getFunctions('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   */
  getFunctions(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'functions',
      filterOptions
    }).then(onFulfilled.bind({formatter: recordsFormatter}), onError)
  }

  /**
   * Retrieves the logs for the transactions where this address is either the originator or a recipient.
   *
   * @param {string} hash - The address of the account.
   * @param {object} [filterOptions] - The filter options associated with the request.
   * @returns {Promise<object>}Promise object containing the array of logs.
   * @public
   * @example
   * const logs = await web3data.address.getLogs('0x...')
   */
  getLogs(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'logs',
      filterOptions
    }).then(onFulfilled.bind({formatter: recordsFormatter}), onError)
  }

  /**
   * Retrieves the transactions where this address was either the originator or a recipient.
   *
   * @param {string} hash - The address of the account.
   * @param {object} [filterOptions] - The filter options associated with the request. See [docs](https://docs.amberdata.io/reference#get-address-transactions) for more details.
   * @returns {Promise<object>} The object containing the array of transaction objects.
   * @example
   * const transactions = await web3data.address.getTransactions('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   */
  getTransactions(hash, filterOptions = {}) {
    throwIf(!hash, NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'transactions',
      filterOptions
    }).then(onFulfilled.bind({formatter: recordsFormatter}), onError)
  }

  /**
   * Retrieves pending transactions the specified address is involved in.
   *
   * @param {string} hash - The address of the account.
   * @param {object} [filterOptions] - The filter options associated with the request. See [docs](https://docs.amberdata.io/reference#address-pending-transactions) for more details.
   * @returns {Promise<object>} The array of pending transactions.
   * @example
   * const pendingTransactions = await web3data.address.getPendingTransactions('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   */
  getPendingTransactions(hash, filterOptions = {}) {
    throwIf(!hash, NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'pending-transactions',
      filterOptions
    }).then(onFulfilled.bind({formatter: recordsFormatter}), onError)
  }

  /**
   * Retrieves the latest or historical balance data of the given address depending upon the specified filter options.
Returns null if no address is found.
   *
   * @param {string} hash - The address of the account.
   * @param {object} [filterOptions] - The filter options associated with the request. See [docs](https://docs.amberdata.io/reference#get-current-account-balance) for more details.
   * @param {object} [filterOptions.includeTokens=false] - Return the token balances that the address is holding.
   * @returns {Promise<object>} The balance data of the account or if no address is found.
   * @example
   * const balance = await web3data.address.getBalance('0x06012c8cf97bead5deae237070f9587f8e7a266d')
   */
  getBalance(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    let subendpoint = 'information'

    if (Array.isArray(hash)) {
      subendpoint = 'balances'
      filterOptions.addresses = hash
    } else if (filterOptions.includeTokens) subendpoint = 'balances'
    else if (filterOptions.startDate || filterOptions.endDate)
      subendpoint = 'account-balances/historical'

    return get(this.web3data, {
      // Include 'hash' only if filterOptions.addresses not defined
      ...(filterOptions.addresses ? {} : {hash}),
      endpoint: ENDPOINT,
      subendpoint,
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the balance data of the given address. Returns null if no address is found.
   *
   * @param {string} hash - The address of the account.
   * @param {object} [filterOptions] - The filter options associated with the request. See [docs](https://docs.amberdata.io/reference#address-tokens) for more details.
   * @returns {Promise<Array>} The token balance data of the account.
   * @example
   * const tokens = await web3data.addresses.getTokens('0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be')
   */
  getTokens(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'tokens',
      filterOptions
    }).then(onFulfilled.bind({formatter: recordsFormatter}), onError)
  }

  /**
   * Retrieves all token transfers involving the specified address.
   *
   * @param {string} hash - The address of the account.
   * @param {object} [filterOptions] - The filter options associated with the request.
   * @returns {Promise<Array>} The object containing the array of token transfer objects.
   * @example
   * const tokenTransfers = await web3data.addresses.getTokenTransfers('0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be')
   */
  getTokenTransfers(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'token-transfers',
      filterOptions
    }).then(onFulfilled.bind({formatter: recordsFormatter}), onError)
  }

  /**
   * Retrieves the historical (time series) token balances for the specified address.
   *
   * @param {string} hash - The address of the account.
   * @param {object} [filterOptions] - The filter options associated with the request.
   * @returns {Promise<Array>} The historical (time series) token balances for the specified address.
   * @example
   * const tokenBalances = await web3data.addresses.getTokenBalances('0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be')
   */
  getTokenBalances(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'token-balances',
      filterOptions
    }).then(onFulfilled.bind({formatter: recordsFormatter}), onError)
  }

  /**
   * Retrieves the historical usage for the specified address.
   *
   * @param {string} hash - The address of the account.
   * @param {object} [filterOptions] - The filters associated with the request. See [API docs](https://docs.amberdata.io/reference#get-address-usage) for details.
   * @returns {Promise<object>} The usage statistics for the specified address.
   * @example const usage = await web3data.address.getUsage('0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be')
   */
  getUsage(hash, filterOptions = {}) {
    throwIf(is.notHash(hash), NO_ADDRESS)
    return get(this.web3data, {
      hash,
      endpoint: ENDPOINT,
      subendpoint: 'usage',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Get metrics for all addresses that have exist publicly for a given blockchain. Default metrics are for Ethereum over a 24h period.
   *
   * @returns {Promise<object>} The address metrics.
   * @example
   * const metrics = await web3data.address.getMetrics('0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be')
   */
  getMetrics() {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'metrics/latest'
    }).then(onFulfilled, onError)
  }
}

module.exports = Address
