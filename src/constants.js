module.exports.DEFAULT_WEBSOCKET_URL = 'wss://ws.web3api.io'
module.exports.DEFAULT_BASE_URL = 'https://web3api.io/api/v1'
module.exports.DEFAULT_RPC_URL = 'https://rpc.web3api.io'

module.exports.API_KEY_HEADER = 'x-api-key'
module.exports.BLOCKCHAIN_ID_HEADER = 'x-amberdata-blockchain-id'

module.exports.BLOCKCHAIN_ID_ETHEREUM_MAINNET = '1c9c969065fcd1cf'
module.exports.BLOCKCHAIN_ID_ETHEREUM_RINKEBY = '1b3f7a72b3e99c13'
module.exports.BLOCKCHAIN_ID_BITCOIN = '408fa195a34b533de9ad9889f076045e'

/* Endpoints */
module.exports.ADDRESSES_ENDPOINT = '/addresses'
module.exports.TOKENS_ENDPOINT = '/tokens'
module.exports.TRANSACTIONS_ENDPOINT = '/transactions'
module.exports.BLOCKS_ENDPOINT = '/blocks'
module.exports.CONTRACTS_ENDPOINT = '/contracts'
module.exports.SIGNATURES_ENDPOINT = '/signatures'
module.exports.MARKET_ENDPOINT = '/market'

module.exports.MARKET_FEATURES = [
  'pairs',
  'exchanges',
  'ohlcv',
  'prices',
  'tickers'
]

/* Error messages */
module.exports.ERROR_MESSAGE_TOKEN_NO_ADDRESS = 'No token address supplied'
module.exports.ERROR_MESSAGE_TOKEN_NO_HOLDER_ADDRESS =
  'No token holder address supplied'
module.exports.ERROR_MESSAGE_TRANSACTION_NO_HASH =
  'No transaction hash supplied'
module.exports.ERROR_MESSAGE_ADDRESS_NO_ADDRESS = 'No address supplied'
module.exports.ERROR_MESSAGE_CONTRACT_NO_ADDRESS =
  'No contract address supplied'
module.exports.ERROR_MESSAGE_BLOCK_NO_ID = 'No block number or hash supplied'
module.exports.ERROR_MESSAGE_MARKET_NO_PAIR = 'No market pair supplied'
module.exports.ERROR_MESSAGE_MARKET_NO_FEATURE = `Missing or unknown. Features: '${module.exports.MARKET_FEATURES.join(
  "', '"
)}'`
module.exports.ERROR_MESSAGE_SIGNATURE_NO_HASH = 'No signature hash supplied'
module.exports.ERROR_RPC_NO_METHOD = 'No RPC method provided'

/* Ethereum based methods */
module.exports.ETH_METHODS = {
  getBlockNumber: 'block',
  getBlock: 'block',
  getBlockTransactionCount: 'block',
  getUncle: 'block',
  getCode: 'contract',
  getGasPrice: 'transaction',
  getTransactionFromBlock: 'block',
  getTransactions: 'block',
  getTransaction: 'transaction',
  getPendingTransactions: 'transaction',
  getEtherPrice: 'market'
}

/* HTTP Response codes */
module.exports.HTTP_CODE_NOT_FOUND = 404
