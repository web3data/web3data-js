import fetch, {Headers} from 'node-fetch'
import Web3Data from  '../browser'
import test from 'ava'
import dotenv from 'dotenv'

/* Setup the global window object to simulate running ky in a browser*/
global.window = {};
global.window.fetch = fetch;
global.window.Headers = Headers;

// Web3data object intestializes and is properly configured
dotenv.load()
if(!process.env.API_KEY) {
  console.error("Must set API_KEY value in .env file") //TODO: Elaborate on how to get it
  process.exit(1)
}

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/

const SLUG = ''
const API_KEY = process.env.API_KEY
const BLOCKCHAIN_ID = '822e2ebe02f74df8'/* Stellar */

const CONFIG = {
  'apiKey': API_KEY,
  'blockchainId':  BLOCKCHAIN_ID
}

test.beforeEach(t => {
  t.context.web3data = new Web3Data(CONFIG)
})

/**********************************
 * ----------- Tests  ----------- *
 **********************************/

/*********** Test web3data() ***********/
test('web3data should have object \'config\'', t => {
  t.truthy(t.context.web3data.config)
})

test('web3data should have the apikey set', t => {
  t.is(t.context.web3data.config['apiKey'], API_KEY)
})

test('web3data should have the correct blockchain id', t => {
  t.is(t.context.web3data.config['blockchainId'], BLOCKCHAIN_ID)
})

test.todo('web3data should have the correct blockchain slug') // TBD

test('throws exception when no config object is supplied', t => {
  const error = t.throws(() => { new Web3Data() }, Error);
  t.is(error.message, "No configuration object supplied");
})

test('throws exception when no api key is supplied', t => {
  const error = t.throws(() => { new Web3Data({}) }, Error);
  t.is(error.message, "No api key supplied");
})

test('throws exception when no blockchainid is supplied', t => {
  const error = t.throws(() => { new Web3Data({'apiKey':'apikey'}) }, Error);
  t.is(error.message, "No Blockchain specified");
})

/**********************************
 * ------ Test addresses() ------ *
 **********************************/
test('throws exception when calling \'addresses\' without hash', t => {
  const error = t.throws(() => { t.context.web3data.addresses() }, Error);
  t.is(error.message, 'No address hash provided');
})

/*********** Test info() ***********/
test.only('Successfully gets address information', async t => {
  let addressInfo = await t.context.web3data.addresses('0x314159265dd8dbb310642f98f50c066173c1259b').info().retrieve()
  t.is(addressInfo.status, 200)
})

/*********** Test stats() ***********/
test('gets address stats', async t => {
  let addressStats= await t.context.web3data.addresses('0x314159265dd8dbb310642f98f50c066173c1259b').stats().retrieve()
  t.is(addressStats.status, 200)
})

/*********** Test logs() ***********/
test('gets address logs', async t => {
  let addressLogs = await t.context.web3data.addresses('0x314159265dd8dbb310642f98f50c066173c1259b').logs().retrieve()
  t.is(addressLogs.status, 200)
})

/*********** Test transactions() ***********/
test.todo('gets all transactions of the address'/*, t => {}*/)
test.todo('gets single transaction of the address')
test.todo('gets non existent transaction of the address and receives error')

/*********** Test messages() ***********/
test.todo('gets all messages of the address')
test.todo('gets single messages of the address')

/*********** Test tokens() ***********/
test.todo('gets all tokens of the address')
test.todo('gets single token of the address')

/**********************************
 * ------- Test Modifiers ------- *
 **********************************/

/*********** Test filters() ***********/
test('Filters properly', async t => {
  const filterOpts = {'blockNumber':6237323}
  let addressLogs = await t.context.web3data.addresses('0x314159265dd8dbb310642f98f50c066173c1259b').logs().filter(filterOpts).retrieve()
  t.is(addressLogs.status, 200)
})
