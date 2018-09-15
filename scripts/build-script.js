require('dotenv').load()
//import "babel-polyfill";
const Bundler = require('parcel-bundler')
const Path = require('path')
var babel = require("babel-core")
let fs = require('fs')

// Single entrypoint file location:





async function runBundle() {

  // TODO: transpile ky with babel

  // TODO: create a temp dir and put kympiled in it

  // Initializes a bundler using the entrypoint location and options provided
  //const browserBundler = new Bundler(entryFileBrowser, optionsBrowser);
  //const nodeBundler = new Bundler(entryFileNode, optionsNode);

  // Run the bundler, this returns the main bundle
  //const browserBundle = await browserBundler.bundle();
  //const nodeBundle = await nodeBundler.bundle();
  // transpileKy()
  switch(process.env.TARGET) {
    case 'ALL': console.log("all");
      await bundelBrowser()
      await bundelNode()
    break;
    case 'BROWSER': console.log("browser");
      await bundelBrowser()
    break;
    case 'NODE': console.log("node");
      await bundelNode()
    break;
  }
}

async function transpileKy() {
   babel.transformFile('node_modules/ky/index.js', (err, res) => {
     if(err) {
       console.error(err)
     } else {
       fs.writeFile('./kympiled.js', res.code, (err) => {
         if (err) throw err;
       })
     }
   })
}

async function bundelBrowser() {

  // Bundler options for browser
  const optionsBrowser = {
    outDir: './dist/browser',
    outFile: 'web3data.min.js',
    target: 'browser',
    minify: true,
    watch: false,
    detailedReport: true
  };

  await transpileKy()

  const entryFileBrowser = Path.join(__dirname, '../browser.js');

  const browserBundler = new Bundler(entryFileBrowser, optionsBrowser);
  const browserBundle = await browserBundler.bundle();
  fs.unlink('./kympiled.js', (err) => {
  if (err) throw err;
  console.log('./kympiled.js was deleted');
  })
}

async function bundelNode() {

  // Bundler options for node
  const optionsNode = {
    outDir: './dist/node',
    outFile: 'web3data.js',
    target: 'node',
    watch: false,
    detailedReport: true
  };

  const entryFileNode = Path.join(__dirname, '../index.js');
  const nodeBundler = new Bundler(entryFileNode, optionsNode);
  const nodeBundle = await nodeBundler.bundle();
}

runBundle();
