import test from "ava";
import { TOKEN_ADDRESS } from './constants'
import {setUpPolly, getNewWeb3DataInstance} from "./utils";

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
test('Successfully calls getDetails()', async t => {
    const details = await t.context.web3data.contract.getDetails(TOKEN_ADDRESS)
    t.true(details.hasProp('abi'))
})
test('throws exception when calling getDetails without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.contract.getDetails()
    }, { instanceOf: Error, message: 'No contract address supplied' })
})

/*********** Test getFunctions() ***********/
test('Successfully calls getFunctions()', async t => {
    const [func] = await t.context.web3data.contract.getFunctions(TOKEN_ADDRESS);
    t.true(func.hasProp('inputs'))
});
test('throws exception when calling getFunctions without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.contract.getFunctions()
    }, { instanceOf: Error, message: 'No contract address supplied' });
});

/*********** Test getSecurityAudit() ***********/
test('Successfully calls getSecurityAudit', async t => {
    const audit = await t.context.web3data.contract.getSecurityAudit(TOKEN_ADDRESS);
    t.true(audit.hasProp('issues'))
});
test('throws exception when calling getAudit without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.contract.getSecurityAudit()
    }, { instanceOf: Error, message: 'No contract address supplied' });
});

/*********** Test getAbi() ***********/
test('Successfully calls getAbi()', async t => {
    const abi = await t.context.web3data.contract.getAbi(TOKEN_ADDRESS);
    t.true(Array.isArray(abi))
});
test('throws exception when calling getAbi without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.contract.getAbi()
    }, { instanceOf: Error, message: 'No contract address supplied' });
});

/*********** Test getSourceCode() ***********/
test.only('Successfully gets contract source code', async t => {
    const source = await t.context.web3data.contract.getSourceCode(TOKEN_ADDRESS);
    t.is(typeof source, 'string')
});
test('throws exception when calling getSourceCode without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.contract.getSourceCode()
    }, { instanceOf: Error, message: 'No contract address supplied' });
});

/*********** Test getCode() ***********/
test('Successfully gets contract byte code', async t => {
    const code = await t.context.web3data.contract.getCode(TOKEN_ADDRESS);
    /*Regex mathes a string that begins with 0x and has alphanumeric chars */
    t.regex(code, /0x\w+/g)
});
test('getCode returns 0x when no contract byte code is found', async t => {
    const code = await t.context.web3data.contract.getCode('0x06012c8cf97bead5deae237070f9587f8e7a266e');
    t.regex(code, /0x/g)
});
test('throws exception when calling getCode without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.contract.getCode()
    }, { instanceOf: Error, message: 'No contract address supplied' });
});
