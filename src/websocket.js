require('dotenv').load()
let WebSocketClient = require('websocket').client;
let client = new WebSocketClient();
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
// client.connect(`wss://staging-0000-data-api.amberdata.io?api_key=${process.env.API_KEY}`);
client.connect('ws://localhost:8080', 'echo-protocol');


// client.onerror = function(err) {
//     console.log('Connection Error', err);
// };
//
// client.onopen = function() {
//     console.log('WebSocket Client Connected');
// };

// let Web3Data = require('./web3data').default
//
// let w3d = new Web3Data('whatever', {websocketUrl: 'wss://localhost:8080'}) //wss://echo.websocket.org
// w3d.connect(status => {
//     console.log('the status -> ' +  status)
// })
//
// w3d.connect(status => {
//     console.log('the status -> ' +  status)
// })



// setTimeout(function timeout() {
//     w3d.disconnect();
// }, 500);
// require('dotenv').load()

// const WebSocket = require('ws')
//
// const ws = new WebSocket(`wss://staging-0000-data-api.amberdata.io?api_key=${process.env.API_KEY}`, {
//     rejectUnauthorized: false,
//     protocolVersion: 13
// }); // api_key=${process.env.API_KEY}`);
// console.log()
// const ws = new WebSocket(`ws://localhost:8080`);

// ws.on('UPDATE:BLOCK:LATEST', function incoming(data) {
//     console.log(data);
// }); UPDATE:BLOCK:LATEST
