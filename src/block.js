const {
  BLOCKS_ENDPOINT: ENDPOINT,
  ERROR_MESSAGE_BLOCK_NO_ID: NO_BLOCK_ID
} = require('./constants')

const {
  is,
  get,
  throwIf,
  onFulfilled,
  onError,
  recordsFormatter
} = require('./utils')

class Block {
  /**
   * Creates an instance of Block.
   *
   * @param {object} web3data - The web3data instance.
   * @example
   * const block = new Block(new Web3Data('API_KEY'))
   */
  constructor(web3data) {
    this.web3data = web3data
  }

  /**
   * Retrieves a list of blocks.
   *
   * @param [filterOptions] -
   * @returns
   * @example
   */
  // TODO: Needs tests
  getBlocks(filterOptions) {
    return get(this.web3data, {
      endpoint: ENDPOINT,
      filterOptions
    }).then(onFulfilled.bind({formatter: recordsFormatter}), onError)
  }

  /**
   * Retrieves the blocks specified by its id (number or hash).
   *
   * @param id - The number or hash of the block for which to retrieve block information.
   * @param [filterOptions] -
   * @returns
   * @example
   */
  getBlock(id, filterOptions) {
    throwIf(is.undefined(id), NO_BLOCK_ID)
    return get(this.web3data, {
      pathParam: id,
      endpoint: ENDPOINT,
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the latest block number.
   *
   * @returns {string} Block Number.
   * @example
   */
  getBlockNumber() {
    return this.web3data.block.getBlock('latest').then(block => {
      throwIf(block | !block.number, 'Failed to retrieve block number.')
      return Number.parseInt(block.number, 10)
    })
  }

  /**
   * Retrieves the block transaction count for a specific block based on hash or number.
   *
   * @param id - The number or hash of the block for which to retrieve block information.
   * @param [filterOptions] -
   * @returns
   * @example
   */
  getBlockTransactionCount(id) {
    return this.web3data.block.getBlock(id).then(block => {
      throwIf(
        !block || (!block.predictions && !block.numTransactions),
        'Failed to retrieve block transaction count.'
      )
      // If 'predictions' field exists then it's a future block thus has no txns
      return block.predictions
        ? null
        : Number.parseInt(block.numTransactions, 10)
    })
  }

  /**
   * Retrieves all transactions for a given block specified by its id (number or hash).
   *
   * @param id - The number or hash of the block for which to retrieve block information.
   * @param [filterOptions] -
   * @returns
   * @example
   */
  getTransactions(id, filterOptions) {
    throwIf(is.undefined(id), NO_BLOCK_ID)
    return get(this.web3data, {
      pathParam: id,
      endpoint: ENDPOINT,
      subendpoint: 'transactions',
      filterOptions
    }).then(onFulfilled.bind({formatter: recordsFormatter}), onError)
  }

  /**
   * Retrieves a single transaction for a block specified by its id (number or hash) and transaction index.
   *
   * @param id - The number or hash of the block for which to retrieve block information.
   * @param index - The number of the transaction block index.
   * @param [filterOptions] -
   * @returns
   * @example
   */
  getTransactionFromBlock(id, index) {
    throwIf(is.undefined(id), NO_BLOCK_ID)
    return this.web3data.block.getTransactions(id).then(txns => {
      throwIf(!txns, 'Failed to retrieve transaction.')

      // Check that 'index' is within valid range
      return index < txns.length && index > -1 ? txns[index] : null
    })
  }

  /**
   * Retrieves the uncle specified by its id (number or hash).
   *
   * @param id - The number or hash of the uncle.
   * @param index - The index of the uncle, in most cases this is 0-2.
   * @param [filterOptions] -
   * @returns
   * @example
   */
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

  /**
   * Retrieves the block token transfers executed at a specific block.
   *
   * @param id - The number or hash of the block for which to retrieve block information.
   * @param [filterOptions] -
   * @returns
   * @example
   */
  getTokenTransfers(id, filterOptions) {
    throwIf(is.undefined(id), NO_BLOCK_ID)
    return get(this.web3data, {
      pathParam: id,
      endpoint: ENDPOINT,
      subendpoint: 'token-transfers',
      filterOptions
    }).then(onFulfilled, onError)
  }

  /**
   * Retrieves the block logs executed at a specific block.
   *
   * @param id - The number or hash of the block for which to retrieve block information.
   * @param [filterOptions] -
   * @returns
   * @example
   */
  getLogs(id, filterOptions) {
    throwIf(is.undefined(id), NO_BLOCK_ID)
    return get(this.web3data, {
      pathParam: id,
      endpoint: ENDPOINT,
      subendpoint: 'logs',
      filterOptions
    }).then(onFulfilled.bind({formatter: recordsFormatter}), onError)
  }

  /**
   * Retrieves the block functions/internalMessages executed at a specific block.
   *
   * @param id - The number or hash of the block for which to retrieve block information.
   * @param [filterOptions] -
   * @returns
   * @example
   */
  getFunctions(id, filterOptions) {
    throwIf(is.undefined(id), NO_BLOCK_ID)
    return get(this.web3data, {
      pathParam: id,
      endpoint: ENDPOINT,
      subendpoint: 'functions',
      filterOptions
    }).then(onFulfilled.bind({formatter: recordsFormatter}), onError)
  }

  /**
   * Retrieves the blocks metrics & statistics. If no DateRange is specified, it will return a rolling window of latest data up until now. If startDate/endDate is used, it will return historical timeseries data.
   *
   * @param [filterOptions] -
   * @returns
   * @example
   */
  getMetrics(filterOptions) {
    const subendpoint =
      filterOptions && (filterOptions.startDate || filterOptions.endDate)
        ? 'historical'
        : 'latest'
    return get(this.web3data, {
      endpoint: `${ENDPOINT}/metrics`,
      subendpoint,
      filterOptions
    }).then(onFulfilled.bind({formatter: recordsFormatter}), onError)
  }
}

module.exports = Block
