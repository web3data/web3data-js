![Web3data.js Javascript API](./assets/web3data-js-logo-banner.png)

## Installation
<i>Note that you must have node (and npm) installed.</i>

Using npm:
```bash
npm install web3data-js
```

Using CDN:
```html
<script src="https://unpkg.com/web3data-js/dist/web3data.min.js"></script>
```

## Configuration
Web3data configuration is simple and only requires an API Key upon instantiation.
```javascript
const web3data = new Web3Data('API_KEY')
```

Additionally, you can pass in a config object containing a blockchainId:
```javascript
const web3data = new Web3Data('API_KEY', {
  blockchainId: '1c9c969065fcd1cf' // Ethereum Mainnet
})
```
This will allow you to switch between different blockchain / networks when making
requests via web3data.js.

You can find the full [list of blockchain IDs](https://docs.amberdata.io/reference#blockchain-ids) in our docs.

## Blockchains/Networks
It's possible to the namespace convention to specify which blockchain to use when making requests.
This makes it easier to switch between blockchains as Web3data will automatically set the correct headers under
the hood.

### Ethereum

**Namespace**: `.eth`

##### Example:
```javascript
web3data.eth.address.getBalance('0x734Ac651Dd95a339c633cdEd410228515F97fAfF')
```

### Bitcoin

**Namespace**: `.btc`

<details><summary><b>Supported Methods </b></summary>

<table style="width:100%">
  <tr>
    <th>address</th>
    <th>block</th>
    <th>transaction</th>
  </tr>
  <tr>
    <td>getAllAddresses</td>
    <td>getBlocks</td>
    <td>getTransactions</td>
  </tr>
  <tr>
    <td>getInformation</td>
    <td>getBlock</td>
    <td>getTransaction</td>
  </tr>
  <tr>
    <td>getMetadata</td>
    <td>getBlockNumber</td>
    <td>getPendingTransactions</td>
  </tr>
  <tr>
    <td>getTransactions</td>
    <td>getTransactions</td>
  </tr>
  <tr>
    <td>getPendingTransactions</td>
    <td>getTransactionFromBlock</td>
  </tr>
  <tr>
    <td>getBalance</td>
    <td>getMetrics</td>
  </tr>
  <tr>
    <td>getLatestBalance</td>
  </tr>
  <tr>
    <td>getHistoricalBalance</td>
  </tr>
  <tr>
    <td>getMultipleBalances</td>
  </tr>
  <tr>
    <td>getBalancesBatch</td>
  </tr>
  <tr>
    <td>getMetrics</td>
  </tr>
</table>
</details>

##### Example:
```javascript
web3data.btc.address.getBalance('1MUz4VMYui5qY1mxUiG8BQ1Luv6tqkvaiL')
```

### Litecoin

**Namespace**: `.ltc`


##### Example:
```javascript
web3data.ltc.address.getBalance('LZo1qx6S5JEVh43KahTFBdvnkVFeQCz9Ze')
```

Note: When using the namespaced methods the blockchain Id set during instantiation will be ignored.
