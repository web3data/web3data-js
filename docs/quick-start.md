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

## Blockchains
It's possible to the namespace convention to specify which blockchain to use when making requests.
This makes it easier to switch between blockchains as Web3data will automatically set the correct headers under
the hood.

```javascript
// Ethereum
web3data.eth.address.getBalance()

// Bitcoin
web3data.eth.address.getBalance()
```

Note: When using the namespaced methods the blockchain Id set during instantiation will be ignored.


