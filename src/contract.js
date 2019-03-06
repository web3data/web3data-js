import {checkHash, get} from './utils'
const CONTRACTS_ENDPOINT = '/contracts'

// web3data.contract.getDetails(<address hash>, {filterObject})
// web3data.contract.getFunctions(<address hash>, {filterObject})
// web3data.contract.getAudit(<address hash>, {filterObject})

class Contract {

    constructor(web3data) {
        this.web3data = web3data
    }

    async getDetails(hash, filterOptions) {
        return await get(this.web3data, {hash:checkHash(hash),  endpoint: CONTRACTS_ENDPOINT, subendpoint:'information', filterOptions: filterOptions})
    }
}

export default Contract