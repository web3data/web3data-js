const {
  BLOCKS_ENDPOINT: ENDPOINT,
  ERROR_MESSAGE_BLOCK_NO_ID: NO_BLOCK_ID
} = require('./constants')

const {is, get, throwIf} = require('./utils')

class Block {
  constructor(web3data) {
    this.web3data = web3data
  }

  getTokenTransfers(id, filterOptions) {
    if (is.undefined(id)) return Promise.reject(new Error(NO_BLOCK_ID))
    return get(this.web3data, {
      pathParam: id,
      endpoint: ENDPOINT,
      subendpoint: 'token-transfers',
      filterOptions
    })
  }

  async getBlock(id, filterOptions) {
    if (is.undefined(id)) return Promise.reject(new Error(NO_BLOCK_ID))
    const response = await get(this.web3data, {
      pathParam: id,
      endpoint: ENDPOINT,
      filterOptions
    })
    return new Promise((resolve, reject) => {
      if (!response || response.status !== 200 || !response.payload) {
        reject(new Error(`error with request`))
      } else {
        resolve(response.payload)
      }
    })
  }

  async getBlockNumber() {
    const block = await this.getBlock('latest')
    throwIf(block | !block.number, 'Failed to retrieve block number.')
    return parseInt(block.number, 10)
  }

  async getBlockTransactionCount(id) {
    const block = await this.getBlock(id)
    throwIf(
      !block || (!block.predictions && !block.numTransactions),
      'Failed to retrieve block transaction count.'
    )
    return block.predictions ? null : parseInt(block.numTransactions, 10)
  }

  async getTransactions(id, filterOptions) {
    const response = await get(this.web3data, {
      pathParam: id,
      endpoint: ENDPOINT,
      subendpoint: 'transactions',
      filterOptions
    })
    throwIf(
      !response ||
        response.status !== 200 ||
        !response.payload ||
        !response.payload.records,
      'Failed to retrieve transactions.'
    )
    return response.payload.records
  }

  async getTransactionFromBlock(id, index) {
    const transactions = await this.getTransactions(id)
    return new Promise((resolve, reject) => {
      if (!transactions) {
        reject(new Error(`Failed to retrieve transaction.`))
      } else if (index < transactions.length && index > -1) {
        resolve(transactions[index])
      } else {
        resolve(null)
      }
    })
  }

  async getUncle(id, index) {
    const block = await this.getBlock(id, {validationMethod: 'full'})
    return new Promise((resolve, reject) => {
      if (
        !block ||
        (!block.predictions && !block.numTransactions && !block.validation)
      ) {
        reject(new Error(`Failed to retrieve uncle.`))
      } else if (block.predictions || !block.validation.uncles) {
        resolve(null)
      } else if (index < block.validation.uncles.length && index > -1) {
        resolve(block.validation.uncles[index])
      } else {
        resolve(null)
      }
    })
  }
}

module.exports = Block
