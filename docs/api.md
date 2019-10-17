# [web3data-js](https://github.com/web3data/web3data-js#readme) *0.5.8*

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
| web3data |  |  | &nbsp; |




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
