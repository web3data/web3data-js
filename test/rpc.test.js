import test from 'ava'
import {
    ERROR_RPC_NO_METHOD as NO_METHOD
} from "../src/constants";

import {
    MOCK_RAW_TXN_DATA,
    MOCK_CALL_DATA,
    MOCK_EXEC_DATA,
} from './constants'

import {setUpPolly, getNewWeb3DataInstance} from "./utils";

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/
test.before(t => {
    t.context.polly = setUpPolly('rpc')
})

test.after(async t => {
    await t.context.polly.stop()
})

test.beforeEach(t => {
    t.context.web3data = getNewWeb3DataInstance()
});
/*********************************
 * ----------- Tests ----------- *
 *********************************/


/**
 * Checks that the response contains a result field with a hex value
 * @param t - the test context
 * @param blockchain - the blockchain namespace e.g. 'eth'
 * @param method - the RPC method
 * @param params - the RPC method parameters
 */
const returnsResultAsHex = async (t, { blockchain, method, params = [] }) => {
    const rpcResp = await t.context.web3data[blockchain].rpc(method , params)
    t.true({}.hasOwnProperty.call(rpcResp, 'result'))

    /* Test that value is hex */
    t.regex(rpcResp.result, /0[xX]?[0-9a-fA-F]*/)
}
returnsResultAsHex.title = (providedTitle = '', input) => `Successfully calls ${input.method} and returns hex result`

/**
 * Checks that the response returns a numerical value
 * @param t - the test context
 * @param blockchain - the blockchain namespace e.g. 'eth'
 * @param method - the RPC method
 * @param params - the RPC method parameters
 * @return {Promise<void>}
 */
const returnsNumber = async (t, {blockchain, method, params = [] }) => {
    const rpcResp = await t.context.web3data[blockchain].rpc(method , params)
    t.is(typeof rpcResp.result, 'number')
}
returnsNumber.title = (providedTitle = '', input) => `Successfully calls ${input.method} and returns number value`

/**
 * Checks that the response contains the specified field
 * @param t - the test context
 * @param blockchain - the blockchain namespace e.g. 'eth'
 * @param method - the RPC method
 * @param field - the field for which to check it's existence in the response
 * @param params - the RPC method parameters
 */
const returnsObjectWithField = async (t, { blockchain, method, field, params = [] }) => {
    const rpcResp = await t.context.web3data[blockchain].rpc(method, params)

    t.true({}.hasOwnProperty.call(rpcResp, 'result'))

    // /* If response is an array of objects, then we want to check for the field on one of the objects*/
    // rpcResp.result = Array.isArray(rpcResp.result) ? rpcResp.result[0] : rpcResp.result
    // t.true({}.hasOwnProperty.call(rpcResp.result, field))
}
returnsObjectWithField.title = (providedTitle = '', input) => `Successfully calls ${input.method} and returns valid object containing expected field`

/*********** Test rpc ***********/
test('throws exception when calling rpc without method', async t => {
    await t.throwsAsync(async () => {
        await t.context.web3data.rpc()
    }, { instanceOf: Error, message: NO_METHOD })
})

/*************************************
 * ----------- Tests ETH ----------- *
 *************************************/

test(returnsResultAsHex, {blockchain: 'eth', method: 'eth_blockNumber'})

test.skip('Successfully calls eth_sendRawTransaction', async t => {
    const rpcResp = await t.context.web3data.eth.rpc('eth_sendRawTransaction' , MOCK_RAW_TXN_DATA)
    t.true({}.hasOwnProperty.call(rpcResp, 'error'))
    t.is(rpcResp.error.message, 'nonce too low')
})

