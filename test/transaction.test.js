import test from "ava"
import { TXN_HASH } from './constants'
import {
    ERROR_MESSAGE_BLOCK_NO_ID as NO_BLOCK_ID,
    ERROR_MESSAGE_TRANSACTION_NO_HASH as NO_HASH
} from "../src/constants";
import {setUpPolly, getNewWeb3DataInstance} from "./utils";

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
    const { records: transactions } = await t.context.web3data.transaction[method]()
    t.true(transactions[0].hasProp('hash'))
    t.true(transactions.length > 0)
}
returnsTxnObjects.title = (providedTitle = '', input) => `Successfully calls ${input.method} and returns array of valid txn objects`

const returnsPendingTxnObjects = async (t, { method }) => {
    const { records: [pendingTxn]} = await t.context.web3data.transaction[method]()

    t.is(pendingTxn.statusResult.name, 'pending')
}
returnsPendingTxnObjects.title = (providedTitle = '', input) => `Successfully calls ${input.method} and returns array of valid pending txn objects`

//test([statusSuccess], {method:'getGasPrediction'})
test([returnsString], {method:'getGasPrice'})
test([returnsTxnObject], {method:'getTransaction', params: {hash: TXN_HASH} })
test([returnsTxnObjects], {method:'getTransactions'})
test([returnsTxnObjects, returnsPendingTxnObjects], {method:'getPendingTransactions'})

