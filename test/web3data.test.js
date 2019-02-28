import Web3Data from '../src/web3data'
import test from 'ava'
import {API_KEY_HEADER, DEFAULT_BASE_URL, BLOCKCHAIN_ID_HEADER} from "../constants";
import dotenv from 'dotenv'
dotenv.load();

let API_KEY;
if(process.env.API_KEY) {
    API_KEY = process.env.API_KEY
} else {
    console.warn("Must set API_KEY value in .env file, \n\
  Create an account on amberdata.io to obtain one");

    // Dumby key; won't work on live net
    API_KEY = 'lbK5e0cae7xf494P3c8Q1od19h41b3fa973'
}

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/
const ADDRESS = '0x873029fead9cc9c05860557576ca1577f420a801'; // 0x06012c8cf97bead5deae237070f9587f8e7a266d
const TX_HASH = '0x7a3dbdc6f5b8b748d972ee9e35ecea6ff62a624816c944bf2419c430156c54ba';
const TOKEN_ADDRESS = '0x06012c8cf97bead5deae237070f9587f8e7a266d' // '0x744d70fdbe2ba4cf95131626614a1763df805b9e'; /* Status Network Token */
const BLOCKCHAIN_ID = '1c9c969065fcd1cf'; /* Ethereum-mainnet */

test.beforeEach(t => {
    t.context.web3data = new Web3Data(API_KEY)
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
    let web3data = new Web3Data(API_KEY, {'baseUrl': 'https://alt-baseUrl.com'});
    t.is(web3data.baseUrl, 'https://alt-baseUrl.com')
});

test('web3data should accept a blockchain id & add to headers', t => {
    let web3data = new Web3Data(API_KEY, {'blockchainId': BLOCKCHAIN_ID});
    t.is(web3data.headers[BLOCKCHAIN_ID_HEADER], BLOCKCHAIN_ID)
});

test('Web3data rawQuery accepts url and returns valid response', async t => {
    let response = await t.context.web3data.rawQuery('/addresses');
    t.is(response.status, 200)
});

/**********************************
 * -------- Test address -------- *
 **********************************/

    /*********** Test getAllAddresses() ***********/
    test('Successfully gets all addresses', async t => {
        let response = await t.context.web3data.address.getAllAddress();
        t.is(response.status, 200)
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

    /*********** Test getTokenHolders() ***********/
    test('Successfully gets address Token Holders', async t => {
        let response = await t.context.web3data.address.getTokenHolders(ADDRESS);
        t.is(response.status, 200)
    });
    test('throws exception when calling getTokenHolders without hash', async t => {
        await t.throwsAsync(async () => {
            await t.context.web3data.address.getTokenHolders()
        }, { instanceOf: Error, message: 'No address hash supplied' });
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

/**********************************
 * ------ Test token ------ *
 **********************************/
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
        let addressTransactions = await t.context.web3data.address.getAllAddress(filterOpts);
        t.is(addressTransactions.status, 200);
        t.is(addressTransactions.payload.records.length, PAGE_SIZE)
    });