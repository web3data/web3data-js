require('dotenv').load()
let helpers = require('./helpers');
const Bundler = require('parcel-bundler')
const Path = require('path')
var babel = require("babel-core")
let fs = require('fs')

async function runBundle() {

  if(process.argv[2] === 'clean') {
    helpers.deleteDir('./dist')
    console.log('Removed dist')

    helpers.deleteDir('./cache')
    console.log('Removed cache')
  }

  switch(process.env.TARGET) {
    case 'ALL':
      await bundelNode()
    case 'BROWSER':
      await bundelBrowser()
    break;
    case 'NODE':
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
  const options = {
    outDir: './dist/browser',
    outFile: 'web3data.min.js',
    target: 'browser',
    detailedReport: true
  };

  await transpileKy()

  const entryFile = Path.join(__dirname, '../browser.js');

  const bundler = new Bundler(entryFile, options);
  const Bundle = await bundler.bundle();
  fs.unlink('./kympiled.js', (err) => {
  if (err) throw err;
  })
}

async function bundelNode() {

  // Bundler options for node
  const options = {
    outDir: './dist/node',
    outFile: 'web3data.js',
    target: 'node',
    watch: false,
    minify: false,
    detailedReport: true
  };

  const entryFile = Path.join(__dirname, '../index.js');
  const bundler = new Bundler(entryFile, options);
  const Bundle = await bundler.bundle();
}

runBundle();
