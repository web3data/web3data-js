# [web3data-js](https://github.com/web3data/web3data-js#readme) *0.5.11*

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
| web3data |  | - The web3data instance. | &nbsp; |




##### Examples

```javascript

```


##### Returns


- `Void`



#### Address.getAllAddresses(filterOptions) 

Returns every address that has been seen on the network.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions |  | - The filters associated with the request. | &nbsp; |
| filterOptions.hash |  | - Filter by a specific address. | &nbsp; |
| filterOptions.size |  | - The size of the response. <b>Default:</b> `100`. | &nbsp; |




##### Examples

```javascript
web3data.address.getAllAddresses({ size: 100,
})
```


##### Returns


-  Containing an object with an array of objects containing. See [API docs](https://docs.amberdata.io/reference#get-all-addresses) for details on return.



#### Address.getInternalMessages(hash, filterOptions) 

Retrieves the functions (aka internal messages) where this address is either the originator or a recipient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  | - The address of the account. | &nbsp; |
| filterOptions |  | - The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The balance data of the account or if no address is found.



#### Address.getFunctions(hash, filterOptions) 

Retrieves the functions (aka internal messages) where this address is either the originator or a recipient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  | - The address of the account. | &nbsp; |
| filterOptions |  | - The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The balance data of the account or if no address is found.



#### Address.getLogs(hash, filterOptions) 

Retrieves the logs for the transactions where this address is either the originator or a recipient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  | - The address of the account. | &nbsp; |
| filterOptions |  | - The filter options associated with the request. | &nbsp; |




##### Examples

```javascript
web3data.getLogs('0x...')
```


##### Returns


-  Promise object containing the array of logs.



#### Address.getTransactions(hash, filterOptions) 

Retrieves the transactions where this address was either the originator or a recipient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  | - The address of the account. | &nbsp; |
| filterOptions |  | - The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The object containing the array of transaction objects.



#### Address.getPendingTransactions(hash, filterOptions) 

Retrieves pending transactions the specified address is involved in.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  | - The address of the account. | &nbsp; |
| filterOptions |  | - The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The array of pending transactions.



#### Address.getBalance(hash, filterOptions) 

Retrieves the latest or historical balance data of the given address depending upon
Returns null if no address is found.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  | - the address of the account | &nbsp; |
| filterOptions |  | - the filter options associated with the request | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  the balance data of the account or if no address is found.



#### Address.getLatestBalance(hash, filterOptions) 

Retrieves the latest balance data of the given address. Returns null if no address is found.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  | - The address of the account. | &nbsp; |
| filterOptions |  | - The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The balance data of the account or if no address is found.



#### Address.getHistoricalBalance(hash, filterOptions) 

Retrieves the historical balance data of the given address. Returns null if no address is found.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  | - The address of the account. | &nbsp; |
| filterOptions |  | - The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The historical balance data of the account or if no address is found.



#### Address.getMultipleBalances(hashes, filterOptions) 

Retrieves the latest account and token balances for the specified address(es).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hashes |  | - The array or string containing the address(es) of the account. | &nbsp; |
| filterOptions |  | - The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The balance data of the account(s).



#### Address.getBalances(hash, filterOptions) 

Retrieves the latest account and token balances for the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  | - The address of the account. | &nbsp; |
| filterOptions |  | - The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The balance data of the account.



#### Address.getBalancesBatch(hashes, filterOptions) 

Retrieves the latest account and token balances for the specified addresses.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hashes |  | - The array containing the address(es) of the account. | &nbsp; |
| filterOptions |  | - The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The balance data of the account(s).



#### Address.getTokens(hash, filterOptions) 

Retrieves the balance data of the given address. Returns null if no address is found.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  | - The address of the account. | &nbsp; |
| filterOptions |  | - The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The token balance data of the account.



#### Address.getTokenTransfers(hash, filterOptions) 

Retrieves all token transfers involving the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash |  | - The address of the account. | &nbsp; |
| filterOptions |  | - The filter options associated with the request. | &nbsp; |




##### Examples

```javascript

```


##### Returns


-  The object containing the array of token transfer objects.




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



#### getOrders(pair, filterOptions) 

Retrieves the order book data for the specified pair.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| pair |  | - The market pair for which to retrieve order book data. | &nbsp; |
| filterOptions |  | - See [docs](https://docs.amberdata.io/reference#get-market-orders) for complete list of filters. | &nbsp; |




##### Examples

```javascript
const orders = await web3data.market.getOrders('eth_usd', ['bitfinex', 'bitstamp'], {timeFormat: 'iso'}) TODO: Add required param exchange
```


##### Returns


-  



#### getOrderBooks(pair[, filterOptions]) 

Retrieves order book update events.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| pair | `string`  | - The market pair for which to retrieve the historical best bid and offer data. | &nbsp; |
| filterOptions | `object`  | - See [docs](https://docs.amberdata.io/reference#order-book-updates) for complete list of filters. | *Optional* |




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




### src/utils.js


#### get(web3data, subendpoint, endpoint, hash, pathParam, filterOptions) 

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




### src/web3data.js


#### new Web3DataFactory() 

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




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
