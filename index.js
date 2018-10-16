const Web3Data = require('./lib/web3data')
const retrieve = require('./lib/node/retrieve').default

// Overriden to use the for browsers
Web3Data.prototype.retrieve = retrieve
module.exports = Web3Data
