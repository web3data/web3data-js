import test from "ava"
import {ERROR_MESSAGE_SIGNATURE_NO_HASH as NO_HASH} from "../src/constants";
import {setUpPolly, getNewWeb3DataInstance} from "./utils";

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/
test.before(t => {
    t.context.polly = setUpPolly('signature')
})

test.after(async t => {
    await t.context.polly.stop()
})

test.beforeEach(t => {
    t.context.web3data = getNewWeb3DataInstance()
})

/**
 * Test that method rejects the promise the proper params are not provided
 */
const rejectsPromise = async (t, method, errorMessage) => {
    await t.throwsAsync(async () => {
        await t.context.web3data.signature[method]()
    }, { instanceOf: Error, message: errorMessage })
}
rejectsPromise.title = (providedTitle = '', input) => `throws exception when calling ${input} without hash`

test(rejectsPromise, 'getSignature', NO_HASH)
test('Successfully calls getSignature', async t => {
    const [signature] = await t.context.web3data.signature.getSignature('0x3d7d3f5a')
    t.true(signature.hasProp('textSignature'))
})
