import test from "ava"
import { getNewWeb3DataInstance, TOKEN_ADDRESS, ADDRESS } from './constants'
import { ERROR_MESSAGE_TOKEN_NO_ADDRESS as NO_ADDRESS } from '../src/constants'
import { ERROR_MESSAGE_TOKEN_NO_HOLDER_ADDRESS as NO_HOLDER_ADDRESS } from '../src/constants'

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/

test.beforeEach(t => {
    t.context.web3data = getNewWeb3DataInstance()
})

// TODO: Make macros either A) more generic or B) more specific

/**
 * Test that method is called and returns successfully, i.e. a status of 200
 * @param t the test object
 * @param input the test input in the case the name of the method
 */
let  statusSuccess = async (t, { method, params = {} }) => {
    let response = await t.context.web3data.token[method](TOKEN_ADDRESS)
    t.is(response.status, 200)
}
/* Dynamically creates title based on input */
statusSuccess.title = (providedTitle = '', input) =>  `Successfully calls ${input.method} and returns status of 200`

/**
 * Test that method rejects the promise the proper params are not provided
 * @param t the test object
 * @param input the test input in the case the name of the method
 * @param errorMessage
 */
let rejectsPromise = async (t, { method, params = {} }, errorMessage) => {
        await t.throwsAsync(async () => {
        await t.context.web3data.token[method]()
    }, { instanceOf: Error, message: errorMessage })
}

/* Dynamically creates title based on input */
rejectsPromise.title = (providedTitle = '', input) => `throws exception when calling ${input.method} without hash`

let _rejectsPromise = async (t, promise, errorMessage) => {
    await t.throwsAsync(async () => {
        await promise
    }, { instanceOf: Error, message: errorMessage })
}

_rejectsPromise.title = (providedTitle = '', input) => `Rejects promise if ${input.prototype.name} is called without hash`

/**********************************
 * -------- Test Tokens -------- *
 **********************************/

test([statusSuccess, rejectsPromise], {method: 'getTokenHolders' }, NO_ADDRESS)

test('Successfully gets address Token Holders Historical', async t => {
    let filters = {holderAddresses: ADDRESS}
    let response = await t.context.web3data.token.getTokenHoldersHistorical(TOKEN_ADDRESS, filters);
    t.is(response.status, 200)
});

test('Rejects promise if no token address supplied', async t => {
    let filters = {holderAddresses: ADDRESS}
    await t.throwsAsync(async () => {
        await t.context.web3data.token.getTokenHoldersHistorical('',filters);
    }, { instanceOf: Error, message: NO_ADDRESS })
});

test('Rejects promise if no holder address supplied', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.token.getTokenHoldersHistorical(TOKEN_ADDRESS);
    }, { instanceOf: Error, message: NO_HOLDER_ADDRESS })
});

test([statusSuccess, rejectsPromise], {method: 'getTokenVolume'}, NO_ADDRESS)
test([statusSuccess, rejectsPromise], {method: 'getTokenVelocity'}, NO_ADDRESS)
test([statusSuccess, rejectsPromise], {method: 'getTokenSupply'}, NO_ADDRESS)
test([statusSuccess, rejectsPromise], {method: 'getTokenTransfers'}, NO_ADDRESS)
