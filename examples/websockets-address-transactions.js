const Web3Data = require("web3data-js")

const w3d = new Web3Data(process.env.API_KEY)

// Initialize the connection
w3d.connect()

// Subscribes to a single transaction event; unsubscribes after first notification | Bat token
w3d.once({eventName: 'address:transactions', filters: {address: "0x0d8775f648430679a709e98d2b0cb6250d2887ef"}}, transaction => {

  // Log the transaction data
  console.log(transaction)

  // Terminate the socket connection
  w3d.disconnect()
})
