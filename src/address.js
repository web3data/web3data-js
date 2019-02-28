import {buildFilterUrl, is, throwIf} from './utils'

const ADDRESSES_ENDPOINT = '/addresses'

const checkHash = (hash) => throwIf(is.undefined(hash) || is.emptyString(hash), 'No address hash supplied')

const get = async (endpoint, hash, web3data, filters) => {
  return await web3data.rawQuery(
      `${ADDRESSES_ENDPOINT}/${hash}/${endpoint}` + filters
  )
}

class Address {
  constructor(web3data) {
    this.web3data = web3data
  }

  // CONSIDER: adding "allowed" filters
  async getAllAddress(filterOptions = {}) {
    const filterUrl = buildFilterUrl(filterOptions)
    return await this.web3data.rawQuery(ADDRESSES_ENDPOINT + filterUrl)
  }

  // CONSIDER: adding "allowed" filters
  // NOTE: provide network info
  async getInformation(hash, filterOptions = {}) {
    checkHash(hash)
    const filters = filterOptions ? buildFilterUrl(filterOptions) : ''
    return await get('information',hash, this.web3data, filters)
  }

  async getStats(hash, filterOptions = {}) {
    checkHash(hash)
    const filters = filterOptions ? buildFilterUrl(filterOptions) : ''
    return await get('statistics', hash, this.web3data, filters)
  }

  async getAdoption(hash, filterOptions = {}) {
    checkHash(hash)
    const filters = filterOptions ? buildFilterUrl(filterOptions) : ''
    return await get('adoption', hash, this.web3data, filters)
  }

  async getInternalMessages(hash, filterOptions = {}) {
    checkHash(hash)
    const filters = filterOptions ? buildFilterUrl(filterOptions) : ''
    return await get('internal-messages', hash, this.web3data, filters)
  }

  async getFunctions(hash, filterOptions = {}) {
    checkHash(hash)
    const filters = filterOptions ? buildFilterUrl(filterOptions) : ''
    return await get('functions', hash, this.web3data, filters)
  }

  async getLogs(hash, filterOptions = {}) {
    checkHash(hash)
    const filters = filterOptions ? buildFilterUrl(filterOptions) : ''
    return await get('logs', hash, this.web3data, filters)
  }

  async getTransactions(hash, filterOptions = {}) {
    checkHash(hash)
    const filters = filterOptions ? buildFilterUrl(filterOptions) : ''
    return await get('transactions', hash, this.web3data, filters)
  }

  // NOTE: current / historical is based on if startDate or endDate are specified as filters
  async getBalance(hash, filterOptions = {}) {
    checkHash(hash)
    const filters = filterOptions ? buildFilterUrl(filterOptions) : ''
    return await get('information', hash, this.web3data, filters)
  }

  async getTokens(hash, filterOptions = {}) {
    checkHash(hash)
    const filters = filterOptions ? buildFilterUrl(filterOptions) : ''
    return await get('tokens', hash, this.web3data, filters)
  }

  async getTokenBalances(hash, filterOptions = {}) {
    checkHash(hash)
    const filters = filterOptions ? buildFilterUrl(filterOptions) : ''
    return await get('token-balances', hash, this.web3data, filters)
  }

  // NOTE: current / historical is based on if startDate or endDate are specified as filters
  async getTokenHolders(hash, filterOptions = {}) {
    checkHash(hash)
    const filters = filterOptions ? buildFilterUrl(filterOptions) : ''
    return await get('information', hash, this.web3data, filters)
  }

  // NOTE: current / historical is based on if startDate or endDate are specified as filters
  async getTokenSupply(hash, filterOptions = {}) {
    checkHash(hash)
    const filters = filterOptions ? buildFilterUrl(filterOptions) : ''
    return await get('token-supply-current', hash, this.web3data, filters)
  }

  async getTokenTransfers(hash, filterOptions = {}) {
    checkHash(hash)
    const filters = filterOptions ? buildFilterUrl(filterOptions) : ''
    return await get('token-transfers', hash, this.web3data, filters)
  }

  async getUsage(hash, filterOptions = {}) {
    checkHash(hash)
    const filters = filterOptions ? buildFilterUrl(filterOptions) : ''
    return await get('usage', hash, this.web3data, filters)
  }
}

export default Address
