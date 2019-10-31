import test, {only} from "ava"
import {ADDRESS } from './constants'
import {ERROR_MESSAGE_ADDRESS_NO_ADDRESS as NO_ADDRESS} from "../src/constants";
import {
    setUpPolly,
    hasProp,
    getNewWeb3DataInstance,
    isISOFormat
} from "./utils";

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

/*********** Test getAll() ***********/
test('Successfully calls getAll()', async t => {
    const [addresses] = await t.context.web3data.address.getAll()
    t.true(addresses.hasProp('firstBlockNumber'))
})

test('Successfully calls getAll() - with filters', async t => {
    const [addresses] = await t.context.web3data.address.getAll({type: 'CONTRACT'})
    t.true(addresses.hasProp('type'))
    t.is(addresses.type.toUpperCase(), 'CONTRACT')
    t.true(addresses.creator !== null)
})

/*********** Test getAllAddresses() ***********/
test('Successfully calls getAllAddresses()', async t => {
    const [addresses] = await t.context.web3data.address.getAllAddresses()
    t.true(addresses.hasProp('firstBlockNumber'))
})

test('Successfully calls getAllAddresses() - with filters', async t => {
    const [addresses] = await t.context.web3data.address.getAllAddresses({type: 'CONTRACT'})
    t.true(addresses.hasProp('type'))
    t.is(addresses.type.toUpperCase(), 'CONTRACT')
    t.true(addresses.creator !== null)
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


/*********** Test getMetadata() ***********/
test('throws exception when calling getMetadata without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getMetadata()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

test('Successfully gets address metadata - no filters', async t => {
    const metadata = (await t.context.web3data.address.getMetadata(ADDRESS))[0]
    t.true({}.hasOwnProperty.call(metadata, 'firstSeen'))
})

test('Successfully gets address metadata - with filters', async t => {
    const metadata = (await t.context.web3data.address.getMetadata(ADDRESS, {timeFormat: 'ms'}))[0]
    t.true({}.hasOwnProperty.call(metadata, 'firstSeen'))

    /*test that first seen is a number implying that it is in ms*/
    t.regex(`${metadata.firstSeen}`, /[0-9]/)
})

/*********** Test getAdoption() ***********/
test('Successfully calls getAdoption()', async t => {
    const adoption = await t.context.web3data.address.getAdoption(ADDRESS)
    t.true(adoption.hasProp('metadata'))
    t.true(adoption.metadata.hasProp('columns'))
})

test('Successfully calls getAdoption() - with filters', async t => {
    const adoption = await t.context.web3data.address.getAdoption(ADDRESS, {timeFormat: 'iso'})
    t.true(adoption.hasProp('metadata'))
    t.true(adoption.metadata.hasProp('columns'))
    t.true(isISOFormat(adoption.metadata.startDate))
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
test('throws exception when calling getLogs without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getLogs()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

test('Successfully gets address logs - no filters', async t => {
    const response = await t.context.web3data.address.getLogs(ADDRESS)
    t.true({}.hasOwnProperty.call(response, 'records'))
})

test('Successfully gets address logs - with filters', async t => {
    const BLOCK_NUMBER = '7280571'
    const response = await t.context.web3data.address.getLogs(ADDRESS, {blockNumber: BLOCK_NUMBER})
    t.true({}.hasOwnProperty.call(response, 'records'))
    t.is(response.records[0].blockNumber, BLOCK_NUMBER)
})

/*********** Test getTransactions() ***********/
test('throws exception when calling getTransactions without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getTransactions()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

test('Successfully gets address transactions - no filters', async t => {
    const response = await t.context.web3data.address.getTransactions(ADDRESS)
    t.true({}.hasOwnProperty.call(response, 'records'))
    t.true({}.hasOwnProperty.call(response.records[0], 'blockNumber'))
})

test('Successfully gets address transactions - with filters', async t => {
    const response = await t.context.web3data.address.getTransactions(ADDRESS, {includePrice: true, validationMethod: 'full'})
    t.true({}.hasOwnProperty.call(response, 'records'))
    t.true({}.hasOwnProperty.call(response.records[0], 'blockNumber'))
    t.true({}.hasOwnProperty.call(response.records[0], 'price'))
})

/*********** Test getPendingTransactions() ***********/
test('throws exception when calling getPendingTransactions without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getPendingTransactions()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

test('Successfully gets address pending transactions - no filters', async t => {
    const response = await t.context.web3data.address.getPendingTransactions(ADDRESS)
    t.true({}.hasOwnProperty.call(response, 'records'))
})

test('Successfully gets address pending transactions - with filters', async t => {
    const response = await t.context.web3data.address.getPendingTransactions(ADDRESS, {includePrice: true})
    t.true({}.hasOwnProperty.call(response, 'records'))
    t.true({}.hasOwnProperty.call(response.records[0], 'price'))
})

test('Successfully gets address pending transactions - with pagination', async t => {
    const SIZE = 5
    const response = await t.context.web3data.address.getPendingTransactions(ADDRESS, {page: 0, size: SIZE})
    t.true({}.hasOwnProperty.call(response, 'records'))
    t.is(response.records.length, SIZE)
})

/*********** Test getTokens() ***********/
test('throws exception when calling getTokens without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getTokens()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

test('Successfully gets address tokens - no filters', async t => {
    const response = await t.context.web3data.address.getTokens(ADDRESS)
    t.true({}.hasOwnProperty.call(response, 'records'))
    t.true({}.hasOwnProperty.call(response, 'totalRecords'))
})

test('Successfully gets address tokens - with filters', async t => {
    const response = await t.context.web3data.address.getTokens(ADDRESS, {amountGt: 1000})
    t.true({}.hasOwnProperty.call(response, 'records'))
    t.true({}.hasOwnProperty.call(response, 'totalRecords'))
})

/*********** Test getTokenTransfers() ***********/
test('throws exception when calling getTokenTransfers without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getTokenTransfers()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

test('Successfully gets address token transfers - no filters', async t => {
    const response = await t.context.web3data.address.getTokenTransfers(ADDRESS)
    t.true({}.hasOwnProperty.call(response, 'records'))
    t.true({}.hasOwnProperty.call(response, 'totalRecords'))
    t.true({}.hasOwnProperty.call(response.records[0], 'isERC20'))
})

test('Successfully gets address token transfers - with filters', async t => {
    const response = await t.context.web3data.address.getTokenTransfers(ADDRESS, {includePrice: true , validationMethod: 'full'})
    t.true({}.hasOwnProperty.call(response, 'records'))
    t.true({}.hasOwnProperty.call(response, 'totalRecords'))
    t.true({}.hasOwnProperty.call(response.records[0], 'validation'))
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
test('Successfully calls getUsage()', async t => {
    const usage = await t.context.web3data.address.getUsage(ADDRESS)
    t.true(usage.hasProp('metadata'))
})

test('Successfully calls getUsage() - with filters', async t => {
    const usage = await t.context.web3data.address.getUsage(ADDRESS, {timeFormat: 'iso'})
    t.true(usage.hasProp('metadata'))
    t.true(isISOFormat(usage.metadata.startDate))
})

test('throws exception when calling getUsage without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getUsage()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

/*********** Test getBalances() ***********/
test('throws exception when calling getBalances without hash', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getBalances()
    }, { instanceOf: Error, message: NO_ADDRESS })
})

test('Successfully gets address balances - no filters', async t => {
    const balances = await t.context.web3data.address.getBalances(ADDRESS)
    t.true({}.hasOwnProperty.call(balances, 'balance'))
    /* Test that balance is numerical */
    t.regex(balances.balance, /[0-9]/)
})

test('Successfully gets address balances - with filters', async t => {
    const balances = await t.context.web3data.address.getBalances(ADDRESS, {includePrice: true})
    t.true({}.hasOwnProperty.call(balances, 'balance'))
    t.true({}.hasOwnProperty.call(balances, 'price'))
})

/*********** Test getBalancesBatch() ***********/
test('throws exception when calling getBalancesBatch without array of hashes', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getBalancesBatch()
    }, { instanceOf: Error, message: 'Must be array of valid address hashes' })
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getBalancesBatch(ADDRESS)
    }, { instanceOf: Error, message: 'Must be array of valid address hashes' })
})

test('throws exception when calling getBalancesBatch with array of empty string', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getBalancesBatch([''])
    }, { instanceOf: Error, message: NO_ADDRESS})
})

test('Successfully gets address batch balances - no filters', async t => {
    const balances = await t.context.web3data.address.getBalancesBatch([ADDRESS, '0xce9af648a831ddf0cd6d05e3fe5787b3c7987246'])
    t.true({}.hasOwnProperty.call(balances, ADDRESS))
    /* Test that balance is numerical */
    t.regex(balances[ADDRESS].balance, /[0-9]/)
})

test('Successfully gets address batch balances - with filters', async t => {
    const balances = await t.context.web3data.address.getBalancesBatch(
        [ADDRESS, '0xce9af648a831ddf0cd6d05e3fe5787b3c7987246'],
        {includePrice: true})
    t.true({}.hasOwnProperty.call(balances, ADDRESS))
    t.true({}.hasOwnProperty.call(balances[ADDRESS], 'price'))
})

/*********** Test getMultipleBalances() ***********/
test('throws exception when calling getBalancesBatch without hash or array of hashes', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getMultipleBalances()
    }, { instanceOf: Error, message: NO_ADDRESS })
    await t.throwsAsync(async () => {
        await t.context.web3data.address.getMultipleBalances([''])
    }, { instanceOf: Error, message: NO_ADDRESS })
})

