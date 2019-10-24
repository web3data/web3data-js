const {
  BLOCKS_ENDPOINT: ENDPOINT,
  ERROR_MESSAGE_BLOCK_NO_ID: NO_BLOCK_ID
} = require('./constants')

const {is, get, throwIf, onFulfilled, onError} = require('./utils')

class Block {
  constructor(web3data) {
    this.web3data = web3data
  }

  // TODO: Needs tests
  getBlocks(filterOptions) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      filterOptions
    }).then(onFulfilled, onError)
  }

  getBlock(id, filterOptions) {
    throwIf(is.undefined(id), NO_BLOCK_ID)
    return get(this.web3data, {
      pathParam: id,
      endpoint: ENDPOINT,
      filterOptions
    }).then(onFulfilled, onError)
  }

  getBlockNumber() {
    return this.web3data.block.getBlock('latest').then(block => {
      throwIf(block | !block.number, 'Failed to retrieve block number.')
      return parseInt(block.number, 10)
    })
  }

  getBlockTransactionCount(id) {
    return this.web3data.block.getBlock(id).then(block => {
      throwIf(
        !block || (!block.predictions && !block.numTransactions),
        'Failed to retrieve block transaction count.'
      )
      // If 'predictions' field exists then it's a future block thus has no txns
      return block.predictions ? null : parseInt(block.numTransactions, 10)
    })
  }

  getTransactions(id, filterOptions) {
    throwIf(is.undefined(id), NO_BLOCK_ID)
    return get(this.web3data, {
      pathParam: id,
      endpoint: ENDPOINT,
      subendpoint: 'transactions',
      filterOptions
    }).then(onFulfilled, onError)
  }

  getTransactionFromBlock(id, index) {
    throwIf(is.undefined(id), NO_BLOCK_ID)
    return this.web3data.block.getTransactions(id).then(({records: txns}) => {
      throwIf(!txns, 'Failed to retrieve transaction.')

      // Check that 'index' is within valid range
      return index < txns.length && index > -1 ? txns[index] : null
    })
  }

  getUncle(id, index) {
    throwIf(is.undefined(id), NO_BLOCK_ID)
    throwIf(is.undefined(index), "Missing required param 'index'")
    return this.web3data.block
      .getBlock(id, {
        validationMethod: 'full'
      })
      .then(block => {
        throwIf(
          !block ||
            (!block.predictions && !block.numTransactions && !block.validation),
          'Failed to retrieve uncle.'
        )
        // Check that it's...
        // a not a future block
        // and that the block has uncles
        // and 'index' is within the valid range
        return !block.predictions &&
          block.validation.uncles &&
          index < block.validation.uncles.length &&
          index > -1
          ? block.validation.uncles[index]
          : null
      })
  }

  getTokenTransfers(id, filterOptions) {
    throwIf(is.undefined(id), NO_BLOCK_ID)
    return get(this.web3data, {
      pathParam: id,
      endpoint: ENDPOINT,
      subendpoint: 'token-transfers',
      filterOptions
    }).then(onFulfilled, onError)
  }

  getLogs(id, filterOptions) {
    throwIf(is.undefined(id), NO_BLOCK_ID)
    return get(this.web3data, {
      pathParam: id,
      endpoint: ENDPOINT,
      subendpoint: 'logs',
      filterOptions
    })
      .then(onFulfilled, onError)
  }

  getFunctions(id, filterOptions) {
    throwIf(is.undefined(id), NO_BLOCK_ID)
    return get(this.web3data, {
      pathParam: id,
      endpoint: ENDPOINT,
      subendpoint: 'functions',
      filterOptions
    }).then(onFulfilled, onError)
  }

  getMetrics(filterOptions) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      subendpoint: 'metrics/latest',
      filterOptions
    }).then(onFulfilled, onError)
  }
}

module.exports = Block
