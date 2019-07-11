require('dotenv').load()
const helpers = require('./helpers');
const Bundler = require('parcel-bundler')
const Path = require('path')
const fs = require('fs')

bundleBrowser = async () => {

  // Bundler options for browser
  const options = {
    outDir: './dist',
    outFile: 'web3data.min.js',
    target: 'browser',
    detailedReport: true
  };

  const entryFile = Path.join(__dirname, '../src/web3data.js');
  console.log(entryFile)
  const bundler = new Bundler(entryFile, options);
  return bundler.bundle();
}

(async () => {
  if(process.argv[2] === 'clean') {
    helpers.deleteDir('./dist')
    console.log('Removed dist')

    helpers.deleteDir('./cache')
    console.log('Removed cache')
  }
  await bundleBrowser()
})()
