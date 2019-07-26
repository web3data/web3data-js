import Web3Data from '../src/web3data'
import test from 'ava'
import {API_KEY_HEADER, DEFAULT_BASE_URL, BLOCKCHAIN_ID_HEADER} from "../src/constants";

import {
    getNewWeb3DataInstance,
    TOKEN_ADDRESS,
    BLOCKCHAIN_ID,
    API_KEY,
    BLOCK_NUMBER,
    TXN_HASH
} from './constants'
import {setUpPolly} from "./utils";

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/
test.before(t => {
    t.context.polly = setUpPolly('web3data')
})

test.after(async t => {
    await t.context.polly.stop()
})

test.beforeEach(t => {
    t.context.web3data = getNewWeb3DataInstance()
});

/**********************************
 * ----------- Tests  ----------- *
 **********************************/

/*********** Test Web3Data ***********/
test('Web3data should have the apikey in headers', t => {
    t.is(t.context.web3data.headers[API_KEY_HEADER], API_KEY)
});

test('Throws exception when no api key is supplied', t => {
    const error = t.throws(() => { new Web3Data() }, Error);
    t.is(error.message, "No api key supplied");
});

test('Web3data should have valid base url set', t => {
    t.is(t.context.web3data.baseUrl, DEFAULT_BASE_URL)
});

test('web3data can add alternative baseUrl', t => {
    let web3data = getNewWeb3DataInstance({'baseUrl': 'https://alt-baseUrl.com'})
    t.is(web3data.baseUrl, 'https://alt-baseUrl.com')
});

test('web3data should accept a blockchain id & add to headers', t => {
    let web3data = getNewWeb3DataInstance({'blockchainId': BLOCKCHAIN_ID})
    t.is(web3data.headers[BLOCKCHAIN_ID_HEADER], BLOCKCHAIN_ID)
});

test('Web3data rawQuery accepts url and returns valid response', async t => {
    let response = await t.context.web3data.rawQuery('/addresses');
    t.is(response.status, 200)
});


/*********** Test .eth ***********/
test('web3data.eth successfully calls method getGasPrice', async t => {
    const price = await t.context.web3data.eth.getGasPrice()
    /* Regex matches a string that is numerical */
    t.regex(price.toString(), /[0-9]/g)
})

test('web3data.eth successfully calls method getBlockNumber', async t => {
    const number = await t.context.web3data.eth.getBlockNumber()
    /* Regex matches a string that is numerical */
    t.regex(number.toString(), /[0-9]/g)
})

test('web3data.eth successfully calls method getCode', async t => {
    const code = await t.context.web3data.eth.getCode(TOKEN_ADDRESS)
    /* Regex matches a string that begins with 0x and has alphanumeric chars */
    t.regex(code, /0x\w+/g)
})

test('web3data.eth successfully calls method getBlock', async t => {
    const block = await t.context.web3data.eth.getBlock(BLOCK_NUMBER)
    /* Regex matches a string that is numerical */
    t.regex(block.number.toString(), /[0-9]/g)
})

test('web3data.eth successfully calls method getTransactionFromBlock', async t => {
    const txn = await t.context.web3data.eth.getTransactionFromBlock(BLOCK_NUMBER, 0)
    t.is(parseInt(txn.blockNumber), BLOCK_NUMBER)
})

test('web3data.eth successfully calls method getBlockTransactionCount', async t => {
    const txnsCount = await t.context.web3data.eth.getBlockTransactionCount(BLOCK_NUMBER)
    /* Regex matches a string that is numerical */
    t.regex(txnsCount.toString(), /[0-9]/g)
})

test('web3data.eth successfully calls method getTransaction', async t => {
    const txn = await t.context.web3data.eth.getTransaction(TXN_HASH)
    /* Regex matches a string that is numerical */
    t.is(txn.hash, TXN_HASH)
})

test('web3data.eth successfully calls method getTransactions', async t => {
    const txns = await t.context.web3data.eth.getTransactions(BLOCK_NUMBER)
    t.true(txns.length > 0)
})

test('web3data.eth successfully calls method getPendingTransactions', async t => {
    const pendTxns = await t.context.web3data.eth.getPendingTransactions()
    t.true(pendTxns.length > 0)
})

test('web3data.eth successfully calls method getUncle', async t => {
    const uncle = await t.context.web3data.eth.getUncle(BLOCK_NUMBER, 0)
    t.is(parseInt(uncle.blockNumber), BLOCK_NUMBER)
})

test('Web3data.eth successfully calls getEtherPrice returns valid response', async t => {
    let response = await t.context.web3data.eth.getEtherPrice();
    t.true(response.hasOwnProperty('eth_btc'))
})

/**********************************
 * ------- Test Modifiers ------- *
 **********************************/

    /*********** Test pagination ***********/
    test('Test pagination: limit & offset', async t => {
        const PAGE_SIZE = 3;
        const filterOpts = {
            'page': 0,
            'size': 3
        };
        let addressTransactions = await t.context.web3data.address.getAllAddresses(filterOpts);
        t.is(addressTransactions.status, 200);
        t.is(addressTransactions.payload.records.length, PAGE_SIZE)
    });
