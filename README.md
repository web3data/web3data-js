[![Build Status](https://travis-ci.com/web3data/web3data-js.svg?branch=master)](https://travis-ci.com/web3data/web3data-js)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Try web3data-js on RunKit](https://badge.runkitcdn.com/web3data-js.svg)](https://npm.runkit.com/web3data-js)

# web3data.js Javascript API
Wrapper for [Amberdata.io](http://amberdata.io)'s [REST API](docs.amberdata.io)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Building](#building)
- [Testing](#testing)
- [API Key](#)
- [Commands](#commands)
- [Community](#community)
- [Resources](#resources)
- [Licensing](#licensing)

## Installation
Using npm:
```bash
npm install web3data-js
```

Using CDN:
```html
<script src="https://unpkg.com/web3data-js/dist/web3data.min.js"></script>
```

## Usage
```js
import Web3Data from 'Web3Data'

const w3d = new Web3Data('<api-key>')

( async () => {
     const contract = await w3d.contract.getDetails("0x06012c8cf97bead5deae237070f9587f8e7a266d")
     console.log(contract) // { ... }
 }
)()
```

#### Websockets
```js
import Web3Data from 'Web3Data'

const w3d = new Web3Data('<api-key>')


w3d.connect(status => {
  console.log('status ->', status.type)
})
w3d.on({eventName: 'block'}, data => {
  console.log(data)
})
```

## Testing
This will run all tests using the prerecorded responses from the [fixtures](test/fixtures/web3ap.io).
```bash
npm test
```

Runs tests using live responses from our endpoints. (Requires API key see [Obtaining an Api key](#obtaininganapikey)).
```bash
npm run test-live
```

Runs tests using live responses from our endpoints and records them in your [fixtures folder](test/fixtures/web3ap.io).
```bash
npm run test-record
```

## Obtaining an API key
Visit [Amberdata.io](https://amberdata.io/pricing) and select the developer plan to get started!

Once you have you're key place it in a file named `.env` &mdash; see [./env.example](./env.example) for reference.

<!-- For additional details on obtaining an api key see() -->

## Commands
```bash
npm run build # Build for browser and output as `dist/web3data.min.js`
npm run lint # run linter
npm run lintfix # fix linting errors
npm run test # runs all tests in playback mode
npm run test-record # run tests in record mode
npm run test-live # run tests hitting live endpoints
npm run test-fast # run tests but stop when one fails
npm run test-verbose # run tests with verbose output
npm run clean-fix # deletes the fixtures
npm run example # runs the example - see web3data-js in action!
```

## Community
- [Discourse](https://forum.amberdata.io/)
## Resources
- [Contributing](./CONTRIBUTING.md)
## Licensing
This project is licensed under the [Apache Licence 2.0](./LICENSE).
