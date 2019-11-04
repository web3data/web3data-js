# [web3data-js](https://github.com/web3data/web3data-js#readme) *0.5.16*

> A javascript wrapper for accessing amberdata&#x27;s public API.


### src/address.js



#### Class: Address


Contains methods pertaining to the `/address` endpoint of Amberdata's API.









#### constructor(web3data)


Creates an instance of Address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data |  |  The web3data instance. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`





#### getAllAddresses(filterOptions)


Alias of getAll().




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions |  |  The filters associated with the request. | &nbsp; |




##### Examples

```javascript
web3data.address.getAllAddresses({ size: 100,
})
```


##### Returns


- `Void`





#### getAll(filterOptions)


Returns every address that has been seen on the network.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions |  |  The filters associated with the request. | &nbsp; |
| filterOptions.hash |  |  Filter by a specific address. | &nbsp; |
| filterOptions.size |  |  The size of the response. <b>Default:</b> `100`. | &nbsp; |




##### Examples

```javascript
web3data.address.getAll({ size: 100,
})
```


##### Returns


-  Containing an object with an array of objects containing. See [API docs](https://docs.amberdata.io/reference#get-all-addresses) for details on response.





#### getAdoption(hash, filterOptions)


Retrieves the historical adoption for the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address. | &nbsp; |
| filterOptions |  |  The filters associated with the request. See [API docs](https://docs.amberdata.io/reference#getaddressadoption) for details. | &nbsp; |




##### Examples

```javascript
const adoption = await web3data.address.getAdoption('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


-  The historical adoption data for the specified address.





#### getInternalMessages(hash, filterOptions)


Retrieves the functions (aka internal messages) where this address is either the originator or a recipient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address of the account. | &nbsp; |
| filterOptions |  |  The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The balance data of the account or if no address is found.





#### getFunctions(hash, filterOptions)


Retrieves the functions (aka internal messages) where this address is either the originator or a recipient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address of the account. | &nbsp; |
| filterOptions |  |  The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The balance data of the account or if no address is found.





#### getLogs(hash, filterOptions)


Retrieves the logs for the transactions where this address is either the originator or a recipient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address of the account. | &nbsp; |
| filterOptions |  |  The filter options associated with the request. | &nbsp; |




##### Examples

```javascript
web3data.getLogs('0x...')
```


##### Returns


-  Promise object containing the array of logs.





#### getTransactions(hash, filterOptions)


Retrieves the transactions where this address was either the originator or a recipient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address of the account. | &nbsp; |
| filterOptions |  |  The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The object containing the array of transaction objects.





#### getPendingTransactions(hash, filterOptions)


Retrieves pending transactions the specified address is involved in.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address of the account. | &nbsp; |
| filterOptions |  |  The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The array of pending transactions.





#### getBalance(hash, filterOptions)


Retrieves the latest or historical balance data of the given address depending upon
Returns null if no address is found.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  the address of the account | &nbsp; |
| filterOptions |  |  the filter options associated with the request | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  the balance data of the account or if no address is found.





#### getLatestBalance(hash, filterOptions)


Retrieves the latest balance data of the given address. Returns null if no address is found.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address of the account. | &nbsp; |
| filterOptions |  |  The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The balance data of the account or if no address is found.





#### getHistoricalBalance(hash, filterOptions)


Retrieves the historical balance data of the given address. Returns null if no address is found.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address of the account. | &nbsp; |
| filterOptions |  |  The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The historical balance data of the account or if no address is found.





#### getMultipleBalances(hashes, filterOptions)


Retrieves the latest account and token balances for the specified address(es).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hashes |  |  The array or string containing the address(es) of the account. | &nbsp; |
| filterOptions |  |  The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The balance data of the account(s).





#### getBalances(hash, filterOptions)


Retrieves the latest account and token balances for the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address of the account. | &nbsp; |
| filterOptions |  |  The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The balance data of the account.





#### getBalancesBatch(hashes, filterOptions)


Retrieves the latest account and token balances for the specified addresses.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hashes |  |  The array containing the address(es) of the account. | &nbsp; |
| filterOptions |  |  The filter options associated with the request. | &nbsp; |




##### Examples

```javascript
const await getBalancesBatch(['0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be', '0x06012c8cf97bead5deae237070f9587f8e7a266d'], { includePrice: true
})
```


##### Returns


-  The balance data of the account(s).





#### getTokens(hash, filterOptions)


Retrieves the balance data of the given address. Returns null if no address is found.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address of the account. | &nbsp; |
| filterOptions |  |  The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The token balance data of the account.





#### getTokenTransfers(hash, filterOptions)


Retrieves all token transfers involving the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address of the account. | &nbsp; |
| filterOptions |  |  The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The object containing the array of token transfer objects.





#### getUsage(hash, filterOptions)


Retrieves the historical usage for the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address. | &nbsp; |
| filterOptions |  |  The filters associated with the request. See [API docs](https://docs.amberdata.io/reference#getaddressusage) for details. | &nbsp; |




##### Examples

```javascript
const usage = await web3data.address.getUsage(ADDRESS)
```


##### Returns


-  The usage statistics for the specified address.





#### getMetrics()


Get metrics for all addresses that have exist publicly for a given blockchain. Default metrics are for Ethereum over a 24h period.






##### Examples

```javascript
const metrics = await web3data.address.getMetrics(ADDRESS)
```


##### Returns


-  The address metrics.





### src/block.js



#### getBlock(id, filterOptions)


Retrieves the blocks specified by its id (number or hash).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id |  |  The number or hash of the block for which to retrieve block information. | &nbsp; |
| filterOptions |  |  | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  





### src/contract.js



#### Class: Contract


Contains methods pertaining to the `/contracts` endpoint of Amberdata's API.









#### constructor(web3data)


Creates an instance of Contract.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data |  |  The web3data instance. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`





#### getDetails(hash)


Retrieves all the detailed information for the specified contract (ABI, bytecode, sourcecode...).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address. | &nbsp; |




##### Examples

```javascript
const details = await web3data.contract.getDetails('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


-  The detailed information for the specified contract.





#### getFunctions(hash)


Retrieves the functions of the specified contract (if available). If not available on chain, the byte code is decompiled and a list of functions is extracted from it.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The contract address. | &nbsp; |




##### Examples

```javascript
const functions = await web3data.contract.getFunctions('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


-  The functions or decompiled functions of the specified contract.





#### getSecurityAudit(hash)


Retrieves the vulnerabilities audit for the specified contract (if available).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The contract address. | &nbsp; |




##### Examples

```javascript
const audit = await web3data.contract.getAudit('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


-  The vulnerabilities audit for the specified contract.





#### getAbi(hash)


Retrieves the contract's abi.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The contract address. | &nbsp; |




##### Examples

```javascript
const abi = await web3data.contract.getAbi('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


-  The abi of the contract.





#### getSourceCode(hash)


Retrieves the contract's source code.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The contract address. | &nbsp; |




##### Examples

```javascript
const source = await web3data.contract.getSourceCode('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


-  The source of the contract.





#### getCode(hash)


Returns the contract's bytecode.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The contract address. | &nbsp; |




##### Examples

```javascript
const code = await web3data.contract.getCode('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


-  The contract's bytecode.





### src/market.js



#### Class: Market


Contains methods pertaining to the `/market` endpoint of Amberdata's API.









#### constructor(web3data)


Creates an instance of the Market class.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data |  |  The web3data instance. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`





#### getRankings(filterOptions)


Retrieves the top ranked assets by a specific metric.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions |  |  See [docs](https://docs.amberdata.io/reference#marketrankings) for complete list of filters. | &nbsp; |




##### Examples

```javascript
const rankings = web3data.market.getRankings({ type: "erc721",
sortType: "uniqueAddresses"
})
```


##### Returns


-  The market rankings data and total number of records.





#### getFeatures(features, filterOptions)


Retrieves the list of supported details by feature.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| features |  |  The features for which to get supported details. Features: `pairs`, `exchanges`, `ohlcv`, `prices`, `tickers`. | &nbsp; |
| filterOptions |  |  The filter options. | &nbsp; |
| filterOptions.exchange |  |  Filter by exchange. | &nbsp; |
| filterOptions.pair |  | filter]  By specific pairs. | &nbsp; |




##### Examples

```javascript
// Single feature, filter by exchange await web3data.market.getFeatures('pairs', {exchange: 'gdax'})

// Multiple features, filter by pair
await web3data.market.getFeatures(['exchanges', 'tickers'], {pair: 'btc_usd'})
```


##### Returns


-  The list of supported details by feature.





#### getOhlcv(pair, filterOptions)


Retrieves the latest open-high-low-close for the specified pair.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| pair |  |  The market pair for which to retrieve openhighlowclose. | &nbsp; |
| filterOptions |  |  See [docs](https://docs.amberdata.io/reference#gethistoricalohlc) for complete list of filters. | &nbsp; |




##### Examples

```javascript
// Latest const latestOhlcv = await web3data.market.getOhlcv('eth_btc', {exchange: 'bitfinex'})

// Historical (1 day ago)
const histOhlcv = await web3data.market.getOhlcv('btc_usd', {startDate: Math.round((Date.now() - 86400000) /1000)})
```


##### Returns


-  The ohlcv data.





#### getOrders(pair, exchange, filterOptions)


Retrieves the order book data for the specified pair.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| pair |  |  The market pair for which to retrieve order book data. | &nbsp; |
| exchange |  |  The exchange(s) for which to retrieve order book data. | &nbsp; |
| filterOptions |  |  See [docs](https://docs.amberdata.io/reference#getmarketorders) for complete list of filters. | &nbsp; |




##### Examples

```javascript
const orders = await web3data.market.getOrders('eth_usd', ['bitfinex', 'bitstamp'], {timeFormat: 'iso'})
```


##### Returns


-  The latest order book data for the specified pair/exchange(s).





#### getOrderBooks(pair, filterOptions)


Retrieves order book update events.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| pair |  |  The market pair for which to retrieve the historical best bid and offer data. | &nbsp; |
| filterOptions |  |  See [docs](https://docs.amberdata.io/reference#orderbookupdates) for complete list of filters. | &nbsp; |




##### Examples

```javascript
const orderBooks = await web3data.market.getOrderBooks('btc_usd')
```


##### Returns


-  The order book update data.





#### getBbos(pair, filterOptions)


Retrieves the latest or historical best bid and offer data for the specified pair and exchange (if specified).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| pair |  |  The market pair for which to retrieve the latest best bid and offer data. | &nbsp; |
| filterOptions |  |  The filter options See [docs](https://docs.amberdata.io/reference#getmarketordersbestbidoffer) for more details. | &nbsp; |
| filterOptions.exchange |  |  Only return data for the given exchanges (comma separated). | &nbsp; |
| filterOptions.pair |  |  Only return data for the given pairs (comma separated). | &nbsp; |
| filterOptions.startDate |  |  Filter by pairs after this date. | &nbsp; |
| filterOptions.endDate |  |  Filter by pairs before this date. | &nbsp; |




##### Examples

```javascript
// Latest const latestBbos = await web3data.market.getBbos('eth_btc')

// Historical (1 day ago)
const histBbos = await web3data.market.getBbos('eth_btc', {startDate: Math.round((Date.now() - 86400000) /1000)})
```


##### Returns


-  The latest or historical best bid and offer data indexed by exchange.





#### getPrices(base, filterOptions)


Retrieves the historical prices for the specified asset.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| base |  |  The base of a pair to retrieve the price. Example: If pair is "eth_usd", then base is "eth". | &nbsp; |
| filterOptions |  |  The filter options. See [docs](https://docs.amberdata.io/reference#marketpriceslatest) for more details. | &nbsp; |




##### Examples

```javascript
// Latest const latestPrices = await web3data.market.getPrices('eth')

// Historical (1 day ago)
const histPrices = await web3data.market.getPrices('eth', {startDate:  Math.round((Date.now() - 86400000) /1000)})
```


##### Returns


-  The latest or historical market prices indexed by pair.





#### getVwap(base, filterOptions)


Retrieves the latest VWAP & TWAP price for the specified base.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| base |  |  The base of a pair to retrieve the price. Example: If pair is "eth_usd", then base is "eth". | &nbsp; |
| filterOptions |  |  The filter options. See [docs](https://docs.amberdata.io/reference#getcurrentvwaptwapprice) for more details. | &nbsp; |




##### Examples

```javascript
const wapData = await web3data.market.getVwap('eth', {quote: 'usd'})
```


##### Returns


-  The latest VWAP & TWAP pricing data.





#### getTickers(pair, filterOptions)


Retrieves the latest or historical market tickers.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| pair |  |  The market pair for which to retrieve market tickers. | &nbsp; |
| filterOptions |  |  The filter options. See [docs](https://docs.amberdata.io/reference#getcurrentvwaptwapprice) for more details. | &nbsp; |
| filterOptions.exchange |  |  Only return data for the given exchanges (comma separated). | &nbsp; |
| filterOptions.startDate |  |  Filter by ticker pairs after this date. | &nbsp; |
| filterOptions.endDate |  |  Filter by ticker pairs before this date. | &nbsp; |




##### Examples

```javascript
//Latest const latestTickers = await web3data.market.getTickers('eth_btc')

//Historical
const histTickers = await web3data.market.getTickers('eth_btc', {startDate:  Date.now() - 86400000})
```


##### Returns


-  The latest or historical market ticker data.





#### getTrades(pair, filterOptions)


Retrieves the historical (time series) trade data for the specified pair.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| pair |  |  The market pair for which to retrieve market trades. | &nbsp; |
| filterOptions |  |  The filter options. See [docs](https://docs.amberdata.io/reference#markettrades) for more details. | &nbsp; |




##### Examples

```javascript
const trades = web3data.market.getTrades('eth_usd', {exchange: 'bitstamp'})
```


##### Returns


-  The historical (time series) trade data.





#### getAssetAddresses(assets)


Retrieves the address on the blockchain (if available) of the specified asset.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| assets |  |  The asset(s) to get the address of. | &nbsp; |




##### Examples

```javascript
const batTokenAddress = web3data.market.getAssetAddresses('bat') const assetAddresses = web3data.market.getAssetAddresses(['bat', 'rep'])
```


##### Returns


-  The address(es) of the asset(s).





### src/signature.js



#### Class: Signature


Contains methods pertaining to the `/signatures` endpoint of Amberdata's API.









#### constructor(web3data)


Creates an instance of Signature.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data |  |  The web3data instance. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`





#### getSignature(hash)


Retrieves detailed information about the specified signature hash.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The (keccak 256) of the signature. | &nbsp; |




##### Examples

```javascript
const signatureDetails = await web3data.signature.getSignature('0xe2f0a05a')
```


##### Returns


-  Information pertaining to the specified signature hash.





### src/token.js



#### Class: Token


Contains methods pertaining to the `/tokens` endpoint of Amberdata's API.









#### constructor(web3data)


Creates an instance of Token.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data |  |  The web3data instance. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`





#### getRankings(filterOptions)


Retrieves the top ranked tokens by a specific metric.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions |  |  The filters associated with the request. See [docs](https://docs.amberdata.io/reference#gettokenrankings) for more details. | &nbsp; |




##### Examples

```javascript
const rankings = await web3data.token.getRankings()
```


##### Returns


-  The token rankings.





#### getVolume(hash, filterOptions)


Retrieves the historical volume of token transfers for the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address of the token contract. | &nbsp; |
| filterOptions |  |  The filters associated with the request. See [docs](https://docs.amberdata.io/reference#gettokenvolume) for more details. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Promise.<object>`  The historical volume of token transfers. const tokenVolume = await web3data.token.getVolume('0x06012c8cf97bead5deae237070f9587f8e7a266d').





#### getVelocity(hash, filterOptions)







##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address of the token contract. | &nbsp; |
| filterOptions |  |  The filters associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  





#### getHolders(hash, filterOptions)







##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address for which to retrieve token holders. | &nbsp; |
| filterOptions |  |  The filters associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  





#### getHoldersHistorical(hash, filterOptions)







##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address for which to retrieve token holders. | &nbsp; |
| filterOptions |  |  The filters associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  





#### getSupplies(hash, filterOptions)







##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address for which to retrieve token supplies. | &nbsp; |
| filterOptions |  |  The filters associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  





#### getTransfers(hash, filterOptions)







##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The address for which to retrieve token holders. | &nbsp; |
| filterOptions |  |  The filters associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  





### src/transaction.js



#### Class: Transaction


Contains methods pertaining to the `/address` endpoint of Amberdata's API.
See [documentation](https://docs.amberdata.io/reference#get-all-transactions) details about our transaction endpoints.









#### constructor(web3data)


Creates an instance of Transaction. Meant to be used in conjunction with the Web3Data class.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data |  |  The web3data instance. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`





#### getTransactions(filterOptions)


Retrieves all transactions matching the specified filters.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions |  |  The filter options associated with the request. | &nbsp; |
| filterOptions.status |  |  Filter by the status of the transactions to retrieve (all, completed, failed, pending). | &nbsp; |
| filterOptions.includePrice |  |  Indicates whether or not to include price data with the results. | &nbsp; |




##### Examples

```javascript
const transactions = await web3data.transaction.getTransactions() 
// Include pricing data with transactions
const transactions = await web3data.transaction.getTransactions({
includePrice: true
})
```


##### Returns


-  All transactions matched by the specified filters.





#### getAll(filterOptions)


See 'getTransactions' for details.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions |  |  | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`





#### getTransaction(hash, filterOptions)


Retrieves the transaction data for the specified hash.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  |  The transaction hash. | &nbsp; |
| filterOptions |  |  The filter options associated with the request. See [docs](https://docs.amberdata.io/reference#gettransaction) for more details. | &nbsp; |
| filterOptions.validationMethod&#x3D;none |  |  The validation method to be added to the response: `none`, `basic`, `full`. | &nbsp; |
| filterOptions.includePrice&#x3D;true |  |  Indicates whether or not to include price data with the results. | &nbsp; |




##### Examples

```javascript
const transaction = await web3data.transaction.getTransaction('0xd0a5a0912fdf87993b3cebd696f1ee667a8fbbe8fc890a22dcbdf114f36de4cf')
```


##### Returns


-  The data for the specified transaction hash.





#### getPendingTransactions()


Retrieves all pending transaction.






##### Examples

```javascript
const pendingTransactions = await web3data.transaction.getPendingTransactions()
```


##### Returns


-  The pending transactions.





#### getGasPrediction()


Retrieves the latest gas predictions for the transactions.






##### Examples

```javascript
const gasPredictions = await web3data.transaction.getGasPrediction()
```


##### Returns


-  The latest gas predictions for the transactions.





#### getGasPercentiles(filterOptions)


Retrieves the latest gas price percentiles for the transactions.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions |  |  The filter options associated with the request. | &nbsp; |
| filterOptions.numBlocks |  |  Number of past blocks on which to base the percentiles. | &nbsp; |




##### Examples

```javascript
const gasPercentiles = await web3data.transaction.getGasPercentiles()
```


##### Returns


-  The latest gas price percentiles for the transactions.





#### getGasPrice()


Retrieves the latest average gas price. Uses `getGasPrediction` under the hood.






##### Examples

```javascript
const gasPrice = await web3data.transaction.getGasPrice()
```


##### Returns


-  The latest gas price.





#### getVolume(filterOptions)


Retrieves the historical (time series) volume of transactions.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions |  |  The filter options associated with the request. See [docs](https://docs.amberdata.io/reference#gethistoricaltransactionvolume) for more details. | &nbsp; |




##### Examples

```javascript
const volume = await web3data.transaction.getVolume()
```


##### Returns


-  The historical (time series) volume of transactions.





#### getMetrics()


Get metrics for recent confirmed transactions for a given blockchain. Default metrics are over a 24h period.






##### Examples

```javascript
const metrics = await web3data.transaction.getMetrics()
```


##### Returns


-  Metrics for recent confirmed transactions.





### src/utils.js



#### get(web3data, subendpoint, endpoint, hash, pathParam, filterOptions)


Builds the endpoint url to pass to .rawQuery(). Checks for non empties and appends
the appropriate parameter(s) where applicable.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data |  |  Instance on which to call .rawQuery(). | &nbsp; |
| subendpoint |  |  The subendpoint. | &nbsp; |
| endpoint |  |  The endpoint. | &nbsp; |
| hash |  |  The address hash. | &nbsp; |
| pathParam |  |  The path parameter. | &nbsp; |
| filterOptions |  |  The filters associated with a given endpoint. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  Returns a Promise of the rawQuery request from web3data.





#### uuid(data)


Generates a uuid see [this gist]() for more details.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data |  |  | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`





### src/web3data.js



#### Class: Web3DataFactory


Contains common methods used in.









#### constructor(apiKey, options, blockchainId:, -, -)


Creates a Web3Data instance.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| apiKey |  |  The Amberdata api key needed to access data. | &nbsp; |
| options | `object`  | Contains additional configuration options: | &nbsp; |
| blockchainId: |  | specifies the blockchain to get data from | &nbsp; |
| - |  | baseUrl: the base url of API calls | &nbsp; |
| - |  | websocketUrl: the websocket url to use | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`





#### rawQuery(url)


Appends the API base url with the endpoint  url. Then sends an
http request to the Amberdata API endpoint.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| url |  |  The endpoint url with any query/path params if set. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The axios request object.





#### rpc(method, params)


Method used to interact with web3api json rpc endpoints.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| method |  |  The json rpc method to call. | &nbsp; |
| params |  |  The parameters to the json rpc call. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  Returns the json rpc result.





#### Class: Web3Data


Class Web3data contains methods for hitting Amberdata's
API endpoints.









### src/websocket.js



#### Class: WebSocketClient


Wrapper for Web3data websockets.









#### constructor(apiKey, options)


Instantiates the WebSocketClient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| apiKey |  |  | &nbsp; |
| options |  |  | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  





#### connect(callBack)


Connects to the websocket server and inits listeners.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callBack |  |  The method to call once connection process is complete. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`





#### disconnect(callBack)


Destroys WebSocket i.e. Disconnects client and drops reference.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callBack |  | The callback function that executes on close. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`





#### on(An, callback)


Creates a new event listener for the specified event. Registers event and callback function.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| An |  |  Object containing the event name and filters. | &nbsp; |
| callback |  |  The callback function that executes when the specified event is received by the websocket data listener. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`





#### once(An, callback)


Subscribes to the first occurrence of an event then unsubscribes.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| An |  |  Object containing the event name and filters. | &nbsp; |
| callback |  |  The callback function that executes when the specified event is received by the websocket data listener. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`





#### off(An, callback)


Destroys a single event listener. De-registers event and callback function.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| An |  |  Object containing the event name and filters. | &nbsp; |
| callback |  |  The callback function to execute once unsubscribe is complete. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`





*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
