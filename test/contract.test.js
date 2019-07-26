import test from "ava";
import { getNewWeb3DataInstance, ADDRESS, TOKEN_ADDRESS } from './constants'
import {setUpPolly} from "./utils";

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/
test.before(t => {
    t.context.polly = setUpPolly('contract')
})

test.after(async t => {
    await t.context.polly.stop()
})
test.beforeEach(t => {
    t.context.web3data = getNewWeb3DataInstance()
});

/**********************************
 * -------- Test Contracts -------- *
 **********************************/

/*********** Test getDetails() ***********/
test('Successfully gets contract details', async t => {
    let response = await t.context.web3data.contract.getDetails(TOKEN_ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getDetails without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.contract.getDetails()
    }, { instanceOf: Error, message: 'No contract address supplied' });
});

/*********** Test getFunctions() ***********/
test('Successfully gets contract functions', async t => {
    let response = await t.context.web3data.contract.getFunctions(TOKEN_ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getFunctions without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.contract.getFunctions()
    }, { instanceOf: Error, message: 'No contract address supplied' });
});

/*********** Test getAudit() ***********/
test('Successfully gets contract audit', async t => {
    let response = await t.context.web3data.contract.getAudit(TOKEN_ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getAudit without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.contract.getAudit()
    }, { instanceOf: Error, message: 'No contract address supplied' });
});

/*********** Test getAbi() ***********/
test('Successfully gets contract abi', async t => {
    let response = await t.context.web3data.contract.getAbi(TOKEN_ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getAbi without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.contract.getAbi()
    }, { instanceOf: Error, message: 'No contract address supplied' });
});

/*********** Test getSourceCode() ***********/
test.skip('Successfully gets contract source code', async t => {
    let response = await t.context.web3data.contract.getSourceCode(TOKEN_ADDRESS);
    t.is(response.status, 200)
});
test.skip('throws exception when calling getSourceCode without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.contract.getSourceCode()
    }, { instanceOf: Error, message: 'No contract address supplied' });
});

/*********** Test getCode() ***********/
test('Successfully gets contract byte code', async t => {
    let code = await t.context.web3data.contract.getCode(TOKEN_ADDRESS);
    /*Regex mathes a string that begins with 0x and has alphanumeric chars */
    t.regex(code, /0x\w+/g)
});
test('getCode returns 0x when no contract byte code is found', async t => {
    let code = await t.context.web3data.contract.getCode('0x06012c8cf97bead5deae237070f9587f8e7a266e');
    t.regex(code, /0x/g)
});
test('throws exception when calling getCode without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.contract.getCode()
    }, { instanceOf: Error, message: 'No contract address supplied' });
});
