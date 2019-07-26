import Web3Data from '../src/web3data'
import dotenv from 'dotenv'
dotenv.config()

export const ADDRESS = '0x873029fead9cc9c05860557576ca1577f420a801' // 0x06012c8cf97bead5deae237070f9587f8e7a266d
export const TXN_HASH = '0x7a3dbdc6f5b8b748d972ee9e35ecea6ff62a624816c944bf2419c430156c54ba'
export const TOKEN_ADDRESS = '0x06012c8cf97bead5deae237070f9587f8e7a266d' // '0x744d70fdbe2ba4cf95131626614a1763df805b9e'; /* Status Network Token */
export const BLOCKCHAIN_ID = '1c9c969065fcd1cf' /* Ethereum-mainnet */
export const BLOCK_NUMBER = 8102326

/**
 * Tries to obtain an API key from the environment variable.
 * If none is found, user is warned and dumby key is set.
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
