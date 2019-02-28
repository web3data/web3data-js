import {buildFilterUrl, is, throwIf} from './utils'

const TOKENS_ENDPOINT = '/tokens'

const checkHash = (hash) => throwIf(is.undefined(hash) || is.emptyString(hash), 'No address hash supplied')

const get = async (endpoint, hash, web3data, filters) => {
    return await web3data.rawQuery(
        `${TOKENS_ENDPOINT}/${hash}/${endpoint}` + filters
    )
}

class Token {
    constructor(web3data) {
        this.web3data = web3data
    }
    // NOTE: current / historical is based on if startDate or endDate are specified as filters
    async getTokenVolume(hash, filterOptions = {}) {
        checkHash(hash)
        const filters = filterOptions ? buildFilterUrl(filterOptions) : ''
        return await get('volume', hash, this.web3data, filters)
    }

    async getTokenVelocity(hash, filterOptions = {}) {
        checkHash(hash)
        const filters = filterOptions ? buildFilterUrl(filterOptions) : ''
        return await get('velocity', hash, this.web3data, filters)
    }
}

export default Token