import test from "ava";
import { getNewWeb3DataInstance, ADDRESS, TOKEN_ADDRESS } from './constants'

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/

test.beforeEach(t => {
    t.context.web3data = getNewWeb3DataInstance()
});

/**********************************
 * -------- Test Tokens -------- *
 **********************************/

/*********** Test getTokenHolders() ***********/
test('Successfully gets address Token Holders Current', async t => {
    let response = await t.context.web3data.token.getTokenHolders(TOKEN_ADDRESS);
    t.is(response.status, 200)
});

test('throws exception when calling getTokenHolders without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.token.getTokenHolders()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});

/*********** Test getTokenHoldersHistorical() ***********/
test('Successfully gets address Token Holders Historical', async t => {
    let filters = {holderAddresses: ADDRESS}
    let response = await t.context.web3data.token.getTokenHoldersHistorical(TOKEN_ADDRESS, filters);
    t.is(response.status, 200)
});

/*********** Test getTokenVolume() ***********/
test('Successfully gets token volume', async t => {
    let response = await t.context.web3data.token.getTokenVolume(TOKEN_ADDRESS);
    t.is(response.status, 200)
});

test('throws exception when calling getTokenVolume without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.token.getTokenVolume()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});

/*********** Test getTokenVelocity() ***********/
test('Successfully gets token velocity', async t => {
    let response = await t.context.web3data.token.getTokenVelocity(TOKEN_ADDRESS);
    t.is(response.status, 200)
});

test('throws exception when calling getTokenVelocity without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.token.getTokenVelocity()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});