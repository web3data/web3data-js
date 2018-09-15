import 'babel-polyfill'
import Web3Data from './lib/web3data'
import retrieve from './lib/node/retrieve'

// Overriden to use the for browsers
Web3Data.prototype.retrieve = retrieve
module.exports = Web3Data
