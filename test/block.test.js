import test from 'ava'
import {ERROR_MESSAGE_BLOCK_NO_ID as NO_BLOCK_ID} from '../src/constants'

import {setUpPolly, getNewWeb3DataInstance} from './utils'

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/
test.before(t => {
    t.context.polly = setUpPolly('block')
})

test.after(async t => {
    await t.context.polly.stop()
})

test.beforeEach(t => {
    t.context.web3data = getNewWeb3DataInstance()
})

/**
 * Test that method rejects the promise the proper params are not provided.
 *
 * @param t - The test object.
 * @param endpoint
 * @param method
 * @param errorMessage
 * @example
 */
const rejectsPromise = async (t, {method, params = {}}, errorMessage) => {
    await t.throwsAsync(
      async () => {
          await t.context.web3data.block[method]()
      },
      {instanceOf: Error, message: errorMessage}
    )
}

/* Dynamically creates title based on input */
rejectsPromise.title = (providedTitle = '', input) =>
  `throws exception when calling ${input.method} without number or hash`

const returnsNumber = async (t, {method, params = {}}) => {
    const response = await t.context.web3data.block[method](params.id)
    t.is(typeof response, 'number')
}

returnsNumber.title = (providedTitle = '', input) =>
  `Successfully calls ${input.method} and returns number value`

const returnsNull = async (t, {method, params = {}}) => {
    const response = await t.context.web3data.block[method](999999999, 0)
    t.is(response, null)
}

returnsNull.title = (providedTitle = '', input) =>
  `Successfully calls ${input.method} and returns null value`

const returnsBlockObject = async (t, {method, params = {}}) => {
    const block = await t.context.web3data.block[method](params.id)
    t.is(parseInt(block.number), params.id)
    t.is(typeof block, 'object')
}

returnsBlockObject.title = (providedTitle = '', input) =>
  `Successfully calls ${input.method} and returns valid block object`

const returnsBlockObjectFilters = async (t, {method, params = {}}) => {
    const {id, timeFormat, validationMethod} = params
    const block = await t.context.web3data.block[method](id, {
        timeFormat,
        validationMethod
    })
    t.is(parseInt(block.number), params.id)
    t.true(block.hasProp('validation'))
    t.is(typeof block, 'object')
}

returnsBlockObjectFilters.title = (providedTitle = '', input) =>
  `Successfully calls ${input.method} with filters returns valid block object`

const returnsUncleObject = async (t, {method, params = {}}) => {
    const uncle = await t.context.web3data.block[method](params.id, params.index)
    t.is(parseInt(uncle.blockNumber), params.id)
    t.is(typeof uncle, 'object')
}

returnsUncleObject.title = (providedTitle = '', input) =>
  `Successfully calls ${input.method} and returns valid uncle object`

const returnsTxnObjects = async (t, {method, params = {}}) => {
    const {records: transactions} = await t.context.web3data.block[method](
      params.id
    )
    t.true(transactions.length > 0)
    t.true(transactions[0].hasProp('blockNumber'))
    t.is(parseInt(transactions[0].blockNumber), params.id)
}

returnsTxnObjects.title = (providedTitle = '', input) =>
  `Successfully calls ${input.method} and returns array of valid txn objects`

const returnsTxnObject = async (t, {method, params = {}}) => {
    const transaction = await t.context.web3data.block[method](
      params.id,
      params.index
    )
    t.true(transaction.hasProp('hash'))
    t.is(parseInt(transaction.blockNumber), params.id)
    t.is(parseInt(transaction.index), params.index)
}

returnsTxnObject.title = (providedTitle = '', input) =>
  `Successfully calls ${input.method} and returns valid txn object`

test([returnsBlockObject, returnsBlockObjectFilters], {
    method: 'getBlock',
    params: {id: 7000000, timeFormat: 'ms', validationMethod: 'full'}
})
test([returnsNumber], {method: 'getBlockNumber'})
test(
  [returnsNumber, returnsNull, rejectsPromise],
  {method: 'getBlockTransactionCount', params: {id: 7000000}},
  NO_BLOCK_ID
)
test(
  [returnsUncleObject, returnsNull, rejectsPromise],
  {method: 'getUncle', params: {id: 8102326, index: 0}},
  NO_BLOCK_ID
)
test(
  [returnsTxnObjects],
  {method: 'getTransactions', params: {id: 8102326}},
  NO_BLOCK_ID
)
test(
  [returnsTxnObject, returnsNull],
  {method: 'getTransactionFromBlock', params: {id: 7000000, index: 0}},
  NO_BLOCK_ID
)

/** ********* Test getBlocks() ***********/
test('Successfully gets blocks', async t => {
    const {
        records: [block]
    } = await t.context.web3data.block.getBlocks()
    t.true(block.hasProp('number'))
})
test('Successfully gets blocks - with filters', async t => {
    const {
        records: [block]
    } = await t.context.web3data.block.getBlocks({validationMethod: 'full'})
    t.true(block.hasProp('validation'))
})

/** ********* Test getTokenTransfers() ***********/
test(rejectsPromise, {method: 'getTokenTransfers'}, NO_BLOCK_ID)
test('Successfully gets block token transfers', async t => {
    const response = await t.context.web3data.block.getTokenTransfers(7000000)
    t.true(response.hasProp('metadata'))
})
test('Successfully gets block token transfers - with filters', async t => {
    const FROM = 1
    const TETHER_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7'
    const {
        data: [transfer]
    } = await t.context.web3data.block.getTokenTransfers(8805274, {
        tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7'
    })
    t.is(transfer[FROM], TETHER_ADDRESS)
})

/** ********* Test getLogs() ***********/
test(rejectsPromise, {method: 'getLogs'}, NO_BLOCK_ID)
test('Successfully gets block logs', async t => {
    const {
        records: [log]
    } = await t.context.web3data.block.getLogs(8805274)
    t.true(log.hasProp('logIndex'))
})
test('Successfully gets block logs - with filters', async t => {
    const {
        records: [log]
    } = await t.context.web3data.block.getLogs(8805274, {
        validationMethod: 'full'
    })
    t.true(log.hasProp('logIndex'))
    t.true(log.hasProp('validation'))
})

/** ********* Test getFunctions() ***********/
test(rejectsPromise, {method: 'getFunctions'}, NO_BLOCK_ID)
test('Successfully gets block functions', async t => {
    const {
        records: [internalMessage]
    } = await t.context.web3data.block.getFunctions(8805274)
    t.true(internalMessage.hasProp('messageIndex'))
})
test('Successfully gets block functions - with filters', async t => {
    const {
        records: [internalMessage]
    } = await t.context.web3data.block.getFunctions(8805274, {
        validationMethod: 'full'
    })
    t.true(internalMessage.hasProp('messageIndex'))
    t.true(internalMessage.hasProp('validation'))
})

/** ********* Test getMetrics() ***********/
test('Successfully gets block metrics', async t => {
    const metrics = await t.context.web3data.block.getMetrics(8805274)
    t.true(metrics.hasProp('issuanceTotal'))
})
