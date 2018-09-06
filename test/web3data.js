//let Web3data = require(../index)
import Web3data from '../index'
import 'chai/register-expect'

describe('Web3data object initializes and is properly configured', function() {

  let web3data
  const API_KEY = 'UAK78209f698716e0002b8cefe330b8049f'
  const BLOCKCHAIN_ID = '1c9c969065fcd1cf' /*Ethereum Mainnet*/
  const SLUG = 'ethereum-mainnet'

  before(function() {
    let config = {
      'apiKey': API_KEY,
      'blockchainId': BLOCKCHAIN_ID
    }
    web3data = new Web3data(config)

  })

  it('should have ', function(){
    expect(web3data).to.have.property('config')
  })

  it('should have the apikey set', function () {
    expect(web3data.config['apiKey']).to.equal(API_KEY)
  })

  it('should have the correct blockchain id', function () {
    expect(web3data.config['blockchainId']).to.equal(BLOCKCHAIN_ID)
  })

  it('should have the correct blockchain slug') // TBD

})
