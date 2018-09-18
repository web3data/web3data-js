import Web3DataBrowser from './lib/web3data'
import retrieve from './lib/retrieve'

// Overriden to use the for browsers
Web3DataBrowser.prototype.retrieve = retrieve
module.exports = Web3DataBrowser
