import test from "ava";
// import { WebSocket, Server } from 'mock-socket'
const WebSocket = require('ws');
const Web3Data = require('../src/web3data').default
import WebSocketClient from '../src/websocket'

const { promisify } = require('util')
import { DEFAULT_WEBSOCKET_URL } from '../src/constants'

const CONNECTING = 0 // Socket has been created. The connection is not yet open.
const OPEN = 1 // The connection is open and ready to communicate.
const CLOSING = 2 // The connection is in the process of closing.
const CLOSED = 3 // The connection is closed or couldn't be opened.

const http = require('http');
const url = require('url');

/*
* Test...
* only connects once with multiple connects called
* reconnects
* on and off before connection happens
* disconnect
*
*
*
* */


test.before(t => {
    // This runs before all tests
/*    t.context.wss = new WebSocket.Server({ port: 8080 });
    // t.context.wssC = new WebSocket.Server({ port: 8081 });

    t.context.wss.on('connection', function connection(ws) {
        t.context.msgRceived = false
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            t.context.msgRceived = true
            ws.send(message);
        });
    });*/

    const server = http.createServer();
    const wss1 = new WebSocket.Server({ noServer: true });
    const wss2 = new WebSocket.Server({ noServer: true });
    const wss3 = new WebSocket.Server({ noServer: true });
    const wss4 = new WebSocket.Server({ noServer: true });

    wss1.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);

            ws.send(message);
        });
    });

    wss2.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);

            ws.send(message);
        });
    });

    wss3.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);

            ws.send(message);
        });
    });

    /* No response */
    let msg = 0
    wss4.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            msg++
            console.log(`received: ${message} nMsgs: ${msg}`);
            // ws.send(message);
        });
    });

    server.on('upgrade', function upgrade(request, socket, head) {
        const pathname = url.parse(request.url).pathname;
        console.log(pathname)
        switch (pathname) {
            case '/generic':
                wss1.handleUpgrade(request, socket, head, function done(ws) {
                    wss1.emit('connection', ws, request);
                });
                break;
            case '/close':
                wss2.handleUpgrade(request, socket, head, function done(ws) {
                    wss2.emit('connection', ws, request);
                });
                break;
            case '/error':
                wss3.handleUpgrade(request, socket, head, function done(ws) {
                    wss3.emit('connection', ws, request);
                });
                break;
            case '/no-response':
                wss4.handleUpgrade(request, socket, head, function done(ws) {
                    wss4.emit('connection', ws, request);
                });
                break;
            default:
                socket.destroy();
            break;
        }
    });

    server.listen(8080);
});

const MOCK_WS_URL = 'ws://localhost:8080'
const LIVE_WS_URL = DEFAULT_WEBSOCKET_URL

/**********************************
 * -------- Test Setup ---------- *
 **********************************/
test.beforeEach(t => {
    t.context.w3d = new Web3Data('', {websocketUrl: MOCK_WS_URL + '/generic'})
/*
    t.context.w3d.connect(status => {
        console.log('the status -> ', status.type)
    }).listen()*/
})

test.cb('Successfully connects to Websocket Server',  t => {
    t.plan(1)
    t.context.w3d.connect(status => {
        t.is(status.target.readyState, OPEN)

    })
})

/*********** Test reconnect attempts 3 times ***********/
/*

test.cb('Successfully reconnects 3 times',  t => {

    let wss = new WebSocket.Server({ port: 8081 });
    let reconnects = -1
    wss.on('connection', function connection(ws) {
        ws.close(1000)
        reconnects++
    });

    const w3d = new Web3Data('', {websocketUrl: 'ws://localhost:8081'})
    w3d.connect(status => {})
    setTimeout(() => {t.is(reconnects, 3); t.end()}, 2000)
})
*/

/*********** Test reconnect on error ***********/
/*test.cb('Successfully reconnects on server connection closed',  t => {

    let wss = new WebSocket.Server({ port: 8081 });
    let reconnects = -1
    wss.on('connection', function connection(ws) {
        ws.close(1000)
        reconnects++
    });

    const w3d = new Web3Data('', {websocketUrl: 'ws://localhost:8081'})
    w3d.connect(status => {})
    setTimeout(() => {t.is(reconnects, 3); t.end()}, 2000)
})*/

/*********** Test reconnect on no response received ***********/
/*
let i = 0
test.cb('Successfully reconnect when no response received',  t => {
    const websocket = new WebSocketClient('',  {websocketUrl: MOCK_WS_URL + '/generic'})
    websocket.connect(status => {
        // t.context.w3d.subscribe('block')
        t.is(true, true)
        i++

        console.log(i)

    })
    websocket.on({eventName: 'block'},res => {
        console.log(res)
        t.end()
    })

})
*/

/*********** Test reconnect on no data received ***********/
/*

test.cb('Successfully sends subscription message',  t => {
    const websocket = new WebSocketClient('',  {websocketUrl: MOCK_WS_URL + '/no-data'})
    websocket.connect(status => {
        websocket.subscribe('block')
        t.is(t.context.msgRceived, true)
        t.end()
    })
})

*/

