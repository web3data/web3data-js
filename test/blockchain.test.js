import test from 'ava'
import {setUpPolly, getNewWeb3DataInstance} from './utils'

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/
test.before(t => {
    t.context.polly = setUpPolly('blockchain')
})

test.after(async t => {
    await t.context.polly.stop()
})

test.beforeEach(t => {
    t.context.web3data = getNewWeb3DataInstance()
})

/** ********* Test getMetrics() ***********/
test.only('Successfully gets blockchain current metrics', async t => {
    const metrics = await t.context.web3data.blockchain.getMetrics()
    t.true(metrics.hasProp('sizeTotal'))
})

// NOTE: This feature is not yet available
// test.only('Successfully gets blockchain historical metrics', async t => {
//     const metrics = await t.context.web3data.blockchain.getMetrics({startDate: 1583625600000, endDate: 1583712000000})
//     t.true(metrics.hasProp('records'))
//     t.true(metrics.records[0].hasProp('sizeTotal'))
// })
