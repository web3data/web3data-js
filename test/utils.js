const path = require('path');

import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';

export const setUpPolly = (recordingName) => {
    Polly.register(FSPersister);
    Polly.register(NodeHttpAdapter);

    const polly = new Polly(`${recordingName}` , { // _${Date.now()}
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

export const isISOFormat = (dateString) => dateString.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/)
export const hasProp = ( () => Object.prototype.hasProp =
  function (prop) {
      return typeof this === 'object' ? Object.hasOwnProperty.call(this, prop) : null
  }) ()
export const values = ( () => Object.prototype.values = function () { return typeof this === 'object' ? Object.values(this) : null }) ()
