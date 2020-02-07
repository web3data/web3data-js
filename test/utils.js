import Web3Data from "../src/web3data";
import path from 'path';
import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';
import { MODES } from '@pollyjs/utils';
import dotenv from 'dotenv'
dotenv.config()

const modes = {
    'record': MODES.RECORD,
    'replay': MODES.REPLAY,
    'passthrough': MODES.PASSTHROUGH
}

const getArgs = () => {
    const [arg, value] = process.argv.slice(2)
    return {
        arg,
        value
    }
}

const getMode = () => {
    let mode = MODES.REPLAY
    const args = getArgs()
    if(args.arg && args.arg.toLocaleLowerCase() === '--mode' && args.value && args.value.toLocaleLowerCase() in modes) {
        mode = modes[args.value.toLocaleLowerCase()]
    }
    return mode
}

export const setUpPolly = (recordingName) => {
    Polly.register(FSPersister);
    Polly.register(NodeHttpAdapter);

    const mode = getMode()
    console.log({mode})
    const polly = new Polly(`${recordingName}` , { // _${Date.now()}
        mode,
        adapters: ['node-http'],
        persister: 'fs',
        persisterOptions: {
            fs: {
                recordingsDir: path.resolve(__dirname, 'recordings')
            }
        },
        matchRequestsBy: {
            headers: {
                exclude: ['x-api-key']
            },
            url: {
                query(query) {
                    delete query['x-api-key']
                    return query
                }
            }
        }
    });
    const { server } = polly;
    server.any().on('beforePersist', (req, recording) => {
        recording.request.headers = recording.request.headers.filter(({ name }) => name !== 'x-api-key')
        recording.request.queryString = recording.request.queryString.filter(({ name }) => name !== 'x-api-key')

        /* Remove the api key from the query params*/
        const url = new URL(recording.request.url)
        url.searchParams.set('x-api-key', '')
        recording.request.url = url
    });
    return polly
}

export const isISOFormat = dateString => RegExp(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/, 'g').test(dateString)
export const hasProp = ( () => Object.prototype.hasProp =
  function (prop) {
      return typeof this === 'object' ? Object.hasOwnProperty.call(this, prop) : null
  }) ()
export const values = ( () => Object.prototype.values = function () { return typeof this === 'object' ? Object.values(this) : null }) ()

/**
 * Tries to obtain an API key from the environment variable.
 * If none is found, user is warned and dummy key is set.
 * */
export const getApiKey = () => {
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
