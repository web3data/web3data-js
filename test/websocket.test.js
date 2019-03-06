import test from "ava";
import { WebSocket, Server } from 'mock-socket'

const CONNECTING = 0 // Socket has been created. The connection is not yet open.
const OPEN = 1 // The connection is open and ready to communicate.
const CLOSING = 2 // The connection is in the process of closing.
const CLOSED = 3 // The connection is closed or couldn't be opened.

const mockServer = new Server('ws://localhost:8080')

mockServer.on('connection', socket => {
    socket.on('message', () => {});
    socket.on('close', () => {});

    socket.send('message');
    socket.close();
})

/**********************************
 * -------- Tests Setup ---------- *
 **********************************/

test.beforeEach(t => {
    t.context.wsClient = new WebSocket('ws://localhost:8080')
})

test('Successfully connects to Websocket Server', t => {
    t.is(t.context.wsClient.readyState, 2)
})