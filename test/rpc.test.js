import Web3Data from '../src/web3data'
import test from 'ava'
import {
    API_KEY_HEADER,
    DEFAULT_BASE_URL,
    BLOCKCHAIN_ID_HEADER,
    ERROR_MESSAGE_ADDRESS_NO_ADDRESS as NO_ADDRESS,
    ERROR_RPC_NO_METHOD as NO_METHOD
} from "../src/constants";

import {
    getNewWeb3DataInstance,
    MOCK_RAW_TXN_DATA,
    MOCK_CALL_DATA,
    MOCK_EXEC_DATA, ADDRESS
} from './constants'

import {setUpPolly} from "./utils";

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
    t.regex(rpcResp.result, /0[xX][0-9a-fA-F]*/)
}
returnsResultAsHex.title = (providedTitle = '', input) => `Successfully calls ${input.method} and returns hex result`

const returnsObjectWithField = async (t, { blockchain, method, field, params = [] }) => {
    const rpcResp = await t.context.web3data[blockchain].rpc(method, params)
    t.true({}.hasOwnProperty.call(rpcResp, 'result'))
    t.true({}.hasOwnProperty.call(rpcResp.result, field))
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

test(returnsResultAsHex, {blockchain: 'eth', method: 'eth_call', params: MOCK_CALL_DATA})
test(returnsResultAsHex, {blockchain: 'eth', method: 'eth_estimateGas', params: MOCK_EXEC_DATA})
test(returnsResultAsHex, {blockchain: 'eth', method: 'eth_gasPrice'})
test(returnsResultAsHex, {blockchain: 'eth', method: 'eth_getBalance', params: ["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"]})
test(returnsResultAsHex, {blockchain: 'eth', method: 'eth_getBlockTransactionCountByHash', params: ["0xfefdd4b98a06e066eef2ceaa6acff39a25dd8bd7cd41033850f9ef54404da5fa"]})
test(returnsResultAsHex, {blockchain: 'eth', method: 'eth_getBlockTransactionCountByNumber', params: ["0x2f"]})
test(returnsObjectWithField, {blockchain: 'eth', field: 'number', method: 'eth_getBlockByHash', params: ["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35",false]})
test(returnsObjectWithField, {blockchain: 'eth',  field: 'number', method: 'eth_getBlockByNumber', params: ["0x1b4", false] })
test(returnsResultAsHex, {blockchain: 'eth', method: 'eth_getCode', params: ["0x06012c8cf97bead5deae237070f9587f8e7a266d", "0x65a8db"]})

test('Successfully calls eth_getLogs', async t => {
    const rpcResp = await t.context.web3data.eth.rpc('eth_getLogs', [{"blockHash": "0x7c5a35e9cb3e8ae0e221ab470abae9d446c3a5626ce6689fc777dcffcab52c70", "topics":["0x241ea03ca20251805084d27d4440371c34a0b85ff108f6bb5611248f73818b80"]}])
    t.true({}.hasOwnProperty.call(rpcResp, 'result'))
    t.true(Array.isArray(rpcResp.result))
    /* Check that array contains logs objects */
    t.true({}.hasOwnProperty.call(rpcResp.result[0], 'topics'))
})

test(returnsObjectWithField, {blockchain: 'eth', field: 'storageProof', method: 'eth_getProof', params: ["0x1234567890123456789012345678901234567890",["0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000001"],"latest"]})
test(returnsResultAsHex, {blockchain: 'eth', method: 'eth_getStorageAt', params: ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"]})
test(returnsObjectWithField, {blockchain: 'eth', field: 'transactionIndex', method: 'eth_getTransactionByBlockHashAndIndex', params: ["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35","0x0"]})
test(returnsObjectWithField, {blockchain: 'eth', field: 'transactionIndex', method: 'eth_getTransactionByBlockNumberAndIndex', params: ["0x5BAD55","0x0"]})
test(returnsObjectWithField, {blockchain: 'eth', field: 'transactionIndex', method: 'eth_getTransactionByHash', params: ["0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0"]})
test(returnsResultAsHex, {blockchain: 'eth', method: 'eth_getTransactionCount', params: ["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "0x5bad55"]})
test(returnsObjectWithField, {blockchain: 'eth',  field: 'transactionIndex', method: 'eth_getTransactionReceipt', params: ["0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0"]})
test(returnsObjectWithField, {blockchain: 'eth',  field: 'number', method: 'eth_getUncleByBlockHashAndIndex', params: ["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35", "0x0"]})
test(returnsObjectWithField, {blockchain: 'eth',  field: 'number', method: 'eth_getUncleByBlockNumberAndIndex', params: ["0x29c", "0x0"]})
test(returnsResultAsHex, {blockchain: 'eth', method: 'eth_getUncleCountByBlockHash', params: ["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35"]})
test(returnsResultAsHex, {blockchain: 'eth', method: 'eth_protocolVersion'})

