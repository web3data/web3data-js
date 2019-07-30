import test from "ava";
import WebSocket from 'ws'
import {API_KEY} from './constants'
import Web3Data from '../src/web3data'
import capcon from 'capture-console'
import getPort from 'get-port'
import dotenv from 'dotenv'

dotenv.config()

//TODO: Move constants and methods to separate file

const MOCK_WS_URL = `ws://localhost:`

const SUBSCRIPTION_ID = '242d29d5c0ec9268f51a39aba4ed6a36c757c03c183633568edb0531658a9799'

/* Regex matches the following string  as long as id contains 1 > characters */
const UNSUBSCRIBE_MESSAGE = /{"jsonrpc":"2\.0","method":"unsubscribe","id":".+","params":\[.+\]}/

/* Regex matches the following string  as long as id contains 1 > characters */
const SUBSCRIBE_MESSAGE = /{"jsonrpc":"2\.0","method":"subscribe","id":".+","params":\[.+\]}/

const TEST_TIMEOUT = 5000

/**
 * Creates a string in json rpc format
 * @param options the json rpc options
 * @return {string} the json rpc formatted string
 */
const formatJsonRpc = options => {
    if (!options) return ''
    return JSON.stringify({
        jsonrpc: options.version || '2.0',
        ...(options.method && { method: options.method}),
        id: options.id || 0,
        ...(options.params && { params: options.params}),
        ...(options.result && { result: options.result})
    })
}

const subAck = (id) => formatJsonRpc({
    id,
    result: SUBSCRIPTION_ID
})
const TEST_BLOCK_DATA = {
    "blockchainId": "1c9c969065fcd1cf",
    "number": 7549499,
}
const subResponse = (id) => formatJsonRpc({
    id,
    method: "subscription",
    params: {
        result: TEST_BLOCK_DATA,
        subscription: SUBSCRIPTION_ID
    }
})

/**
 * Tests are labeled LIVE or MOCK. When in playback mode, tests use
 * local websocket server. When in live mode they hit web3api server.
 * This is based on the AVA_PLAYBACK env var set at runtime.
 * By Default it uses the mock server.
 */

/**********************************
 * -------- Test Setup ---------- *
 **********************************/
test.beforeEach(async t => {
    const PORT = await getPort()
    const config = {websocketUrl: MOCK_WS_URL + PORT }
    t.context.w3d = new Web3Data(API_KEY, config)
    t.context.wss = new WebSocket.Server({ port: PORT });
})

/*********** Test connects to server (no callback) [MOCK] ***********/
test.cb('Successfully connects to Websocket Server - no callback',  t => {
    t.context.wss.on('connection', () => t.end())
    t.context.w3d.connect()
    t.timeout(TEST_TIMEOUT)
})

/*********** Test connects to server (with callback) [MOCK] ***********/
test.cb('Successfully connects to Websocket Server - with callback',  t => {
    t.plan(2)
    t.context.wss.on('connection', () => {t.pass()})
    t.context.w3d.connect(() => {t.pass(); t.end()})
    t.timeout(TEST_TIMEOUT)
})

/*********** Test disconnect from server (no callback) [MOCK] ***********/
test.cb('Successfully disconnects from Websocket Server - no callback',  t => {
    t.context.wss.on('connection', (ws) => {
        ws.on('close', () => t.end())
    });
    t.context.w3d.connect(() => {
        t.context.w3d.disconnect()
    })
    t.timeout(TEST_TIMEOUT)
})

/*********** Test disconnect from server (with callback) [MOCK] ***********/
test.cb('Successfully disconnects from Websocket Server - with callback',  t => {
    t.plan(2)
    t.context.wss.on('connection', (ws) => {
        ws.on('close', () => {t.pass(); t.end()})
    });
    t.context.w3d.connect(() => {
        t.context.w3d.disconnect(t.pass())
    })
    t.timeout(TEST_TIMEOUT)
})

/*********** Test call disconnect before connect errors [LIVE, MOCK] ***********/
test.cb('disconnect logs error if called before connect',  t => {
    const stderr = capcon.captureStderr(() => {
        t.context.w3d.disconnect()
        t.end()
    });
    t.regex(stderr, /socket is not yet connected/)
    t.timeout(TEST_TIMEOUT)
})

/*********** Test on method sends sub method - without filters [MOCK] ***********/
test.cb('Successfully calls on and sends subscription message - without filters',  t => {
    t.context.wss.on('connection', (ws) => {
        ws.on('message', (message) => {
            t.regex(message, SUBSCRIBE_MESSAGE)
            t.end()
        })
    })
    t.context.w3d.connect()
    t.context.w3d.on({eventName: 'block'}, status => status)
    t.timeout(TEST_TIMEOUT)
})

