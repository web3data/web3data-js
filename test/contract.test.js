import test from "ava";
import { getNewWeb3DataInstance, ADDRESS, TOKEN_ADDRESS } from './constants'

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/

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
