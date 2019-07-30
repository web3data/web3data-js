import test from "ava"
import { getNewWeb3DataInstance, ADDRESS } from './constants'
import {ERROR_MESSAGE_ADDRESS_NO_ADDRESS as NO_ADDRESS} from "../src/constants";
import {setUpPolly} from "./utils";

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/
test.before(t => {
    t.context.polly = setUpPolly('address')
})

test.after(async t => {
    await t.context.polly.stop()
})

test.beforeEach(t => {
    t.context.web3data = getNewWeb3DataInstance()
})

/**********************************
 * -------- Test address -------- *
 **********************************/

/*********** Test getAllAddresses() ***********/
test('Successfully gets all addresses', async t => {
    let response = await t.context.web3data.address.getAllAddresses()
    t.is(response.status, 200)
})

/*********** Test getInformation() ***********/
test('Successfully gets address information', async t => {
    let response = await t.context.web3data.address.getInformation(ADDRESS)
    t.is(response.status, 200)
})
test('throws exception when calling getInformation without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getInformation()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getStats() ***********/
test('Successfully gets address statistics', async t => {
    let response = await t.context.web3data.address.getStats(ADDRESS)
    t.is(response.status, 200)
})
test('throws exception when calling getStats without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getStats()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getAdoption() ***********/
test('Successfully gets address adoption', async t => {
    let response = await t.context.web3data.address.getAdoption(ADDRESS)
    t.is(response.status, 200)
})
test('throws exception when calling getAdoption without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getAdoption()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getInternalMessages() ***********/
test('Successfully gets address internal messages', async t => {
    let response = await t.context.web3data.address.getInternalMessages(ADDRESS)
    t.is(response.status, 200)
})

test('throws exception when calling getInternalMessages without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getInternalMessages()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getFunctions() ***********/
test('Successfully gets address functions', async t => {
    let response = await t.context.web3data.address.getFunctions(ADDRESS)
    t.is(response.status, 200)
})

test('throws exception when calling getFunctions without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getFunctions()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getLogs() ***********/
test('Successfully gets address logs', async t => {
    let response = await t.context.web3data.address.getLogs(ADDRESS)
    t.is(response.status, 200)
})

test('throws exception when calling getLogs without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getLogs()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getTransactions() ***********/
test('Successfully gets address transactions', async t => {
    let response = await t.context.web3data.address.getTransactions(ADDRESS)
    t.is(response.status, 200)
})

test('throws exception when calling getTransactions without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getTransactions()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getTokens() ***********/
test('Successfully gets address tokens', async t => {
    let response = await t.context.web3data.address.getTokens(ADDRESS)
    t.is(response.status, 200)
})

test('throws exception when calling getTokens without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getTokens()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getTokenBalances() ***********/
test('Successfully gets address token balances', async t => {
    let response = await t.context.web3data.address.getTokenBalances(ADDRESS)
    t.is(response.status, 200)
})

test('throws exception when calling getTokenBalances without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getTokenBalances()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getUsage() ***********/
test('Successfully gets address usage', async t => {
    let response = await t.context.web3data.address.getUsage(ADDRESS)
    t.is(response.status, 200)
})

test('throws exception when calling getUsage without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getUsage()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getBalance() ***********/
test('Successfully gets address balance', async t => {
    let balance = await t.context.web3data.address.getBalance(ADDRESS)
    /* Test that balance is numerical */
    t.regex(balance.value, /[0-9]/)
})

test('throws exception when calling getBalance without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getBalance()
    }, { instanceOf: Error, message: NO_ADDRESS })
})
