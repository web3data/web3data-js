import Web3Data from '../src/web3data'
import dotenv from 'dotenv'
dotenv.config()

export const ADDRESS = '0x06012c8cf97bead5deae237070f9587f8e7a266d'
// export const ADDRESS = '0x742d35cc6634c0532925a3b844bc454e4438f44e' // bitfinex
export const ADDRESS2 = '0xea674fdde714fd979de3edf0f56aa9716b898ec8' // Ethermine
export const TXN_HASH = '0x7a3dbdc6f5b8b748d972ee9e35ecea6ff62a624816c944bf2419c430156c54ba'
// export const TOKEN_ADDRESS = '0x744d70fdbe2ba4cf95131626614a1763df805b9e' /* Status Network Token */
export const TOKEN_ADDRESS = '0x514910771af9ca656af840dff83e8264ecf986ca' /* LINK */
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

export const DATE_2019_10_14 = 1571011200
export const DATE_2019_10_15 = 1571097600
export const DATES = {
    "2019-10-14": 1571011200,
    "2019-10-15": 1571097600,
    "2020-03-08": 1583625600000,
    "2020-03-09": 1583712000000
}
