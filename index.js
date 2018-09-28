require('babel-polyfill')

let Web3Data = require('./lib/web3data')
let retrieve = require('./lib/node/retrieve')
// Overriden to use the for browsers
Web3Data.prototype.retrieve = retrieve
module.exports = Web3Data
