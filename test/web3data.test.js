import Web3data from '../index'
import test from 'ava'

// Web3data object intestializes and is properly configured

if(!process.env.API_KEY) {
  console.log("Must set API_KEY value in .env file") //TODO: Elaborate on how to get it
  process.exit(1)
}

let web3data
const API_KEY = process.env.API_KEY
const BLOCKCHAIN_ID = '1c9c969065fcd1cf' /* Ethereum Mainnet */
const SLUG = 'ethereum-mainnet'

test.before(t => {
  let config = {
    'apiKey': API_KEY,
    'blockchainId': BLOCKCHAIN_ID
  }
  web3data = new Web3data(config)

})

test('should have object \'config\'', t => {
  t.truthy(web3data.config)
})

test('should have the apikey set', t => {
  //expect(web3data.config['apiKey']).to.equal(API_KEY)
  t.is(web3data.config['apiKey'], API_KEY)
})

test('should have the correct blockchain id', t => {
  t.is(web3data.config['blockchainId'], BLOCKCHAIN_ID)
})

test.todo('should have the correct blockchain slug') // TBD
