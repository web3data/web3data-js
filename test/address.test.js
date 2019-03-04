import test from "ava";
import { getNewWeb3DataInstance, ADDRESS, TOKEN_ADDRESS } from './constants'

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/

test.beforeEach(t => {
    t.context.web3data = getNewWeb3DataInstance()
});

/**********************************
 * -------- Test address -------- *
 **********************************/

/*********** Test getAllAddresses() ***********/
test.only('Successfully gets all addresses', async t => {
    let response = await t.context.web3data.address.getAllAddress();
    t.is(response, 200)
});

// "https://web3api.io/api/v1/addresses?page=1&size=5"

/*********** Test getInformation() ***********/
test('Successfully gets address information', async t => {
    let response = await t.context.web3data.address.getInformation(ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getInformation without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getInformation()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});

/*********** Test getStats() ***********/
test('Successfully gets address statistics', async t => {
    let response = await t.context.web3data.address.getStats(ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getStats without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getStats()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});

/*********** Test getAdoption() ***********/
test('Successfully gets address adoption', async t => {
    let response = await t.context.web3data.address.getAdoption(ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getAdoption without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getAdoption()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});

/*********** Test getInternalMessages() ***********/
test('Successfully gets address internal messages', async t => {
    let response = await t.context.web3data.address.getInternalMessages(ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getInternalMessages without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getInternalMessages()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});

/*********** Test getFunctions() ***********/
test('Successfully gets address functions', async t => {
    let response = await t.context.web3data.address.getFunctions(ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getFunctions without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getFunctions()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});

/*********** Test getLogs() ***********/
test('Successfully gets address logs', async t => {
    let response = await t.context.web3data.address.getLogs(ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getLogs without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getLogs()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});

/*********** Test getTransactions() ***********/
test('Successfully gets address transactions', async t => {
    let response = await t.context.web3data.address.getTransactions(ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getTransactions without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getTransactions()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});

/*********** Test getBalance() ***********/
test('Successfully gets address balance', async t => {
    let response = await t.context.web3data.address.getBalance(ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getBalance without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getBalance()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});

/*********** Test getTokens() ***********/
test('Successfully gets address tokens', async t => {
    let response = await t.context.web3data.address.getTokens(ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getTokens without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getTokens()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});

/*********** Test getTokenBalances() ***********/
test('Successfully gets address token balances', async t => {
    let response = await t.context.web3data.address.getTokenBalances(ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getTokenBalances without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getTokenBalances()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});

/*********** Test getTokenHolders() - current ***********/
test('Successfully gets address Token Holders - current', async t => {
    let response = await t.context.web3data.address.getTokenHolders(TOKEN_ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getTokenHolders without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getTokenHolders()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});

/*********** Test getTokenHolders() - historical ***********/
test('Successfully gets address Token Holders Historical', async t => {
    let filters = {holderAddresses: ADDRESS}
    let response = await t.context.web3data.address.getTokenHolders(TOKEN_ADDRESS, filters);
    t.is(response.status, 200)
});

/*********** Test getTokenSupply() ***********/
test('Successfully gets address token supply', async t => {
    let response = await t.context.web3data.address.getTokenSupply(TOKEN_ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getTokenSupply without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getTokenSupply()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});

/*********** Test getTokenTransfers() ***********/
test('Successfully gets address token transfers', async t => {
    let response = await t.context.web3data.address.getTokenTransfers(ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getTokenTransfers without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getTokenTransfers()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});

/*********** Test getUsage() ***********/
test('Successfully gets address usage', async t => {
    let response = await t.context.web3data.address.getUsage(ADDRESS);
    t.is(response.status, 200)
});
test('throws exception when calling getUsage without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getUsage()
    }, { instanceOf: Error, message: 'No address hash supplied' });
});