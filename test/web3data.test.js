import Web3data from '../index'
import test from 'ava'
import nock from 'nock'
import defaultOptions from './helpers/nock'

// Web3data object intestializes and is properly configured
if(!process.env.API_KEY) {
  console.log("Must set API_KEY value in .env file") //TODO: Elaborate on how to get it
  process.exit(1)
}

let web3data
const API_KEY = process.env.API_KEY
const BLOCKCHAIN_ID = '1c9c969065fcd1cf' /* Ethereum Mainnet */
const SLUG = 'ethereum-mainnet'

/* ---- Setup and tear down ---- */
test.before(t => {
  let config = {
    'apiKey': API_KEY,
    'blockchainId': BLOCKCHAIN_ID
  }
  web3data = new Web3data(config)

})

test.afterEach(t => {
	nock.cleanAll
});

test.after('clean up', t => {
  nock.restore
})


/* ---- Tests ---- */

/* Test web3data object */
test('web3data should have object \'config\'', t => {
  t.truthy(web3data.config)
})

test('web3data should have the apikey set', t => {
  //expect(web3data.config['apiKey']).to.equal(API_KEY)
  t.is(web3data.config['apiKey'], API_KEY)
})

test('web3data should have the correct blockchain id', t => {
  t.is(web3data.config['blockchainId'], BLOCKCHAIN_ID)
})

test.todo('web3data should have the correct blockchain slug') // TBD


/* Test addresses method */
test.todo('throws exception when calling 'addresses' without hash')

// Test info method
test('Successfully gets address information', async t => {
  nock.back.setMode('record');

  const { nockDone } = await nock.back(
    'address-info.json',
    defaultOptions,
  );

  let addressInfo = await web3data.addresses('0x314159265dd8dbb310642f98f50c066173c1259b').info().retrieve()
  t.is(addressInfo.status, 200)


  nockDone();
  nock.back.setMode('wild');
})

// Test stats method
test.todo('gets address stats')

// Test logs method
test.todo('gets address logs')

// Test transactions method
test.todo('gets all transactions of the address')
test.todo('gets single transaction of the address')
test.todo('gets non existent transaction of the address and receives error')

// Test messages method
test.todo('gets all messages of the address')
test.todo('gets single messages of the address')

// Test tokens method
test.todo('gets all tokens of the address')
test.todo('gets single token of the address')

/*
  Testing Modifiers
*/
