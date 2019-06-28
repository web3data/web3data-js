import test from "ava";
// import { WebSocket, Server } from 'mock-socket'
const WebSocket = require('ws');

const CONNECTING = 0 // Socket has been created. The connection is not yet open.
const OPEN = 1 // The connection is open and ready to communicate.
const CLOSING = 2 // The connection is in the process of closing.
const CLOSED = 3 // The connection is closed or couldn't be opened.

// const mockServer = new Server('ws://localhost:8080')

// mockServer.on('connection', socket => {
//     socket.on('message', () => {});
//     socket.on('close', () => {});
//
//     socket.send('message');
//     socket.close();
// })

test.before(t => {
    // This runs before all tests
    const wss = new WebSocket.Server({ port: 8080 });

    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });

        ws.send('something');
    });
    t.context.wsClient = new WebSocket('ws://localhost:8080')
});
/**********************************
 * -------- Tests Setup ---------- *
 **********************************/

test.beforeEach(t => {

})

test('Successfully connects to Websocket Server', t => {
    t.is(t.context.wsClient.readyState, 2)
})
