const path = require('path');

import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';

export const setUpPolly = (recordingName) => {
    Polly.register(FSPersister);
    Polly.register(NodeHttpAdapter);

    const polly = new Polly(`${recordingName}_${Date.now()}` , {
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
            }
        }
    });
    const { server } = polly;
    server.any().on('beforePersist', (req, recording) => {
        recording.request.headers = recording.request.headers.filter(({ name }) => name !== 'x-api-key')
    });
    return polly
}