/*********** Test on method sends sub message - with filters [MOCK] ***********/
test.cb('Successfully calls on and sends subscription message - with filters',  t => {

    /* Regex matches the following string  as long as id contains 1 > characters */
    const SUBSCRIBE_MESSAGE = /{"jsonrpc":"2\.0","method":"subscribe","id":".+","params":\["block",{"number":7280000}\]}/g

    t.context.wss.on('connection', (ws) => {
        ws.on('message', (message) => {
            t.regex(message, SUBSCRIBE_MESSAGE)
            t.end()
        })
    })
    t.context.w3d.connect()
    t.context.w3d.on({eventName: 'block', filters: {"number":7280000}}, status => status)
    t.timeout(TEST_TIMEOUT)
})

/*********** Test on method errors if no event name [LIVE, MOCK] ***********/
test.cb('on method errors if called without an event name',  t => {
    t.context.wss.on('connection', ()=>{})
    const stderr = capcon.captureStderr(() => {
        t.context.w3d.on({}, status => status)
        t.end()
    })
    t.regex(stderr, /no event specified/)
    t.timeout(TEST_TIMEOUT)
})

/*********** Test off method sends unsub message - without filters [MOCK] ***********/
test.cb('Successfully calls off and sends unsubscription message - without filters',  t => {

    t.context.wss.on('connection', (ws) => {
        ws.on('message', (message) => {
            const data = JSON.parse(message);
            if (data.method === 'subscribe') {
                ws.send(subAck(data.id))
                ws.send(subResponse(data.id))
            } else {
                t.regex(message, UNSUBSCRIBE_MESSAGE)
                t.end()
            }
        })
    })
    t.context.w3d.connect(() => {
        t.context.w3d.on({eventName: 'block'}, status => {
            t.context.w3d.off({eventName: 'block'}, status => status)
        })
    })
    t.timeout(TEST_TIMEOUT)
})

/*********** Test off method sends unsub message - with filters [MOCK] ***********/
test.cb('Successfully calls off and sends unsubscription message - with filters',  t => {
    t.context.wss.on('connection', (ws) => {
        ws.on('message', (message) => {
            const data = JSON.parse(message);
            if (data.method === 'subscribe') {
                ws.send(subAck(data.id))
                ws.send(subResponse(data.id))
            } else {
                t.regex(message, UNSUBSCRIBE_MESSAGE)
                t.end()
            }
        })
    })
    t.context.w3d.connect(() => {
        t.context.w3d.on({eventName: 'block', filters: {"number":7280000}}, status => {
            t.context.w3d.off({eventName: 'block', filters: {"number":7280000}}, status => status)
        })
    })
    t.timeout(TEST_TIMEOUT)
})


/*********** Test off errors if called before on [LIVE, MOCK] ***********/
test.cb('Calling off before on errors',  t => {
    t.context.wss.on('connection', () => {})
    t.context.w3d.connect()
    const stderr = capcon.captureStderr(function scope() {
        t.context.w3d.off({eventName: 'block'}, status => status)
        t.end()
    });
    t.regex(stderr, /Not subscribed to: 'block'/)
    t.timeout(TEST_TIMEOUT)
})

/*********** Test websocket handles erroneous server response [MOCK] ***********/
test.cb.skip('Successfully handles erroneous server response',  t => {
    let output = ''
    capcon.startCapture(process.stderr, function (stderr) {
        output += stderr;
    });

    t.context.wss.on('connection', ws => {
        ws.on('message', () => {
            ws.send('not json parsable response')
        })
    })

    t.context.w3d.connect()
    t.context.w3d.on({eventName: 'block'}, () => t.end())

    capcon.stopCapture(process.stderr);

    t.regex(output, /error parsing json request/)
    t.timeout(TEST_TIMEOUT)
})

/*********** Test client receives and outputs data via callback [LIVE, MOCK] ***********/
test.cb('Successfully subscribes, receives, and outputs data', t => {
    t.context.wss.on('connection', (ws) => {
        ws.on('message', (message) => {
            const data = JSON.parse(message);
            ws.send(subAck(data.id))
            ws.send(subResponse(data.id))
        })
    })
    t.context.w3d.connect(() => {
        t.context.w3d.on({eventName: 'block'}, status => {
            t.is(JSON.stringify(TEST_BLOCK_DATA), JSON.stringify(status))
            t.end()
        })
    })
    t.timeout(TEST_TIMEOUT)
})

test.cb('Successfully call once, outputs data and unsubscribes', t => {
    t.context.wss.on('connection', (ws) => {
        ws.on('message', (message) => {
            const data = JSON.parse(message);
            ws.send(subAck(data.id))
            for(let i = 0; i < 20; i++) {
                ws.send(subResponse(data.id))
            }
        })
    })
    t.context.w3d.connect(() => {
        t.context.w3d.once({eventName: 'block'}, status => {
            t.is(JSON.stringify(TEST_BLOCK_DATA), JSON.stringify(status))
            t.end()
        })
    })
    t.timeout(TEST_TIMEOUT)
})
