module.exports.DEFAULT_WEBSOCKET_URL = 'wss://ws.web3api.io'
module.exports.DEFAULT_BASE_URL = 'https://web3api.io/api/v1'
module.exports.API_KEY_HEADER = 'x-api-key'
module.exports.BLOCKCHAIN_ID_HEADER = 'x-amberdata-blockchain-id'

/* Endpoints */
module.exports.ADDRESSES_ENDPOINT = '/addresses'
module.exports.TOKENS_ENDPOINT = '/tokens'
module.exports.TRANSACTIONS_ENDPOINT = '/transactions'
module.exports.BLOCKS_ENDPOINT = '/blocks'
module.exports.CONTRACTS_ENDPOINT = '/contracts'
module.exports.SIGNATURES_ENDPOINT = '/signatures'

module.exports.ERROR_MESSAGE_TOKEN_NO_ADDRESS = 'No token address supplied'
module.exports.ERROR_MESSAGE_TOKEN_NO_HOLDER_ADDRESS =
  'No token holder address supplied'
module.exports.ERROR_MESSAGE_TRANSACTION_NO_HASH =
  'No transaction hash supplied'
module.exports.ERROR_MESSAGE_ADDRESS_NO_ADDRESS = 'No address supplied'
module.exports.ERROR_MESSAGE_CONTRACT_NO_ADDRESS =
  'No contract address supplied'
module.exports.ERROR_MESSAGE_BLOCK_NO_NUMBER = 'No block number supplied'
module.exports.ERROR_MESSAGE_SIGNATURE_NO_HASH = 'No signature hash supplied'

/* Ethereum based methods */
module.exports.ETH_METHODS = {
  block: 'getBlockNumber',
  contract: 'getCode',
  transaction: 'getGasPrice'
}
