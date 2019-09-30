import Web3Data from '../src/web3data'
import dotenv from 'dotenv'
dotenv.config()

export const ADDRESS = '0x06012c8cf97bead5deae237070f9587f8e7a266d'
export const TXN_HASH = '0x7a3dbdc6f5b8b748d972ee9e35ecea6ff62a624816c944bf2419c430156c54ba'
export const TOKEN_ADDRESS = '0x06012c8cf97bead5deae237070f9587f8e7a266d' // '0x744d70fdbe2ba4cf95131626614a1763df805b9e'; /* Status Network Token */
export const BLOCKCHAIN_ID = '1c9c969065fcd1cf' /* Ethereum-mainnet */
export const BLOCK_NUMBER = 8102326
export const MOCK_RAW_TXN_DATA = '0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f'
export const MOCK_CALL_DATA = [
    {
        "from":"0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        "to":"0xd46e8dd67c5d32be8058bb8eb970870f07244567",
        "gas":"0x76c0","gasPrice":"0x9184e72a000","value":"0x9184e72a",
        "data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
    },
    "latest"
]
export const MOCK_EXEC_DATA = [{
    "from":"0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    "to":"0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    "gas":"0x76c0",
    "gasPrice":"0x9184e72a000",
    "value":"0x9184e72a",
    "data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}]

/**
 * Tries to obtain an API key from the environment variable.
 * If none is found, user is warned and dummy key is set.
 * */
let getApiKey = () => {
    let API_KEY
    if(process.env.API_KEY) {
        API_KEY = process.env.API_KEY
    } else {
        console.warn("Must set API_KEY value in .env file, \n\
  Create an account on amberdata.io to obtain one")

        API_KEY = 'API_KEY'

    }
    return API_KEY
}

/**
 *  Returns a new Web3Data instance with API Key Set
 *  */
export const getNewWeb3DataInstance = (config) => new Web3Data(getApiKey(), config)
export const API_KEY = getApiKey()
