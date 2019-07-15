import test from "ava";
import WebSocket from 'ws'
import {API_KEY} from './constants'
import Web3Data from '../src/web3data'
import capcon from 'capture-console'
import dotenv from 'dotenv'

dotenv.config();

const STARTING_PORT = 8080
const MOCK_WS_URL = `ws://localhost:`

let port = STARTING_PORT
const getPort = () => port++

// ROW
process.env.AVA_PLAYBACK = 'playback'
//ROW

/**
 * Tests are labeled LIVE or MOCK. When in playback mode, tests use
 * local websocket server. When in live mode they hit web3api server.
 * This is based on the AVA_PLAYBACK env var set at runtime.
 * By Default it uses the mock server.
 */

/**********************************
 * -------- Test Setup ---------- *
 **********************************/
test.beforeEach(t => {
    const PORT = getPort()
    const config = {websocketUrl: process.env.AVA_PLAYBACK === 'playback' ? MOCK_WS_URL + PORT : {} }
    t.context.w3d = new Web3Data(API_KEY, config)
    t.context.wss = new WebSocket.Server({ port: PORT });
})

/*********** Test connects to server (no callback) [LIVE, MOCK] ***********/
test.cb('Successfully connects to Websocket Server - no callback',  t => {
    t.context.wss.on('connection', () => t.end())
    t.context.w3d.connect()
})

/*********** Test connects to server (with callback) [LIVE, MOCK] ***********/
test.cb('Successfully connects to Websocket Server - with callback',  t => {
    t.context.wss.on('connection', () => t.end())
    t.context.w3d.connect(status => status)
})

/*********** Test disconnect from server (no callback) [LIVE, MOCK] ***********/
test.cb('Successfully disconnects from Websocket Server - no callback',  t => {
    t.context.wss.on('connection', (ws) => {
        ws.on('close', () => t.end())
    });
    t.context.w3d.connect(() => {
        t.context.w3d.disconnect()
    })
})

/*********** Test disconnect from server (with callback) [LIVE, MOCK] ***********/
test.cb('Successfully disconnects from Websocket Server - with callback',  t => {
    t.context.wss.on('connection', (ws) => {
        ws.on('close', () => t.end())
    });
    t.context.w3d.connect(() => {
        t.context.w3d.disconnect(status => status)
    })
})

/*********** Test call disconnect before connect errors [LIVE, MOCK] ***********/
test.cb.only('disconnect logs error if called before connect',  t => {
    const stderr = capcon.captureStderr(function scope() {
        t.context.w3d.disconnect(status => status)
        t.end()
    });
    t.regex(stderr, /socket is not yet connected/)
})

/*********** Test call disconnect before connect errors [LIVE, MOCK] ***********/