test.skip(returnsResultAsHex, {blockchain: 'eth', method: 'eth_call', params: MOCK_CALL_DATA})
test.skip(returnsResultAsHex, {blockchain: 'eth', method: 'eth_estimateGas', params: MOCK_EXEC_DATA})
test.skip(returnsResultAsHex, {blockchain: 'eth', method: 'eth_gasPrice'})
test.skip(returnsResultAsHex, {blockchain: 'eth', method: 'eth_getBalance', params: ["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"]})
test.skip(returnsResultAsHex, {blockchain: 'eth', method: 'eth_getBlockTransactionCountByHash', params: ["0xfefdd4b98a06e066eef2ceaa6acff39a25dd8bd7cd41033850f9ef54404da5fa"]})
test.skip(returnsResultAsHex, {blockchain: 'eth', method: 'eth_getBlockTransactionCountByNumber', params: ["0x2f"]})
test.skip(returnsObjectWithField, {blockchain: 'eth', field: 'number', method: 'eth_getBlockByHash', params: ["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35",false]})
test.skip(returnsObjectWithField, {blockchain: 'eth',  field: 'number', method: 'eth_getBlockByNumber', params: ["0x1b4", false] })
test.skip(returnsResultAsHex, {blockchain: 'eth', method: 'eth_getCode', params: ["0x06012c8cf97bead5deae237070f9587f8e7a266d", "0x65a8db"]})
test.skip(returnsObjectWithField, {blockchain: 'eth', field: 'topics', method: 'eth_getLogs', params: [{}] })
test.skip(returnsObjectWithField, {blockchain: 'eth', field: 'storageProof', method: 'eth_getProof', params: ["0x1234567890123456789012345678901234567890",["0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000001"],"latest"]})
test.skip(returnsResultAsHex, {blockchain: 'eth', method: 'eth_getStorageAt', params: ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"]})
test.skip(returnsObjectWithField, {blockchain: 'eth', field: 'transactionIndex', method: 'eth_getTransactionByBlockHashAndIndex', params: ["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35","0x0"]})
test.skip(returnsObjectWithField, {blockchain: 'eth', field: 'transactionIndex', method: 'eth_getTransactionByBlockNumberAndIndex', params: ["0x5BAD55","0x0"]})
test.skip(returnsObjectWithField, {blockchain: 'eth', field: 'transactionIndex', method: 'eth_getTransactionByHash', params: ["0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0"]})
test.skip(returnsResultAsHex, {blockchain: 'eth', method: 'eth_getTransactionCount', params: ["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "0x5bad55"]})
test.skip(returnsObjectWithField, {blockchain: 'eth',  field: 'transactionIndex', method: 'eth_getTransactionReceipt', params: ["0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0"]})
test.skip(returnsObjectWithField, {blockchain: 'eth',  field: 'number', method: 'eth_getUncleByBlockHashAndIndex', params: ["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35", "0x0"]})
test.skip(returnsObjectWithField, {blockchain: 'eth',  field: 'number', method: 'eth_getUncleByBlockNumberAndIndex', params: ["0x29c", "0x0"]})
test.skip(returnsResultAsHex, {blockchain: 'eth', method: 'eth_getUncleCountByBlockHash', params: ["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35"]})
test.skip(returnsResultAsHex, {blockchain: 'eth', method: 'eth_protocolVersion'})

/*************************************
 * ----------- Tests BTC ----------- *
 *************************************/

test.skip(returnsResultAsHex, {blockchain: 'btc', method: 'getbestblockhash'})
test.skip(returnsObjectWithField, {blockchain: 'btc', field: 'hash', method: 'getblock', params: ["00000000000000000000e16f42aa65970c1e0be9063b4898806d9e31aee4e005"]})
test.skip(returnsObjectWithField, {blockchain: 'btc', field: 'chain', method: 'getblockchaininfo'})
test.skip(returnsResultAsHex, {blockchain: 'btc', method: "getblockhash", params: [ /* block number */ 594413 ]})
test.skip(returnsObjectWithField, {blockchain: 'btc', field: 'hash', method: "getblockheader", params: [ "000000000000000000187f49c0f588440af52039bc6e5951c286b692af2d004d" ]})
test.skip(returnsObjectWithField, {blockchain: 'btc', field: 'avgfee', method: "getblockstats", params: [ "000000000000000000187f49c0f588440af52039bc6e5951c286b692af2d004d" ]})
test.skip(returnsObjectWithField, {blockchain: 'btc', field: 'branchlen', method: "getchaintips"})
test.skip(returnsObjectWithField, {blockchain: 'btc', field: 'time', method: "getchaintxstats"})
test.skip(returnsNumber, {blockchain: 'btc', method: "getconnectioncount"})
test.skip(returnsNumber, {blockchain: 'btc', method: "getdifficulty"})
test.skip(returnsObjectWithField, {blockchain: 'btc', method: "getmemoryinfo"})

test('Successfully calls getrawmempool and returns array of transaction hashes', async t => {
    const rpcResp = await t.context.web3data.btc.rpc('getrawmempool')
    t.true({}.hasOwnProperty.call(rpcResp, 'result'))
    t.true(Array.isArray(rpcResp.result))
})

test.skip('Successfully calls getmempoolancestors', async t => {
    let rpcResp = await t.context.web3data.btc.rpc('getrawmempool')
    const mempool = rpcResp.result
    rpcResp = await t.context.web3data.btc.rpc('getmempoolancestors', mempool[0])
    t.true({}.hasOwnProperty.call(rpcResp, 'result'))
    t.true(Array.isArray(rpcResp.result))
})

test.skip('Successfully calls getmempooldescendants', async t => {
    let rpcResp = await t.context.web3data.btc.rpc('getrawmempool')
    const mempool = rpcResp.result
    rpcResp = await t.context.web3data.btc.rpc('getmempooldescendants', mempool[0])
    t.true({}.hasOwnProperty.call(rpcResp, 'result'))
    t.true(Array.isArray(rpcResp.result))
})

test.skip('Successfully calls getmempoolentry', async t => {
    let rpcResp = await t.context.web3data.btc.rpc('getrawmempool')
    const mempool = rpcResp.result
    rpcResp = await t.context.web3data.btc.rpc('getmempoolentry', mempool[0])
    t.true({}.hasOwnProperty.call(rpcResp, 'result'))
    t.true({}.hasOwnProperty.call(rpcResp.result, 'fees'))
})

test.skip(returnsObjectWithField, {blockchain: 'btc', method: "getmempoolentry", params: ["c4828ffd48329ea6d88f3fbd2ec86e9e925a42f0a9ff6ac9e8e7d37131fc557"]})
test.skip(returnsObjectWithField, {blockchain: 'btc', field: 'size', method: "getmempoolinfo"})
test.skip(returnsNumber, {blockchain: 'btc', method: "getnetworkhashps"})
test.skip(returnsResultAsHex, {blockchain: 'btc', method: "getrawtransaction", params: ["6b029135dcbff2c9bba177b3875542c1a5d0c8ffa6f889658b14ff9d97487b0a"]})
test.skip(returnsObjectWithField, {blockchain: 'btc', field: 'bestblock', method: "gettxout", params: ["33f45b9455cfd3b1e05abbc708107e17f774641bfb3121e1d62cc029faf04ca9", 0]})
test.skip(returnsResultAsHex, {blockchain: 'btc', method: "gettxoutproof", params: [["73969cb14bda9cdcf1c0f96b3e3d0941caf44b7328bba89b0e7c6d31ea710894"]] })
test.skip(returnsResultAsHex, {blockchain: 'btc', method: "createrawtransaction" })
test.skip(returnsResultAsHex, {blockchain: 'btc', method: "sendrawtransaction" })
test.skip(returnsResultAsHex, {blockchain: 'btc', method: "testmempoolaccept" })
test.skip(returnsResultAsHex, {blockchain: 'btc', method: "decoderawtransaction" })
