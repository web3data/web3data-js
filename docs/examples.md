# Examples

## Fetching Data

Here's a few examples showing how to get basic bits of blockchain & market data with Web3data.

<pre class="runkit-element">
const Web3Data = require('web3data-js');
const w3d = new Web3Data('YOUR_API_KEY');

</pre>

### Latest and Historical Data
With Web3data you can use the same method for both historical and latest data.
Here's an example where we get the current & historical address balance.

<pre class="runkit-element">
const Web3Data = require("web3data-js")
const w3d = new Web3Data('YOUR_API_KEY')

const currentBalance = await w3d.address.getBalance("0x06012c8cf97bead5deae237070f9587f8e7a266d", {includePrice: true})

const historicalBalance = await w3d.address.getBalance("0x06012c8cf97bead5deae237070f9587f8e7a266d", {startDate: 1556184430})

console.log({currentBalance, historicalBalance})
</pre>

In order to get historical data a `startDate` or `endDate` must be specified.
If you just want historical data without an filters then specify endDate like so:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`{endDate: Date.now()}`

Methods that support this feature:<br>
[`address.getBalance()`]()<br>
[`market.getOhlcv()`]()<br>
[`market.getPrices()`]()<br>
[`market.getTokenPrices()`]()<br>
[`market.getTickers()`]()<br>

## Websockets

### Subscribe to Market orders

<pre class="runkit-element">
const Web3Data = require("web3data-js")

const w3d = new Web3Data(process.env.API_KEY)

// Initialize the connection
w3d.connect()

// Subscribes to market order events
w3d.on({eventName: 'market:orders', filters: {"pair": "eth_btc", "exchange":"gdax"}}, order => {

  // Log the order data
  console.log(order)

  // Terminate the socket connection
  w3d.disconnect()
})
</pre>

### Subscribe to address transactions
<pre class="runkit-element">
const Web3Data = require("web3data-js")

const w3d = new Web3Data('YOUR_API_KEY')

// Initialize the connection
w3d.connect()

// Subscribes to address transaction events                   Bat token
w3d.on({eventName: 'address:transactions', filters: {address: "0x0d8775f648430679a709e98d2b0cb6250d2887ef"}}, transaction => {

  // Log the transaction data
  console.log(transaction)

  // Terminate the socket connection
  w3d.disconnect()
})
</pre>

## RPC
Web3data supports native JSON RPC methods.

<pre class="runkit-element">
const Web3Data = require("web3data-js")
const w3d = new Web3Data('YOUR_API_KEY')

const rawTransaction = await w3d.eth.rpc('eth_getTransactionByHash', "0x49fcde4addd7b32f020988b950eb4b1050268b9140935cc85dae64556ab9f408")
</pre>


Get the latest Bitcoin block.
<pre class="runkit-element">
const Web3Data = require("web3data-js")
const w3d = new Web3Data('YOUR_API_KEY')

const bestBlockHash = await w3d.btc.rpc('getbestblockhash')
</pre>

## Multi-Blockchain / Networks

<pre class="runkit-element">
const Web3Data = require("web3data-js")
const w3d = new Web3Data('YOUR_API_KEY', {
    blockchainId: '1b3f7a72b3e99c13' // ethereum-rinkeby
})

// Retrieves the balance of an Ethereum Rinkeby address
const balanceEthRinkeby = w3d.address.getBalance('0xc94770007dda54cF92009BFF0dE90c06F603a09f')

// Retrieves the balance of an Ethereum Mainnet address
const balanceEth = w3d.eth.address.getBalance('0xc94770007dda54cF92009BFF0dE90c06F603a09f')

// Retrieves the balance of an Bitcoin address
const balanceBtc = w3d.btc.address.getBalance('bc1qq5qjpxlst29l33jcu368xrh24vr2869x8trlrk')

</pre>

See [Quick Start - Blockchains](quick-start.md#blockchains) for more details.

## Send Raw Transaction (Ethereum)

<pre class="runkit-element">
require('dotenv').config(); // Load your environment variables with 'dotenv'
const EthereumTx = require('ethereumjs-tx').Transaction;
const { privateToAddress } = require('ethereumjs-util');
const Web3Data = require("web3data-js");

const w3d = new Web3Data('YOUR_API_KEY');

const TO_ADDRESS = 'YOUR_ADDRESS';
const API_KEY = 'YOUR_API_KEY'; // Need one? see amberdata.io/onboarding
const PRIV_KEY = Buffer.from('YOUR_PRIVATE_KEY', 'hex');

/**
 * Simple method that takes in a nonce and constructs the raw transaction
 * @param nonce the transaction nonce
 * @return {string} the raw transaction data
 */
const createTransactionObject = nonce => {

  // Create the transaction object
  const tx = new EthereumTx({
      nonce: nonce, // <-- Set your nonce value here (should increment for every transaction)
      gasPrice: '0xF0E95B47', // 4041825095 Wei
      gasLimit: '0x5208', // 21000 Wei
      to: TO_ADDRESS,
      value: '0x38D7EA4C68000', // 0.0001Eth | the value to send
    },
    {chain: 'rinkeby'});

  // Sign the transaction with your private key (must set private key in .env file)
  tx.sign(PRIV_KEY);

  // Serialize the transaction (convert to raw data bits) and then convert to hex
  // This is the format that the transaction must be in to send a raw transaction.
  return `0x${tx.serialize().toString('hex')}`;
};

// Derive the sender's public key (address) from the private key
const sender = '0x' + privateToAddress(PRIV_KEY).toString('hex');

(async () => {
    // Send the json rpc request to get the total number of transactions of
  // the sender address (this is used to select the correct nonce).
  // More info about the nonce: https://kb.myetherwallet.com/en/transactions/what-is-nonce/
    const nonce = await w3d.eth.rpc("eth_getTransactionCount", [sender, "latest"]);

  // Convert nonce to an int, add 1 and then convert back to hex
    const rawTransaction = createTransactionObject('0x' + (parseInt(nonce) + 1).toString(16));

  // Send the json rpc request to send a raw transaction with the object we just created
    const transactionHash = await w3d.eth.rpc("eth_sendRawTransaction", rawTransaction);

  // Log the link to where you can view that transaction on amberdata.io
    console.log(`https://ethereum-rinkeby.amberdata.io/transactions/0x${transactionHash}`);
})()
</pre>

