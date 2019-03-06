import {checkHash, get} from './utils'
const ADDRESSES_ENDPOINT = '/addresses'

class Address {
  constructor(web3data) {
    this.web3data = web3data
  }

  // CONSIDER: adding "allowed" filters
  async getAllAddresses(filterOptions) {
    return await get(this.web3data, {endpoint: ADDRESSES_ENDPOINT, filterOptions})
  }

  async getInformation(hash, filterOptions) {
    return await get(this.web3data, {hash:checkHash(hash),  endpoint: ADDRESSES_ENDPOINT, subendpoint:'information', filterOptions: filterOptions})
  }

  async getStats(hash, filterOptions) {
    return await get(this.web3data, {hash:checkHash(hash),  endpoint: ADDRESSES_ENDPOINT, subendpoint:'statistics', filterOptions: filterOptions})
  }

  async getAdoption(hash, filterOptions) {
    return await get(this.web3data, {hash:checkHash(hash),  endpoint: ADDRESSES_ENDPOINT, subendpoint:'adoption', filterOptions: filterOptions})
  }

  async getInternalMessages(hash, filterOptions) {
    return await get(this.web3data, {hash:checkHash(hash),  endpoint: ADDRESSES_ENDPOINT, subendpoint:'internal-messages', filterOptions: filterOptions})
  }

  async getFunctions(hash, filterOptions) {
    return await get(this.web3data, {hash:checkHash(hash),  endpoint: ADDRESSES_ENDPOINT, subendpoint:'functions', filterOptions: filterOptions})
  }

  async getLogs(hash, filterOptions) {
    return await get(this.web3data, {hash:checkHash(hash),  endpoint: ADDRESSES_ENDPOINT, subendpoint:'logs', filterOptions: filterOptions})
  }

  async getTransactions(hash, filterOptions) {
    return await get(this.web3data, {hash:checkHash(hash),  endpoint: ADDRESSES_ENDPOINT, subendpoint:'transactions', filterOptions: filterOptions})
  }
  /* Checks if the filterOptions object has a start or end Date, if it does, then the historical endpoint is hit */
  async getBalance(hash, filterOptions = {}) {
    return await get(this.web3data, {hash:checkHash(hash),  endpoint: ADDRESSES_ENDPOINT, subendpoint: 'account-balances', filterOptions: filterOptions})
  }

  async getTokens(hash, filterOptions) {
    return await get(this.web3data, {hash:checkHash(hash),  endpoint: ADDRESSES_ENDPOINT, subendpoint:'tokens', filterOptions: filterOptions})
  }

  async getTokenBalances(hash, filterOptions) {
    return await get(this.web3data, {hash:checkHash(hash),  endpoint: ADDRESSES_ENDPOINT, subendpoint:'token-balances', filterOptions: filterOptions})
  }

  async getTokenTransfers(hash, filterOptions) {
    return await get(this.web3data, {hash:checkHash(hash),  endpoint: ADDRESSES_ENDPOINT, subendpoint:'token-transfers', filterOptions: filterOptions})
  }

  async getUsage(hash, filterOptions) {
    return await get(this.web3data, {hash:checkHash(hash),  endpoint: ADDRESSES_ENDPOINT, subendpoint:'usage', filterOptions: filterOptions})
  }
}

export default Address
