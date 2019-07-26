import test from "ava"
import _ from 'lodash'
import { getNewWeb3DataInstance, TXN_HASH } from './constants'
import {ERROR_MESSAGE_TRANSACTION_NO_HASH as NO_HASH} from "../src/constants";
import {setUpPolly} from "./utils";

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
 * Test that method is called and returns successfully, i.e. a status of 200
 * @param t the test object
 * @param method
 */
const statusSuccess = async (t, { method, params = {} }) => {
    const response = await t.context.web3data.transaction[method]()
    t.is(response.status, 200)
}
statusSuccess.title = (providedTitle = '', input) =>  `Successfully calls ${input.method} and returns status of 200`

const returnsString = async (t, { method, params = {} }) => {
    const response = await t.context.web3data.transaction[method]()
    t.is(typeof response, 'string')
    t.is(typeof parseInt(response), 'number')
}
returnsString.title = (providedTitle = '', input) => `Successfully calls ${input.method} and returns string value`

const returnsTxnObject = async (t, { method, params = {} }) => {
    const response = await t.context.web3data.transaction[method](params.hash)
    t.true(_.has(response, 'hash'))
    t.is(response.hash, TXN_HASH)
}
returnsTxnObject.title = (providedTitle = '', input) => `Successfully calls ${input.method} and returns valid txn object`

const returnsTxnObjects = async (t, { method }) => {
    const transactions = await t.context.web3data.transaction[method]()
    t.true(_.has(transactions[0], 'hash'))
    t.true(transactions.length > 0)
}
returnsTxnObjects.title = (providedTitle = '', input) => `Successfully calls ${input.method} and returns array of valid txn objects`

const returnsPendingTxnObjects = async (t, { method }) => {
    const pendingTxns = await t.context.web3data.transaction[method]()
    t.is(pendingTxns[0].statusResult.name, 'pending')
}
returnsPendingTxnObjects.title = (providedTitle = '', input) => `Successfully calls ${input.method} and returns array of valid pending txn objects`

test([statusSuccess], {method:'getGasPrediction'})
test([returnsString], {method:'getGasPrice'})
test([returnsTxnObject], {method:'getTransaction', params: {hash: TXN_HASH} })
test([returnsTxnObjects], {method:'getTransactions'})
test([returnsTxnObjects, returnsPendingTxnObjects], {method:'getPendingTransactions'})

