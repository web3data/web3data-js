import Web3Data from './lib/web3data'
import retrieve from './lib/browser/retrieve'

// Overriden to use the for browsers
Web3Data.prototype.retrieve = retrieve

// eslint-disable-next-line
if (typeof window !== 'undefined' && typeof window.Web3Data === 'undefined') {
  window.Web3Data = Web3Data // eslint-disable-line
}

module.exports = Web3Data
