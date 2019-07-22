import Web3Data from '../src/web3data'
import test from 'ava'
import {API_KEY_HEADER, DEFAULT_BASE_URL, BLOCKCHAIN_ID_HEADER} from "../src/constants";

import { getNewWeb3DataInstance, TOKEN_ADDRESS, BLOCKCHAIN_ID, API_KEY } from './constants'
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

test('Web3data getEtherPrice returns valid response', async t => {
    let response = await t.context.web3data.getEtherPrice();
    t.true(response.hasOwnProperty('eth_btc'))
});

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