test('Successfully gets single address multiple balances  - no filters', async t => {
    const balances = await t.context.web3data.address.getMultipleBalances(ADDRESS)
    t.true({}.hasOwnProperty.call(balances, 'balance'))
    /* Test that balance is numerical */
    t.regex(balances.balance, /[0-9]/)
})

test('Successfully get multiple address balances  - no filters', async t => {
    const balances = await t.context.web3data.address.getMultipleBalances([ADDRESS, '0xce9af648a831ddf0cd6d05e3fe5787b3c7987246'])
    t.true({}.hasOwnProperty.call(balances, ADDRESS))
    /* Test that balance is numerical */
    t.regex(balances[ADDRESS].balance, /[0-9]/)
})

test('Successfully gets single address multiple balances  - with filters', async t => {
    const balances = await t.context.web3data.address.getMultipleBalances(ADDRESS, {includePrice: true})
    t.true({}.hasOwnProperty.call(balances, 'balance'))
    t.true({}.hasOwnProperty.call(balances, 'price'))
})

test('Successfully get multiple address balances  - with filters', async t => {
    const balances = await t.context.web3data.address.getMultipleBalances([ADDRESS, '0xce9af648a831ddf0cd6d05e3fe5787b3c7987246'], {includePrice: true})
    t.true({}.hasOwnProperty.call(balances, ADDRESS))
    t.true({}.hasOwnProperty.call(balances[ADDRESS], 'price'))
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

/*********** Test getMetrics() ***********/
test('Successfully calls getMetrics()', async t => {
    const metrics = await t.context.web3data.address.getMetrics(ADDRESS)
    t.true(metrics.hasProp('activeTotal'))
})
