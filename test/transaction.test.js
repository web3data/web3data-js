import test from "ava"
import { TXN_HASH } from './constants'
import {
    ERROR_MESSAGE_BLOCK_NO_ID as NO_BLOCK_ID,
    ERROR_MESSAGE_TRANSACTION_NO_HASH as NO_HASH
} from "../src/constants";
import {setUpPolly, getNewWeb3DataInstance, isISOFormat} from "./utils";

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/
test.before(t => {
    t.context.polly = setUpPolly('transaction')
})

test.after(async t => {
    await t.context.polly.stop()
})

test.beforeEach(t => {
    t.context.web3data = getNewWeb3DataInstance()
})

/**
 * Test that method rejects the promise the proper params are not provided
 * @param t the test object
 * @param endpoint
 * @param method
 * @param errorMessage
 */
const rejectsPromise = async (t, { method, params = {} }, errorMessage) => {
    await t.throwsAsync(async () => {
        await t.context.web3data.transaction[method]()
    }, { instanceOf: Error, message: errorMessage })
}
/* Dynamically creates title based on input */
rejectsPromise.title = (providedTitle = '', input) => `throws exception when calling ${input.method} without number or hash`


const returnsString = async (t, { method, params = {} }) => {
    const response = await t.context.web3data.transaction[method]()
    t.is(typeof response, 'string')
    t.is(typeof parseInt(response), 'number')
}
returnsString.title = (providedTitle = '', input) => `Successfully calls ${input.method} and returns string value`

const returnsTxnObject = async (t, { method, params = {} }) => {
    const response = await t.context.web3data.transaction[method](params.hash)
    t.true(response.hasProp('hash'))
    t.is(response.hash, TXN_HASH)
}
returnsTxnObject.title = (providedTitle = '', input) => `Successfully calls ${input.method} and returns valid txn object`

const returnsTxnObjects = async (t, { method }) => {
    const transactions = await t.context.web3data.transaction[method]()
    t.true(transactions[0].hasProp('hash'))
    t.true(transactions.length > 0)
}
returnsTxnObjects.title = (providedTitle = '', input) => `Successfully calls ${input.method} and returns array of valid txn objects`

const returnsPendingTxnObjects = async (t, { method }) => {
    const [pendingTxn] = await t.context.web3data.transaction[method]()

    t.is(pendingTxn.statusResult.name, 'pending')
}
returnsPendingTxnObjects.title = (providedTitle = '', input) => `Successfully calls ${input.method} and returns array of valid pending txn objects`

//test([statusSuccess], {method:'getGasPrediction'})
test([returnsString], {method:'getGasPrice'})
test([returnsTxnObject], {method:'getTransaction', params: {hash: TXN_HASH} })
test([returnsTxnObjects], {method:'getTransactions'})
test([returnsTxnObjects, returnsPendingTxnObjects], {method:'getPendingTransactions'})

/*********** Test getTransactions() ***********/
test('Successfully calls getTransactions', async t => {
    const [txn] = await t.context.web3data.transaction.getTransactions()
    t.true(txn.hasProp('hash'))
})
test('Successfully calls getTransactions - with filters', async t => {
    const [pendingTxn] = await t.context.web3data.transaction.getTransactions({status: 'pending'})
    t.true(pendingTxn.hasProp('statusResult'))
    t.true(pendingTxn.statusResult.hasProp('name'))
    t.is(pendingTxn.statusResult.name, 'pending')
})

/*********** Test getTransaction() ***********/
test(rejectsPromise, {method: 'getTransaction'}, NO_HASH)
test('Successfully calls getTransaction', async t => {
    const txn = await t.context.web3data.transaction.getTransaction(TXN_HASH)
    t.true(txn.hasProp('hash'))
})
test('Successfully calls getTransaction - with filters', async t => {
    const txn = await t.context.web3data.transaction.getTransaction(TXN_HASH, {validationMethod: 'basic'})
    t.true(txn.hasProp('validation'))
})

/*********** Test getPendingTransactions() ***********/
test('Successfully calls getPendingTransactions', async t => {
    const [pendingTxn] = await t.context.web3data.transaction.getPendingTransactions()
    t.true(pendingTxn.hasProp('statusResult'))
    t.true(pendingTxn.statusResult.hasProp('name'))
    t.is(pendingTxn.statusResult.name, 'pending')
})

/*********** Test getGasPrediction() ***********/
test('Successfully calls getGasPrediction', async t => {
    const gasPrediction = await t.context.web3data.transaction.getGasPrediction()
    t.true(gasPrediction.hasProp('average'))
})

/*********** Test getGasPrice() ***********/
test('Successfully calls getGasPrice', async t => {
    const gasPrice = await t.context.web3data.transaction.getGasPrice()
    t.regex(gasPrice, /([0-9])/g)
})

/*********** Test getVolume() ***********/
test('Successfully calls getVolume', async t => {
    const volume = await t.context.web3data.transaction.getVolume()
    t.true(volume.hasProp('metadata'))
    t.true(volume.hasProp('data'))
})

test('Successfully calls getVolume - with filters', async t => {
    const volume = await t.context.web3data.transaction.getVolume({timeFormat: 'iso'})
    t.true(volume.hasProp('metadata'))
    t.true(volume.hasProp('data'))
    t.true(isISOFormat(volume.metadata.startDate))
})

/*********** Test getMetrics() ***********/
test('Successfully calls getMetrics', async t => {
    const metrics = await t.context.web3data.transaction.getMetrics()
    t.true(metrics.hasProp('feesTotal'))
})
