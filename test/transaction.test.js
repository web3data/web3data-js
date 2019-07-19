import test from "ava"
import { getNewWeb3DataInstance, TX_HASH, ADDRESS } from './constants'
import { is } from  '../src/utils'

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
let statusSuccess = async (t, method, params) => {
    let response = await t.context.web3data.transaction[method](TX_HASH)
    t.is(response.status, 200)
}
statusSuccess.title = (providedTitle = '', input) =>  `Successfully calls ${input.method} and returns status of 200`

test([statusSuccess], 'getGasPrediction')
