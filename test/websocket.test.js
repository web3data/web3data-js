import test from "ava";
// import { WebSocket, Server } from 'mock-socket'
const WebSocket = require('ws');
const Web3Data = require('../src/web3data').default
import WebSocketClient from '../src/websocket'

const { promisify } = require('util')
import { DEFAULT_WEBSOCKET_URL } from '../src/constants'
import {API_KEY} from './constants'
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

    const server = http.createServer();
    const wss1 = new WebSocket.Server({ noServer: true });
    const wss2 = new WebSocket.Server({ noServer: true });
    const wss3 = new WebSocket.Server({ noServer: true });
    const wss4 = new WebSocket.Server({ noServer: true });

    /* generic */
    wss1.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            const data = JSON.parse(message);
            console.log('received message');
            ws.send(JSON.stringify(
                {
                    "jsonrpc": "2.0",
                    "id": data.id,
                    "result": "242d29d5c0ec9268f51a39aba4ed6a36c757c03c183633568edb0531658a9799"
                }
            ));
        });
    });

    /* no-data */
    wss2.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);

            ws.send(message);
        });
    });

    /* error */
    wss3.on('connection', function connection(ws) {
       ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            // ws.send(message);
            ws.terminate();
        });
        ws.close(1014)
    });

    /* no-response */
    let msg = 0
    wss4.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            msg++
            console.log(`received: ${message} nMsgs: ${msg}`);
            ws.close()
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
    t.context.w3d = new Web3Data(API_KEY, {websocketUrl: MOCK_WS_URL + '/generic'})
    t.context.wss = new WebSocket.Server({ port: 8081 });
})

/*********** Test connects to server [LIVE, MOCK] ***********/
test.cb('Successfully connects to Websocket Server',  t => {
    t.context.w3d.connect(status => {
        t.is(status.target.readyState, OPEN)
        t.end()
    })
})

/*********** Test disconnect from server [LIVE, MOCK] ***********/
test.cb('Successfully disconnects to Websocket Server',  t => {
    t.context.w3d.connect(status => {
        t.is(status.target.readyState, OPEN)
        t.context.w3d.disconnect(status => {
            // TODO Might want an t.is here but don't force websocket.js to match test
            t.end()
        })
    })
})

/*********** Test reconnect attempts 3 times [MOCK] ***********/
test.cb('Successfully reconnects 3 times',  t => {
    let wss = new WebSocket.Server({ port: 8082 });
    let reconnects = -1
    const w3d = new Web3Data(API_KEY, {websocketUrl: 'ws://localhost:8082'})
    w3d.connect(status => {})
    wss.on('connection', function connection(ws) {
        if (++reconnects >= 3) {
            t.is(reconnects, 3)
            t.end()
        }
    });
})

/* Having issues inducing an error skip for now */
/*********** Test reconnect on error [MOCK] ***********/
test.cb.skip('Successfully reconnects on server error',  t => {
    const w3d = new Web3Data(API_KEY, {websocketUrl: MOCK_WS_URL + '/error'})
    w3d.connect(status => {})
})

/* Not really possible without waiting for 30secs */
/*********** Test reconnect on no data received ***********/
test.cb.skip('Successfully reconnects on no data received',  t => {
    const websocket = new WebSocketClient(API_KEY,  {websocketUrl: MOCK_WS_URL + '/no-data'})
    websocket.connect(status => {
        websocket.subscribe('block')
        t.is(t.context.msgRceived, true)
        t.end()
    })
})

/*********** Test subscribe() no args [LIVE, MOCK] ***********/
test.cb('Successfully sends valid subscription message (no args)',  t => {
    const wss = new WebSocket.Server({ port: 8083 });
    /* Regex matches the following string  as long as id contains 1 > characters */
    const SUBSCRIBE_MESSAGE = /{"jsonrpc":"2\.0","method":"subscribe","id":".+","params":\["block"\]}/g
    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            t.regex(message, SUBSCRIBE_MESSAGE)
            t.end()
        });
    });
    const websocket = new WebSocketClient(API_KEY,  {websocketUrl: 'ws://localhost:8083'})
    websocket.connect(status => {
        websocket.subscribe('block')
    })
})

/*********** Test subscribe() with args [LIVE, MOCK] ***********/
test.cb('Successfully sends valid subscription message (with args)',  t => {
    const wss = new WebSocket.Server({ port: 8082 });
    /* Regex matches the following string  as long as id contains 1 > characters */
    const SUBSCRIBE_MESSAGE = /{"jsonrpc":"2\.0","method":"subscribe","id":".+","params":\["block",{"number":7280000}\]}/g
    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            t.regex(message, SUBSCRIBE_MESSAGE)
            t.end()
        });
    });
    const websocket = new WebSocketClient(API_KEY,  {websocketUrl: 'ws://localhost:8082'})
    websocket.connect(status => {
        websocket.subscribe('block', {number: 7280000})
    })
})

/*********** Test unsubscribe() no args [LIVE, MOCK] ***********/
test.cb('Successfully sends valid unsubscribe message (no args)',  t => {
    const wss = new WebSocket.Server({ port: 8083 });
    /* Regex matches the following string  as long as id contains 1 > characters */
    const UNSUBSCRIBE_MESSAGE = '{"jsonrpc":"2.0","method":"unsubscribe","id":"uuid","params":["subId"]}'
    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            t.is(message, UNSUBSCRIBE_MESSAGE)
            t.end()
        });
    });
    const websocket = new WebSocketClient(API_KEY,  {websocketUrl: 'ws://localhost:8083'})

    websocket.connect(status => {
        websocket.registry['uuid'] = {subId: 'subId'}
        websocket.unsubscribe('block', {id: 'uuid'})
    })
})

/*********** Test unsubscribe() with args [LIVE, MOCK] ***********/
test.cb.only('Successfully sends valid unsubscribe message (with args)',  t => {
    const wss = new WebSocket.Server({ port: 8083 });
    /* Regex matches the following string  as long as id contains 1 > characters */
    const UNSUBSCRIBE_MESSAGE = '{"jsonrpc":"2.0","method":"subscribe","id":"Ie/4MEdlxOHpBSRiqgF6pZfyQuw=","params":["block",{"number":7280000}]}'
    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            t.is(message, UNSUBSCRIBE_MESSAGE)
            t.end()
        });
    });
    const websocket = new WebSocketClient(API_KEY,  {websocketUrl: 'ws://localhost:8083'})

    websocket.connect(status => {
        const id = websocket.subscribe('block', {number: 7280000})
        websocket.registry[id] = {subId: 'subId'}
        websocket.unsubscribe('block', {number: 7280000, id: id})
    })
})
