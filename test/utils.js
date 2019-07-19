const path = require('path');

import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';

export const setUpPolly = (recordingName) => {
    Polly.register(FSPersister);
    Polly.register(NodeHttpAdapter);
    return new Polly(`${recordingName}`, {
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
}
