require('dotenv').config(); // Load your environment variables with 'dotenv'
const EthereumTx = require('ethereumjs-tx').Transaction;
const { privateToAddress } = require('ethereumjs-util');
const Web3Data = require("web3data-js");

const w3d = new Web3Data(process.env.API_KEY);

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
