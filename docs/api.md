# [web3data-js](https://github.com/web3data/web3data-js#readme) *0.6.5*

> A javascript wrapper for accessing amberdata&#x27;s public API.


### src/address.js


#### new Address() 

Contains methods pertaining to the `/address` endpoint of Amberdata's API.






##### Returns


- `Void`



#### Address.constructor(web3data) 

Creates an instance of Address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data | `object`  | - The web3data instance. | &nbsp; |




##### Examples

```javascript
const address = new Address(new Web3Data('API_KEY'))
```


##### Returns


- `Void`



#### Address.getAllAddresses([filterOptions]) 

Alias of getAll().




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions | `object`  | - The filters associated with the request. | *Optional* |




##### Examples

```javascript
const addresses = web3data.address.getAllAddresses({
size: 100,
})
```


##### Returns


- `Promise.&lt;Array&gt;`  Containing an object with an array of objects containing.



#### Address.getAll([filterOptions]) 

Returns every address that has been seen on the network.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions | `object`  | - The filters associated with the request. | *Optional* |
| filterOptions.hash | `string`  | - Filter by a specific address. | *Optional* |
| filterOptions.size | `number`  | - The size of the response. <b>Default:</b> `100`. | *Optional* |




##### Examples

```javascript
const addresses = await web3data.address.getAll({
size: 100,
})
```


##### Returns


