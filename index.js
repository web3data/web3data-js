const Web3Data = require('./src/web3data')
// eslint-disable-next-line no-undef
if (typeof window !== 'undefined' && typeof window.Web3Data === 'undefined') {
  window.Web3Data = Web3Data // eslint-disable-line no-undef
}

module.exports = Web3Data
