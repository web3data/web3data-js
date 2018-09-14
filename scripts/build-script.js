require('dotenv').load()
//import "babel-polyfill";
//require('browser-env')();
const Bundler = require('parcel-bundler');
const Path = require('path');

// Single entrypoint file location:
const entryFiles = Path.join(__dirname, '../browser.js');

// Bundler options for browser
const optionsBrowser = {
  outDir: './dist/browser',
  outFile: 'web3data.min.js',
  target: 'browser'
};

// Bundler options for browser
const optionsNode = {
  outDir: './dist/node',
  outFile: 'web3data.js',
  target: 'node'
};

async function runBundle() {

  let options = optionsBrowser
  console.log(options)
  // Initializes a bundler using the entrypoint location and options provided
  const bundler = new Bundler(entryFiles, options);

  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  const bundle = await bundler.bundle();

  process.env.BROWSER = false
}

runBundle();
