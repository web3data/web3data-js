# [web3data-js](https://github.com/web3data/web3data-js#readme) *0.5.5*

> A javascript wrapper for accessing amberdata&#x27;s public API.


### src/address.js


#### new Address() 

Contains methods pertaining to the `/address` endpoints of Amberdata's API.






##### Returns


- `Void`



#### Address.getAllAddresses(filterOptions) 

Returns every Ethereum address that has been seen on the network.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| filterOptions | `Object`  | The filters associated with the request | &nbsp; |
| filterOptions.size | `string`  | The size of the response. Default: <b>100</b> | *Optional* |




##### Examples

```javascript
web3data.getAllAddresses({
  size: 100,

})
```


##### Returns


- `Object`  Promise containing an object with an array of objects containing. See [API docs](https://docs.amberdata.io/reference#get-all-addresses) for details on return



#### Address.getInternalMessages(hash, filterOptions) 

Retrieves the functions (aka internal messages) where this address is either the originator or a recipient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `String`  | - the address of the account. | &nbsp; |
| filterOptions | `Object`  | - the filter options associated with the request. | &nbsp; |




##### Returns


-  the balance data of the account or if no address is found.



#### Address.getFunctions(hash, filterOptions) 

Retrieves the functions (aka internal messages) where this address is either the originator or a recipient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `String`  | - the address of the account. | &nbsp; |
| filterOptions | `Object`  | - the filter options associated with the request. | &nbsp; |




##### Returns


-  the balance data of the account or if no address is found.



#### Address.getLogs(hash, filterOptions) 

Retrieves the logs for the transactions where this address is either the originator or a recipient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `String`  | - the address of the account | &nbsp; |
| filterOptions | `Object`  | - the filter options associated with the request | &nbsp; |




##### Examples

```javascript
web3data.getLogs('0x...')
```


##### Returns


- `Promise`  Promise object containing the array of logs



#### Address.getTransactions(hash, filterOptions) 

Retrieves the transactions where this address was either the originator or a recipient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `String`  | - the address of the account | &nbsp; |
| filterOptions | `Object`  | - the filter options associated with the request | &nbsp; |




##### Returns


- `Promise.<Object>`  the object containing the array of transaction objects



#### Address.getPendingTransactions(hash, filterOptions) 

Retrieves pending transactions the specified address is involved in.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `String`  | - the address of the account | &nbsp; |
| filterOptions | `Object`  | - the filter options associated with the request | &nbsp; |




##### Returns


- `Promise.<Object>`  the array of pending transactions



#### Address.getBalance(hash, filterOptions) 

Retrieves the latest or historical balance data of the given address depending upon
Returns null if no address is found.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `String`  | - the address of the account | &nbsp; |
| filterOptions | `Object`  | - the filter options associated with the request | &nbsp; |




##### Returns


-  the balance data of the account or if no address is found.



#### Address.getLatestBalance(hash, filterOptions) 

Retrieves the latest balance data of the given address. Returns null if no address is found.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `String`  | - the address of the account | &nbsp; |
| filterOptions | `Object`  | - the filter options associated with the request | &nbsp; |




##### Returns


-  the balance data of the account or if no address is found.



#### Address.getHistoricalBalance(hash, filterOptions) 

Retrieves the historical balance data of the given address. Returns null if no address is found.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `String`  | - the address of the account | &nbsp; |
| filterOptions | `Object`  | - the filter options associated with the request | &nbsp; |




##### Returns


-  the historical balance data of the account or if no address is found.



#### Address.getMultipleBalances(hashes, filterOptions) 

Retrieves the latest account and token balances for the specified address(es).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hashes | `Array` `String`  | - the array or string containing the address(es) of the account | &nbsp; |
| filterOptions | `Object`  | - the filter options associated with the request | &nbsp; |




##### Returns


- `Promise.<Object>`  the balance data of the account(s)



#### Address.getBalances(hash, filterOptions) 

Retrieves the latest account and token balances for the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `String`  | - the address of the account | &nbsp; |
| filterOptions | `Object`  | - the filter options associated with the request | &nbsp; |




##### Returns


- `Promise.<Object>`  the balance data of the account



#### Address.getBalancesBatch(hashes, filterOptions) 

Retrieves the latest account and token balances for the specified addresses.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hashes | `Array` `String`  | - the array containing the address(es) of the account. | &nbsp; |
| filterOptions | `Object`  | - the filter options associated with the request. | &nbsp; |




##### Returns


- `Promise.<Object>`  the balance data of the account(s).



#### Address.getTokens(hash, filterOptions) 

Retrieves the balance data of the given address. Returns null if no address is found.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `String`  | - the address of the account. | &nbsp; |
| filterOptions | `Object`  | - the filter options associated with the request. | &nbsp; |




##### Returns


- `Promise.<Object>`  the token balance data of the account.



#### Address.getTokenTransfers(hash, filterOptions) 

Retrieves all token transfers involving the specified address.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hash | `String`  | - the address of the account | &nbsp; |
| filterOptions | `Object`  | - the filter options associated with the request | &nbsp; |




##### Returns


- `Promise.<Object>`  the object containing the array of token transfer objects.




### src/btc.js


#### new Btc() 

Class for all Bitcoin based methods.






##### Returns


- `Void`




### src/eth.js


#### new Eth() 

Class for all Ethereum based methods.






##### Returns


- `Void`




### src/utils.js


#### get(web3data, subendpoint, endpoint, hash, pathParam, filterOptions) 

Builds the endpoint url to pass to .rawQuery(). Checks for non empties and appends
the appropriate parameter(s) where applicable.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data | `object`  | instance on which to call .rawQuery() | &nbsp; |
| subendpoint | `string`  | The sub-endpoint | &nbsp; |
| endpoint | `string`  | The endpoint | &nbsp; |
| hash | `string`  | The address hash | &nbsp; |
| pathParam | `string`  | The path parameter | &nbsp; |
| filterOptions | `object`  | The filters associated with a given endpoint | &nbsp; |




##### Returns


-  returns a Promise of the rawQuery request from web3data



#### ethFactory(web3data) 

Creates an object containing Ethereum based methods.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| web3data |  | { object } the web3data instance | &nbsp; |




##### Returns


-  methods { object } an object containing Ethereum based methods.




### src/web3data.js


#### constructor(apiKey, options) 

Creates a Web3Data instance




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| apiKey | `string`  | The Amberdata api key needed to access data | &nbsp; |
| options | `object`  | Contains additional configuration options:  - blockchainId: specifies the blockchain to get data from<br> - baseUrl: the base url of API calls<br> - websocketUrl: the websocket url to use | &nbsp; |




##### Returns


- `Void`



#### rawQuery(url) 

Appends the API base url with the endpoint  url. Then sends an
http request to the Amberdata API endpoint.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| url | `string`  | - The endpoint url with any query/path params if set | &nbsp; |




##### Returns


-  the axios request object



#### rpc(method, params) 

Method used to interact with web3api json rpc endpoints.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| method | `string`  | - the json rpc method to call | &nbsp; |
| params | `array` `string`  | - the parameters to the json rpc call | &nbsp; |




##### Returns


- `Promise.<AxiosResponse.<T>>`  returns the json rpc result



#### new Web3Data() 

Class Web3data contains methods for hitting Amberdata's
API endpoints.






##### Returns


- `Void`




### src/websocket.js


#### new WebSocketClient() 

Wrapper for Web3data websockets






##### Returns


- `Void`



#### WebSocketClient.constructor(apiKey, options) 

Instantiates the WebSocketClient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| apiKey |  |  | &nbsp; |
| options |  |  | &nbsp; |




##### Returns


- `WebSocketClient`  



#### WebSocketClient.connect(callBack) 

Connects to the websocket server and inits listeners.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callBack | `function`  | - The method to call once connection process is complete. | &nbsp; |




##### Returns


- `Void`



#### WebSocketClient.disconnect(callBack) 

Destroys WebSocket i.e. disconnects client and drops reference.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callBack | `function`  | -The callback function that executes on close. | &nbsp; |




##### Returns


- `Void`



#### WebSocketClient.on(An, callback) 

Creates a new event listener for the specified event. Registers event and callback function.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| An | `object`  | object containing the event name and filters | &nbsp; |
| callback | `function`  | - The callback function that executes when the specified event is received by the websocket data listener. | &nbsp; |




##### Returns


- `Void`



#### WebSocketClient.once(An, callback) 

Subscribes to the first occurrence of an event then unsubscribes.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| An | `object`  | object containing the event name and filters | &nbsp; |
| callback | `function`  | - The callback function that executes when the specified event is received by the websocket data listener. | &nbsp; |




##### Returns


- `Void`



#### WebSocketClient.off(An, callback) 

Destroys a single event listener. De-registers event and callback function.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| An | `object`  | object containing the event name and filters | &nbsp; |
| callback | `function`  | - The callback function to execute once unsubscribe is complete. | &nbsp; |




##### Returns


- `Void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
