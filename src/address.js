import {buildFilterUrl, is, throwIf} from './utils'
const ADDRESSES_ENDPOINT = '/addresses'

const checkHash = (hash) => {throwIf(is.undefined(hash) || is.emptyString(hash), 'No address hash supplied'); return hash}

class Address {
  constructor(web3data) {
    this.web3data = web3data
  }

  /**
   * Builds the endpoint url to pass to .rawQuery(). Checks for non empties and appends
   * the appropriate parameter(s) where applicable.
   * @param {string} endpoint The sub endpoint
   * @param {string} hash The address hash
   * @param {object} filterOptions The filters associated with a given endpoint
   */
  async get({endpoint = '', hash = '', filterOptions = {}}) {
    const filters = is.nonEmptyObject(filterOptions) ? '?'  + buildFilterUrl(filterOptions) : ''
    hash = hash ? '/' + hash : ''
    endpoint = endpoint ? '/' + endpoint : ''
    return await this.web3data.rawQuery(
        `${ADDRESSES_ENDPOINT}${hash}${endpoint}${filters}`
    )
  }

  // CONSIDER: adding "allowed" filters
  async getAllAddress(filterOptions) {
    return await this.get({filterOptions: filterOptions})
  }

  async getInformation(hash, filterOptions) {
    return await this.get({hash:checkHash(hash),  endpoint:'information', filterOptions: filterOptions})
  }

  async getStats(hash, filterOptions) {
    return await this.get({hash:checkHash(hash),  endpoint:'statistics', filterOptions: filterOptions})
  }

  async getAdoption(hash, filterOptions) {
    return await this.get({hash:checkHash(hash),  endpoint:'adoption', filterOptions: filterOptions})
  }

  async getInternalMessages(hash, filterOptions) {
    return await this.get({hash:checkHash(hash),  endpoint:'internal-messages', filterOptions: filterOptions})
  }

  async getFunctions(hash, filterOptions) {
    return await this.get({hash:checkHash(hash),  endpoint:'functions', filterOptions: filterOptions})
  }

  async getLogs(hash, filterOptions) {
    return await this.get({hash:checkHash(hash),  endpoint:'logs', filterOptions: filterOptions})
  }

  async getTransactions(hash, filterOptions) {
    return await this.get({hash:checkHash(hash),  endpoint:'transactions', filterOptions: filterOptions})
  }
  /* Checks if the filterOptions object has a start or end Date, if it does, then the historical endpoint is hit */
  async getBalance(hash, filterOptions = {}) {
    let endpoint = filterOptions.hasOwnProperty('startDate') || filterOptions.hasOwnProperty('endDate') ? 'account-balances' : 'account-balances-current'
    return await this.get({hash:checkHash(hash),  endpoint: endpoint, filterOptions: filterOptions})
  }

  async getTokens(hash, filterOptions) {
    return await this.get({hash:checkHash(hash),  endpoint:'tokens', filterOptions: filterOptions})
  }

  async getTokenBalances(hash, filterOptions) {
    return await this.get({hash:checkHash(hash),  endpoint:'token-balances', filterOptions: filterOptions})
  }

  /* Checks if the filterOptions object has holderAddresses field, if so then then the historical endpoint is hit*/
  async getTokenHolders(hash, filterOptions = {}) {
    let endpoint = filterOptions.hasOwnProperty('holderAddresses') ? 'token-holders-historical' : 'token-holders'
    return await this.get({hash:checkHash(hash),  endpoint:endpoint, filterOptions: filterOptions})
  }

  async getTokenSupply(hash, filterOptions) {
    return await this.get({hash:checkHash(hash),  endpoint:'token-supply-current', filterOptions: filterOptions})
  }

  async getTokenTransfers(hash, filterOptions) {
    return await this.get({hash:checkHash(hash),  endpoint:'token-transfers', filterOptions: filterOptions})
  }

  async getUsage(hash, filterOptions) {
    return await this.get({hash:checkHash(hash),  endpoint:'usage', filterOptions: filterOptions})
  }
}

export default Address
