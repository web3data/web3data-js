import test from "ava"
import { getNewWeb3DataInstance } from './constants'

import {ERROR_MESSAGE_BLOCK_NO_NUMBER as NO_NUMBER, BLOCKS_ENDPOINT as ENDPOINT} from "../src/constants";

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/

test.beforeEach(t => {
    t.context.web3data = getNewWeb3DataInstance()
})

/**
 * Test that method is called and returns successfully, i.e. a status of 200
 * @param t the test object
 * @param endpoint
 * @param method
 * @param params
 */
const statusSuccess = async (t, { method, params = {} }) => {
    const response = await t.context.web3data.block[method]()
    t.is(response.status, 200)
}
statusSuccess.title = (providedTitle = '', input) =>  `Successfully calls ${input.method} and returns status of 200`

/**
 * Test that method rejects the promise the proper params are not provided
 * @param t the test object
 * @param endpoint
 * @param method
 * @param errorMessage
 */
const rejectsPromise = async (t, { method, params = {} }, errorMessage) => {
    await t.throwsAsync(async () => {
        await t.context.web3data.token[method]()
    }, { instanceOf: Error, message: errorMessage })
}

/* Dynamically creates title based on input */
rejectsPromise.title = (providedTitle = '', input) => `throws exception when calling ${input.method} without hash`

const returnsNumber = async (t, { method, params = {} }) => {
    const response = await t.context.web3data.block[method]()
    console.log(response)
    t.is(typeof response, 'number')
}
returnsNumber.title = (providedTitle = '', input) => `Successfully calls ${input.method} and returns number value`

// test([statusSuccess, rejectsPromise],  {method: 'getTokenTransfers'}, NO_NUMBER)
test([returnsNumber], {method: 'getBlockNumber'})
