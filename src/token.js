import {checkHash, get} from './utils'

const TOKENS_ENDPOINT = '/tokens'

class Token {
    constructor(web3data) {
        this.web3data = web3data
    }
    async getTokenVolume(hash, filterOptions = {}) {
        return await get(this.web3data, {hash:checkHash(hash),  endpoint: TOKENS_ENDPOINT, subendpoint:'volume', filterOptions: filterOptions})
    }

    async getTokenVelocity(hash, filterOptions = {}) {
        return await get(this.web3data, {hash:checkHash(hash),  endpoint: TOKENS_ENDPOINT, subendpoint:'velocity', filterOptions: filterOptions})
    }

    async getTokenHolders(hash, filterOptions = {}) {
        return await get(this.web3data, {hash:checkHash(hash),  endpoint: TOKENS_ENDPOINT, subendpoint: 'holders', filterOptions: filterOptions})
    }

    async getTokenHoldersHistorical(hash, filterOptions = {}) {
        return await get(this.web3data, {hash:checkHash(hash),  endpoint: TOKENS_ENDPOINT, subendpoint: 'holders-historical', filterOptions: filterOptions})
    }

    async getTokenSupply(hash, filterOptions) {
        return await get(this.web3data, {hash:checkHash(hash),  endpoint: TOKENS_ENDPOINT, subendpoint:'supplies-current', filterOptions: filterOptions})
    }

}

export default Token