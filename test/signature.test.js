import test from "ava"
import { getNewWeb3DataInstance } from './constants'

import {ERROR_MESSAGE_SIGNATURE_NO_HASH as NO_HASH, ADDRESS} from "../src/constants";

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/

test.beforeEach(t => {
    t.context.web3data = getNewWeb3DataInstance()
})

/**
 * Test that method is called and returns successfully, i.e. a status of 200
 * @param t the test object
 * @param method
 */
let statusSuccess = async (t, endpoint, method, params) => {
    let response = await t.context.web3data[endpoint][method]('0xe2f0a05a')
    t.is(response.status, 200)
}
statusSuccess.title = (providedTitle = '', input) =>  `Successfully calls ${input.method} and returns status of 200`

/**
 * Test that method rejects the promise the proper params are not provided
 * @param t the test object
 * @param endpoint
 * @param method
 * @param params
 * @param errorMessage
 */
let rejectsPromise = async (t, endpoint, method, errorMessage) => {

    await t.throwsAsync(async () => {
        await t.context.web3data[endpoint][method]()
    }, { instanceOf: Error, message: errorMessage })
}
// TODO: Change title to be...
rejectsPromise.title = (providedTitle = '', input) => `throws exception when calling ${input} without hash`

test.skip([statusSuccess, rejectsPromise], 'signature', 'get4Byte', NO_HASH)