- `Promise.&lt;Array&gt;`  Containing an object with an array of objects containing. See [API docs](https://docs.amberdata.io/reference#get-all-addresses) for details on response.



#### Address.getInformation(hash[, filterOptions]) 

Retrieves information about the specified address: network(s) and blockchain(s) this address exist within.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address of the account. | &nbsp; |
| filterOptions | `object`  | - The filter options associated with the request. See [docs](https://docs.amberdata.io/reference#get-account-information) for more details. | *Optional* |




##### Examples

```javascript
const info = await web3data.address.getInformation('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


- `Promise.&lt;object&gt;`  The information about the specified address.



#### Address.getMetadata(hash[, filterOptions]) 

Retrieves statistics about the specified address: balances, holdings, etc.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address of the account. | &nbsp; |
| filterOptions | `object`  | - The filter options associated with the request. | *Optional* |




##### Examples

```javascript
const metadata = await web3data.address.getMetadata('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


- `Promise.&lt;Array&gt;`  The statistics about the specified address.



#### Address.getAdoption(hash[, filterOptions]) 

Retrieves the historical adoption for the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address of the account. | &nbsp; |
| filterOptions | `object`  | - The filters associated with the request. See [API docs](https://docs.amberdata.io/reference#get-address-adoption) for details. | *Optional* |




##### Examples

```javascript
const adoption = await web3data.address.getAdoption('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


- `Promise.&lt;object&gt;`  The historical adoption data for the specified address.



#### Address.getInternalMessages(hash[, filterOptions]) 

Retrieves the functions (aka internal messages) where this address is either the originator or a recipient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address of the account. | &nbsp; |
| filterOptions | `object`  | - The filter options associated with the request. | *Optional* |




##### Examples

```javascript
const internalMessages = await web3data.address.getInternalMessages('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


- `Promise.&lt;object&gt;`  The balance data of the account or if no address is found.



#### Address.getFunctions(hash[, filterOptions]) 

Retrieves the functions (aka internal messages) where this address is either the originator or a recipient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address of the account. | &nbsp; |
| filterOptions | `object`  | - The filter options associated with the request. | *Optional* |




##### Examples

```javascript
const functions = await web3data.address.getFunctions('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


-  {Promise<object>}The balance data of the account or if no address is found.



#### Address.getLogs(hash[, filterOptions]) 

Retrieves the logs for the transactions where this address is either the originator or a recipient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address of the account. | &nbsp; |
| filterOptions | `object`  | - The filter options associated with the request. | *Optional* |




##### Examples

```javascript
const logs = await web3data.address.getLogs('0x...')
```


##### Returns


-  {Promise<object>}Promise object containing the array of logs.



#### Address.getTransactions(hash[, filterOptions]) 

Retrieves the transactions where this address was either the originator or a recipient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address of the account. | &nbsp; |
| filterOptions | `object`  | - The filter options associated with the request. See [docs](https://docs.amberdata.io/reference#get-address-transactions) for more details. | *Optional* |




##### Examples

```javascript
const transactions = await web3data.address.getTransactions('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


- `Promise.&lt;object&gt;`  The object containing the array of transaction objects.



#### Address.getPendingTransactions(hash[, filterOptions]) 

Retrieves pending transactions the specified address is involved in.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address of the account. | &nbsp; |
| filterOptions | `object`  | - The filter options associated with the request. See [docs](https://docs.amberdata.io/reference#address-pending-transactions) for more details. | *Optional* |




##### Examples

```javascript
const pendingTransactions = await web3data.address.getPendingTransactions('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


- `Promise.&lt;object&gt;`  The array of pending transactions.



#### Address.getBalance(hash[, filterOptions]) 

Retrieves the latest or historical balance data of the given address depending upon the specified filter options.
Returns null if no address is found.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address of the account. | &nbsp; |
| filterOptions | `object`  | - The filter options associated with the request. See [docs](https://docs.amberdata.io/reference#get-current-account-balance) for more details. | *Optional* |
| filterOptions.includeTokens&#x3D;false | `object`  | - Return the token balances that the address is holding. | *Optional* |




##### Examples

```javascript
const balance = await web3data.address.getBalance('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


- `Promise.&lt;object&gt;`  The balance data of the account or if no address is found.



#### Address.getTokens(hash[, filterOptions]) 

Retrieves the balance data of the given address. Returns null if no address is found.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address of the account. | &nbsp; |
| filterOptions | `object`  | - The filter options associated with the request. See [docs](https://docs.amberdata.io/reference#address-tokens) for more details. | *Optional* |




##### Examples

```javascript
const tokens = await web3data.addresses.getTokens('0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be')
```


##### Returns


- `Promise.&lt;Array&gt;`  The token balance data of the account.



#### Address.getTokenTransfers(hash[, filterOptions]) 

Retrieves all token transfers involving the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address of the account. | &nbsp; |
| filterOptions | `object`  | - The filter options associated with the request. | *Optional* |




##### Examples

```javascript
const tokenTransfers = await web3data.addresses.getTokenTransfers('0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be')
```


##### Returns


- `Promise.&lt;Array&gt;`  The object containing the array of token transfer objects.



#### Address.getTokenBalances(hash[, filterOptions]) 

Retrieves the historical (time series) token balances for the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address of the account. | &nbsp; |
| filterOptions | `object`  | - The filter options associated with the request. | *Optional* |




##### Examples

```javascript
const tokenBalances = await web3data.addresses.getTokenBalances('0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be')
```


##### Returns


- `Promise.&lt;Array&gt;`  The historical (time series) token balances for the specified address.



#### Address.getUsage(hash[, filterOptions]) 

Retrieves the historical usage for the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address of the account. | &nbsp; |
| filterOptions | `object`  | - The filters associated with the request. See [API docs](https://docs.amberdata.io/reference#get-address-usage) for details. | *Optional* |




##### Examples

```javascript
const usage = await web3data.address.getUsage('0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be')
```


##### Returns


- `Promise.&lt;object&gt;`  The usage statistics for the specified address.



#### Address.getMetrics() 

Get metrics for all addresses that have exist publicly for a given blockchain. Default metrics are for Ethereum over a 24h period.






##### Examples

```javascript
const metrics = await web3data.address.getMetrics('0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be')
```


##### Returns


- `Promise.&lt;object&gt;`  The address metrics.




### src/bch.js


#### new Bch()  *private method*

Class for all Bitcoin Cash based methods.






##### Returns


- `Void`




### src/bsv.js


#### new Bsv()  *private method*

Class for all Bitcoin SV based methods.






##### Returns


- `Void`




### src/btc.js


#### new Btc()  *private method*

Class for all Bitcoin based methods.






##### Returns


- `Void`




### src/block.js


#### getBlock(id, filterOptions) 

Retrieves the blocks specified by its id (number or hash).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id |  | - The number or hash of the block for which to retrieve block information. | &nbsp; |
| filterOptions |  | - | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  




### src/contract.js


#### new Contract() 

Contains methods pertaining to the `/contracts` endpoint of Amberdata's API.






##### Returns


- `Void`



#### Contract.constructor(web3data) 

Creates an instance of Contract.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data |  | - The web3data instance. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`



#### Contract.getDetails(hash) 

Retrieves all the detailed information for the specified contract (ABI, bytecode, sourcecode...).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address. | &nbsp; |




##### Examples

```javascript
const details = await web3data.contract.getDetails('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


- `Promise.&lt;object&gt;`  The detailed information for the specified contract.



#### Contract.getFunctions(hash) 

Retrieves the functions of the specified contract (if available). If not available on chain, the byte code is decompiled and a list of functions is extracted from it.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The contract address. | &nbsp; |




##### Examples

```javascript
const functions = await web3data.contract.getFunctions('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


- `Promise.&lt;object&gt;`  The functions or decompiled functions of the specified contract.



#### Contract.getAudit(hash) 

Alias for getSecurityAudit.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The contract address. | &nbsp; |




##### Examples

```javascript
const signatureDetails = await web3data.signature.getAudit('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


- `Promise.&lt;object&gt;`  The vulnerabilities audit for the specified contract.



#### Contract.getSecurityAudit(hash) 

Retrieves the vulnerabilities audit for the specified contract (if available).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The contract address. | &nbsp; |




##### Examples

```javascript
const audit = await web3data.contract.getSecurityAudit('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


- `Promise.&lt;object&gt;`  The vulnerabilities audit for the specified contract.



#### Contract.getAbi(hash) 

Retrieves the contract's abi.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The contract address. | &nbsp; |




##### Examples

```javascript
const abi = await web3data.contract.getAbi('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


- `Promise.&lt;object&gt;`  The abi of the contract.



#### Contract.getSourceCode(hash) 

Retrieves the contract's source code.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The contract address. | &nbsp; |




##### Examples

```javascript
const source = await web3data.contract.getSourceCode('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


- `Promise.&lt;object&gt;`  The source of the contract.



#### Contract.getCode(hash) 

Returns the contract's bytecode.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The contract address. | &nbsp; |




##### Examples

```javascript
const code = await web3data.contract.getCode('0x06012c8cf97bead5deae237070f9587f8e7a266d')
```


##### Returns


- `Promise.&lt;object&gt;`  The contract's bytecode.




### src/eth.js


#### new Eth()  *private method*

Class for all Ethereum based methods.






##### Returns


- `Void`




### src/ltc.js


#### new Ltc()  *private method*

Class for all Litecoin based methods.






##### Returns


- `Void`




### src/market.js


#### new Market() 

Contains methods pertaining to the `/market` endpoint of Amberdata's API.






##### Returns


- `Void`



#### Market.constructor(web3data) 

Creates an instance of the Market class.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data |  | - The web3data instance. | &nbsp; |




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
| filterOptions |  | - See [docs](https://docs.amberdata.io/reference#market-rankings) for complete list of filters. | &nbsp; |




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
| features |  | - The features for which to get supported details. Features: `pairs`, `exchanges`, `ohlcv`, `prices`, `tickers`. | &nbsp; |
| filterOptions |  | - The filter options. | &nbsp; |
| filterOptions.exchange |  | - Filter by exchange. | &nbsp; |
| filterOptions.pair |  | filter] - By specific pairs. | &nbsp; |




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
| pair |  | - The market pair for which to retrieve open-high-low-close. | &nbsp; |
| filterOptions |  | - See [docs](https://docs.amberdata.io/reference#get-historical-ohlc) for complete list of filters. | &nbsp; |




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
| pair |  | - The market pair for which to retrieve order book data. | &nbsp; |
| exchange |  | - The exchange(s) for which to retrieve order book data. | &nbsp; |
| filterOptions |  | - See [docs](https://docs.amberdata.io/reference#get-market-orders) for complete list of filters. | &nbsp; |




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
| pair |  | - The market pair for which to retrieve the historical best bid and offer data. | &nbsp; |
| filterOptions |  | - See [docs](https://docs.amberdata.io/reference#order-book-updates) for complete list of filters. | &nbsp; |




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
| pair |  | - The market pair for which to retrieve the latest best bid and offer data. | &nbsp; |
| filterOptions |  | - The filter options See [docs](https://docs.amberdata.io/reference#get-market-orders-best-bid-offer) for more details. | &nbsp; |
| filterOptions.exchange |  | - Only return data for the given exchanges (comma separated). | &nbsp; |
| filterOptions.pair |  | - Only return data for the given pairs (comma separated). | &nbsp; |
| filterOptions.startDate |  | - Filter by pairs after this date. | &nbsp; |
| filterOptions.endDate |  | - Filter by pairs before this date. | &nbsp; |




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
| base |  | - The base of a pair to retrieve the price. Example: If pair is "eth_usd", then base is "eth". | &nbsp; |
| filterOptions |  | - The filter options. See [docs](https://docs.amberdata.io/reference#market-prices-latest) for more details. | &nbsp; |




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
| base |  | - The base of a pair to retrieve the price. Example: If pair is "eth_usd", then base is "eth". | &nbsp; |
| filterOptions |  | - The filter options. See [docs](https://docs.amberdata.io/reference#get-current-vwaptwap-price) for more details. | &nbsp; |




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
| pair |  | - The market pair for which to retrieve market tickers. | &nbsp; |
| filterOptions |  | - The filter options. See [docs](https://docs.amberdata.io/reference#get-current-vwaptwap-price) for more details. | &nbsp; |
| filterOptions.exchange |  | - Only return data for the given exchanges (comma separated). | &nbsp; |
| filterOptions.startDate |  | - Filter by ticker pairs after this date. | &nbsp; |
| filterOptions.endDate |  | - Filter by ticker pairs before this date. | &nbsp; |




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
| pair |  | - The market pair for which to retrieve market trades. | &nbsp; |
| filterOptions |  | - The filter options. See [docs](https://docs.amberdata.io/reference#market-trades) for more details. | &nbsp; |




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
| assets |  | - The asset(s) to get the address of. | &nbsp; |




##### Examples

```javascript
const batTokenAddress = web3data.market.getAssetAddresses('bat') const assetAddresses = web3data.market.getAssetAddresses(['bat', 'rep'])
```


##### Returns


-  The address(es) of the asset(s).




### src/signature.js


#### new Signature() 

Contains methods pertaining to the `/signatures` endpoint of Amberdata's API.






##### Returns


- `Void`



#### Signature.constructor(web3data) 

Creates an instance of Signature.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data | `object`  | - The web3data instance. | &nbsp; |




##### Examples

```javascript
new Signature(new Web3Data('API_KEY'))
```


##### Returns


- `Void`



#### Signature.getSignature(hash) 

Retrieves detailed information about the specified signature hash.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The (keccak 256) of the signature. | &nbsp; |




##### Examples

```javascript
const signatureDetails = await web3data.signature.getSignature('0xe2f0a05a')
```


##### Returns


- `Promise.&lt;Array&gt;`  Information pertaining to the specified signature hash.




### src/transaction.js


#### new Transaction() 

Contains methods pertaining to the `/address` endpoint of Amberdata's API.
See [documentation](https://docs.amberdata.io/reference#get-all-transactions) details about our transaction endpoints.






##### Returns


- `Void`



#### Transaction.constructor(web3data) 

Creates an instance of Transaction. Meant to be used in conjunction with the Web3Data class.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data |  | - The web3data instance. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`



#### Transaction.getTransactions(filterOptions) 

Retrieves all transactions matching the specified filters.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions |  | - The filter options associated with the request. | &nbsp; |
| filterOptions.status |  | - Filter by the status of the transactions to retrieve (all, completed, failed, pending). | &nbsp; |
| filterOptions.includePrice |  | - Indicates whether or not to include price data with the results. | &nbsp; |




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



#### Transaction.getAll(filterOptions) 

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



#### Transaction.getTransaction(hash, filterOptions) 

Retrieves the transaction data for the specified hash.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  | - The transaction hash. | &nbsp; |
| filterOptions |  | - The filter options associated with the request. See [docs](https://docs.amberdata.io/reference#get-transaction) for more details. | &nbsp; |
| filterOptions.validationMethod&#x3D;none |  | - The validation method to be added to the response: `none`, `basic`, `full`. | &nbsp; |
| filterOptions.includePrice&#x3D;true |  | - Indicates whether or not to include price data with the results. | &nbsp; |




##### Examples

```javascript
const transaction = await web3data.transaction.getTransaction('0xd0a5a0912fdf87993b3cebd696f1ee667a8fbbe8fc890a22dcbdf114f36de4cf')
```


##### Returns


-  The data for the specified transaction hash.



#### Transaction.getPendingTransactions() 

Retrieves all pending transaction.






##### Examples

```javascript
const pendingTransactions = await web3data.transaction.getPendingTransactions()
```


##### Returns


-  The pending transactions.



#### Transaction.getGasPrediction() 

Retrieves the latest gas predictions for the transactions.






##### Examples

```javascript
const gasPredictions = await web3data.transaction.getGasPrediction()
```


##### Returns


-  The latest gas predictions for the transactions.



#### Transaction.getGasPercentiles(filterOptions) 

Retrieves the latest gas price percentiles for the transactions.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions |  | - The filter options associated with the request. | &nbsp; |
| filterOptions.numBlocks |  | - Number of past blocks on which to base the percentiles. | &nbsp; |




##### Examples

```javascript
const gasPercentiles = await web3data.transaction.getGasPercentiles()
```


##### Returns


-  The latest gas price percentiles for the transactions.



#### Transaction.getGasPrice() 

Retrieves the latest average gas price. Uses `getGasPrediction` under the hood.






##### Examples

```javascript
const gasPrice = await web3data.transaction.getGasPrice()
```


##### Returns


-  The latest gas price.



#### Transaction.getVolume(filterOptions) 

Retrieves the historical (time series) volume of transactions.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions |  | - The filter options associated with the request. See [docs](https://docs.amberdata.io/reference#get-historical-transaction-volume) for more details. | &nbsp; |




##### Examples

```javascript
const volume = await web3data.transaction.getVolume()
```


##### Returns


-  The historical (time series) volume of transactions.



#### Transaction.getMetrics(filterOptions) 

Get metrics for recent confirmed transactions for a given blockchain. Default metrics are over a 24h period.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions |  |  | &nbsp; |




##### Examples

```javascript
const metrics = await web3data.transaction.getMetrics()
```


##### Returns


-  Metrics for recent confirmed transactions.




### src/token.js


#### new Token() 

Contains methods pertaining to the `/tokens` endpoint of Amberdata's API.






##### Returns


- `Void`



#### Token.constructor(web3data) 

Creates an instance of Token.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data | `Web3Data`  | - The web3data instance. | &nbsp; |




##### Examples

```javascript
const token = new Token(new Web3data('API_KEY'))
```


##### Returns


- `Void`



#### Token.getRankings([filterOptions]) 

Retrieves the top ranked tokens by a specific metric.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions | `object`  | - The filters associated with the request. See [docs](https://docs.amberdata.io/reference#get-token-rankings) for more details. | *Optional* |




##### Examples

```javascript
const rankings = await web3data.token.getRankings()
```


##### Returns


- `Promise.&lt;object&gt;`  The token rankings.



#### Token.getVolume(hash[, filterOptions]) 

Retrieves the historical volume of token transfers for the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address of the token contract. | &nbsp; |
| filterOptions | `object`  | - - The filters associated with the request. See [docs](https://docs.amberdata.io/reference#get-token-volume) for more details. | *Optional* |




##### Examples

```javascript

```


##### Returns


- `Promise.&lt;object&gt;`  The historical volume of token transfers. const tokenVolume = await web3data.token.getVolume('0x06012c8cf97bead5deae237070f9587f8e7a266d').



#### Token.getVelocity(hash[, filterOptions]) 

Retrieves the historical velocity for the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address of the token contract. | &nbsp; |
| filterOptions | `object`  | - The filters associated with the request. See [docs](https://docs.amberdata.io/reference#get-token-velocity) for more details. | *Optional* |




##### Examples

```javascript
const velocity = await web3data.token.getVelocity('0x06012c8cf97bead5deae237070f9587f8e7a266d');
```


##### Returns


- `Promise.&lt;object&gt;`  The historical velocity.



#### Token.getHolders(hash[, filterOptions]) 

Retrieves the latest or historical token holders for the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address for which to retrieve token holders. | &nbsp; |
| filterOptions | `object`  | - The filters associated with the request. See [docs](https://docs.amberdata.io/reference#get-token-velocity) for more details. | *Optional* |
| filterOptions.holderAddresses | `object`  | - The address for which to retrieve token holders. | *Optional* |




##### Examples

```javascript

// Latest
const latestHodlers =  await web3data.token.getHolders('0x06012c8cf97bead5deae237070f9587f8e7a266d');

// Historical
const historicalHodlers =  await web3data.token.getHolders('0x06012c8cf97bead5deae237070f9587f8e7a266d', {holderAddresses: '0xbbf0cc1c63f509d48a4674e270d26d80ccaf6022'});
```


##### Returns


- `Promise.&lt;object&gt;`  The latest or historical token holders for the specified address.



#### Token.getHoldersHistorical(hash[, filterOptions]) 

Retrieves the historical (time series) token holders for the specified token address. If the `holderAddresses` filter is present it will return historical data.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address for which to retrieve token holders. | &nbsp; |
| filterOptions | `object`  | - The filters associated with the request. | *Optional* |




##### Examples

```javascript
const historicalHolders = getHoldersHistorical('0x06012c8cf97bead5deae237070f9587f8e7a266d', {holderAddresses: '0xbbf0cc1c63f509d48a4674e270d26d80ccaf6022'})
```


##### Returns


- `Promise.&lt;object&gt;`  The historical (time series) token holders for the specified token address.



#### Token.getSupplies(hash[, filterOptions]) 

Retrieves the latest or historical token supplies (and derivatives) for the specified address. Use the `startDate` or `endDate` filters to get historical data.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address for which to retrieve token supplies. | &nbsp; |
| filterOptions | `object`  | - The filters associated with the request. See [docs](https://docs.amberdata.io/reference#get-token-supply-latest) for more details. | *Optional* |
| filterOptions.startDate | `number`  | - Filter by token prices after this date - The interval can not exceed 6 months (d), or 30 days (h). | *Optional* |
| filterOptions.endDate | `number`  | - Filter by token prices before this date - The interval can not exceed 6 months (d), or 30 days (h). | *Optional* |




##### Examples

```javascript
// Latest
const latestSupplies = await web3data.token.getSupplies('0x06012c8cf97bead5deae237070f9587f8e7a266d')
// Historical
const historicalSupplies = await t.context.web3data.token.getSupplies('0x06012c8cf97bead5deae237070f9587f8e7a266d', {startDate: 1571011200, endDate: 1571097600, timeFormat: 'iso'})
```


##### Returns


- `Promise.&lt;object&gt;`  The latest or historical token supplies.



#### Token.getTransfers(hash[, filterOptions]) 

Retrieves all token transfers involving the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `string`  | - The address for which to retrieve token transfers. | &nbsp; |
| filterOptions | `object`  | - The filters associated with the request. | *Optional* |




##### Examples

```javascript
const transfers = await web3data.token.getTransfers('0x06012c8cf97bead5deae237070f9587f8e7a266d', {validationMethod: 'full'})
```


##### Returns


- `Promise.&lt;Array&gt;`  All token transfers involving the specified address.




### src/web3data.js


#### new Web3DataFactory()  *private method*

Contains common methods used in.






##### Returns


- `Void`



#### Web3DataFactory.constructor(apiKey, options, blockchainId:, -, -) 

Creates a Web3Data instance.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| apiKey |  | - The Amberdata api key needed to access data. | &nbsp; |
| options | `object`  | Contains additional configuration options: | &nbsp; |
| blockchainId: |  | specifies the blockchain to get data from | &nbsp; |
| - |  | baseUrl: the base url of API calls | &nbsp; |
| - |  | websocketUrl: the websocket url to use | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`



#### Web3DataFactory.rawQuery(url) 

Appends the API base url with the endpoint  url. Then sends an
http request to the Amberdata API endpoint.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| url |  | - The endpoint url with any query/path params if set. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The axios request object.



#### Web3DataFactory.rpc(method, params) 

Method used to interact with web3api json rpc endpoints.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| method |  | - The json rpc method to call. | &nbsp; |
| params |  | - The parameters to the json rpc call. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  Returns the json rpc result.



#### new Web3Data() 

Class Web3data contains methods for hitting Amberdata's
API endpoints.






##### Returns


- `Void`




### src/websocket.js


#### formatJsonRpc(options)  *private method*

Creates a string in json rpc format.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| options |  | - The json rpc options. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The json rpc formatted string.



#### responseType(message)  *private method*

Returns enum corresponding to the response type.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| message |  | - The response message from the server. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The response type (see constants above).



#### new WebSocketClient() 

Wrapper for Web3data websockets.






##### Returns


- `Void`



#### WebSocketClient.constructor(apiKey, options) 

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



#### WebSocketClient.connect(callBack) 

Connects to the websocket server and inits listeners.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callBack |  | - The method to call once connection process is complete. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`



#### WebSocketClient.disconnect(callBack) 

Destroys WebSocket i.e. Disconnects client and drops reference.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callBack |  | -The callback function that executes on close. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`



#### WebSocketClient.on(An, callback) 

Creates a new event listener for the specified event. Registers event and callback function.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| An |  | - Object containing the event name and filters. | &nbsp; |
| callback |  | - The callback function that executes when the specified event is received by the websocket data listener. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`



#### WebSocketClient.once(An, callback) 

Subscribes to the first occurrence of an event then unsubscribes.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| An |  | - Object containing the event name and filters. | &nbsp; |
| callback |  | - The callback function that executes when the specified event is received by the websocket data listener. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`



#### WebSocketClient.off(An, callback) 

Destroys a single event listener. De-registers event and callback function.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| An |  | - Object containing the event name and filters. | &nbsp; |
| callback |  | - The callback function to execute once unsubscribe is complete. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`



#### WebSocketClient._reconnect()  *private method*

Initiates a reconnect given the following conditions:
1. Initial connection doesnt respond within 5 seconds.
2. Connection doesn't get any event within 3 minutes,
and has at least 1 successful subscription.
3. We got a socket error of any kind, see above.






##### Examples

```javascript

```


##### Returns


- `Void`



#### WebSocketClient._refreshSubscriptions()  *private method*

Loops through each registry item and sends subscription message.






##### Examples

```javascript

```


##### Returns


- `Void`



#### WebSocketClient._listen()  *private method*

Sets up the on message listener.






##### Examples

```javascript

```


##### Returns


- `Void`



#### WebSocketClient._subHandler(data)  *private method*

Handles subscription responses. Registers the server's
given subscription Id.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data |  | - The parsed json data sent from the server. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`



#### WebSocketClient._dataHandler(data)  *private method*

Handles data responses. Calls registered callbacks.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data |  | - The parsed json data sent from the server. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`



#### WebSocketClient._unsubHandler(data)  *private method*

Handles the unsubscription response. Calls the unsubscribe call back registered in the off method then de-registers the event.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data |  | - The parsed json data sent from the server. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`



#### WebSocketClient._subscribe(eventName, filters)  *private method*

Sends subscription message to the websocket connection.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| eventName |  | - The name of the event to subscribe to. | &nbsp; |
| filters |  | - The extra arguments associated with the subscription. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`



#### WebSocketClient._unsubscribe(eventName, filters, id)  *private method*

Sends unsubscription message to the websocket connection.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| eventName |  | - The name of the event to unsubscribe from. | &nbsp; |
| filters |  | - The extra arguments associated with the subscription. | &nbsp; |
| id |  | - The derived uuid. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`




### src/utils.js


#### get(web3data, subendpoint, endpoint, hash, pathParam, filterOptions)  *private method*

Builds the endpoint url to pass to .rawQuery(). Checks for non empties and appends
the appropriate parameter(s) where applicable.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data |  | - Instance on which to call .rawQuery(). | &nbsp; |
| subendpoint |  | - The sub-endpoint. | &nbsp; |
| endpoint |  | - The endpoint. | &nbsp; |
| hash |  | - The address hash. | &nbsp; |
| pathParam |  | - The path parameter. | &nbsp; |
| filterOptions |  | - The filters associated with a given endpoint. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  Returns a Promise of the rawQuery request from web3data.



#### onFulfilled(response)  *private method*

Handler for all request responses.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| response |  | - The Axios response object. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The data from the response.



#### uuid(data)  *private method*

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



#### getMethods(obj)  *private method*

Returns an array of methods defined on the object.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| obj |  | - The object from which get methods. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  An array of method names.



#### ethFactory(web3data)  *private method*

Creates an object containing Ethereum based methods.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data |  | - { object } The web3data instance. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  methods { object } an object containing Ethereum based methods.



#### formatJsonRpc(options)  *private method*

Creates a string in json rpc format.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| options |  | - The json rpc options. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The json rpc formatted string.




### src/xlm.js


#### new Xlm()  *private method*

Class for all Stellar based methods.






##### Returns


- `Void`




### src/zec.js


#### new Zec()  *private method*

Class for all ZCash based methods.






##### Returns


- `Void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
