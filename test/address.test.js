import test, {only} from "ava"
import { getNewWeb3DataInstance, ADDRESS } from './constants'
import {ERROR_MESSAGE_ADDRESS_NO_ADDRESS as NO_ADDRESS} from "../src/constants";
import {setUpPolly, hasProp} from "./utils";

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
    let addresses = await t.context.web3data.address.getAllAddresses()
    t.true({}.hasOwnProperty.call(addresses, 'records'))
    t.true({}.hasOwnProperty.call(addresses, 'totalRecords'))
})

/*********** Test getInformation() ***********/
test('throws exception when calling getInformation without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getInformation()
    }, { instanceOf: Error, message: NO_ADDRESS })
})
test('Successfully gets address information', async t => {
    let info = await t.context.web3data.address.getInformation(ADDRESS)
    t.true({}.hasOwnProperty.call(info, 'balance'))
})
test('Successfully gets address information + pricing data', async t => {
    let info = await t.context.web3data.address.getInformation(ADDRESS, {includePrice: true, currency: 'usd'})
    t.true({}.hasOwnProperty.call(info, 'balance'))
    t.true({}.hasOwnProperty.call(info, 'price'))
    t.true({}.hasOwnProperty.call(info.price.balance, 'currency'))
    t.is(info.price.balance.currency, 'usd')
})


/*********** Test getStats() ***********/
test('Successfully gets address statistics', async t => {
    let stats = await t.context.web3data.address.getStats(ADDRESS)

    /* payload usually returns array however this guards against any changes */
    stats = Array.isArray(stats) ? stats[0] : stats
    t.true({}.hasOwnProperty.call(stats, 'firstSeen'))
})
test('throws exception when calling getStats without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getStats()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getAdoption() ***********/
test('Successfully gets address adoption', async t => {
    const response = await t.context.web3data.address.getAdoption(ADDRESS)
    t.true({}.hasOwnProperty.call(response, 'metadata'))
})
test('throws exception when calling getAdoption without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getAdoption()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getInternalMessages() ***********/
test('Successfully gets address internal messages', async t => {
    const response = await t.context.web3data.address.getInternalMessages(ADDRESS)
    t.true({}.hasOwnProperty.call(response, 'records'))
    t.true({}.hasOwnProperty.call(response, 'totalRecords'))
})

test('throws exception when calling getInternalMessages without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getInternalMessages()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getFunctions() ***********/
test('throws exception when calling getFunctions without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getFunctions()
    }, { instanceOf: Error, message: NO_ADDRESS })
})
test('Successfully gets address functions', async t => {
    const response = await t.context.web3data.address.getFunctions(ADDRESS)
    t.true({}.hasOwnProperty.call(response, 'records'))
    t.true({}.hasOwnProperty.call(response, 'totalRecords'))
})

test('Successfully gets address functions + filters', async t => {
    const response = await t.context.web3data.address.getFunctions(ADDRESS, {validationMethod: 'full'})
    t.true({}.hasOwnProperty.call(response, 'records'))
    t.true({}.hasOwnProperty.call(response, 'totalRecords'))
    t.true({}.hasOwnProperty.call(response.records[0], 'validation'))
})

test('Successfully gets address functions pagination', async t => {
    const SIZE = 5
    const response = await t.context.web3data.address.getFunctions(ADDRESS, {page: 0, size: SIZE})
    t.true({}.hasOwnProperty.call(response, 'records'))
    t.true({}.hasOwnProperty.call(response, 'totalRecords'))
    t.is(response.records.length, SIZE)
})

/*********** Test getLogs() ***********/
test('Successfully gets address logs', async t => {
    const response = await t.context.web3data.address.getLogs(ADDRESS)
    t.true({}.hasOwnProperty.call(response, 'records'))
})

test('throws exception when calling getLogs without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getLogs()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getTransactions() ***********/
test('Successfully gets address transactions', async t => {
    const response = await t.context.web3data.address.getTransactions(ADDRESS)
    t.true({}.hasOwnProperty.call(response, 'records'))
})

test('throws exception when calling getTransactions without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getTransactions()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getTokens() ***********/
test('Successfully gets address tokens', async t => {
    const response = await t.context.web3data.address.getTokens(ADDRESS)
    t.true({}.hasOwnProperty.call(response, 'records'))
    t.true({}.hasOwnProperty.call(response, 'totalRecords'))
})

test('throws exception when calling getTokens without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getTokens()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getTokenBalances() ***********/
test('Successfully gets address token balances', async t => {
    const response = await t.context.web3data.address.getTokenBalances(ADDRESS)
    t.true({}.hasOwnProperty.call(response, 'records'))
    t.true({}.hasOwnProperty.call(response, 'totalRecords'))
})

test('throws exception when calling getTokenBalances without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getTokenBalances()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getUsage() ***********/
test('Successfully gets address usage', async t => {
    const response = await t.context.web3data.address.getUsage(ADDRESS)
    t.true({}.hasOwnProperty.call(response, 'metadata'))
})

test('throws exception when calling getUsage without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getUsage()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getBalance() ***********/
test('throws exception when calling getBalance without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getBalance()
    }, { instanceOf: Error, message: NO_ADDRESS })
})
test('Successfully gets address balance (no filters)', async t => {
    const balance = await t.context.web3data.address.getBalance(ADDRESS)
    /* Test that balance is numerical */
    t.regex(balance.value, /[0-9]/)
})


test('Successfully gets address balance and include\'s pricing and correct currency', async t => {
    const balance = await t.context.web3data.address.getBalance(ADDRESS, {includePrice: true, currency: 'btc'})
    /* Test that balance is numerical */
    t.regex(balance.value, /[0-9]/)
    /* Test that price exists */
    t.truthy(balance.price)
    /* Test that price is correct currency */
    t.is(balance.price.value.currency, 'btc')
})

test('Successfully gets historical address balance', async t => {
    const balance = await t.context.web3data.address.getBalance(ADDRESS, {startDate: 1526184430, endDate: 1556184430})

    /* Note: The data property only present in historical balance */
    t.truthy(balance.data)
    t.true(Array.isArray(balance.data))
})

test('Successfully gets historical address balance + paginates properly', async t => {
    const SIZE = 5
    const balance = await t.context.web3data.address.getBalance(ADDRESS, {startDate: 1506184430, page: 0, size: SIZE})
    t.is(balance.data.length, SIZE)
})

