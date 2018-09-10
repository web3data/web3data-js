import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";


export default {
  input: 'browser.js',
  output: {
    dir: 'dist/browser',
    file: 'web3data.min.js',
    format: 'iife',
    name:'BrowserBundle',
    globals: {'ky':'ky','dotenv':'dotenv'}
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify(),
    resolve({main: true, browser: true}),
    commonjs()
  ]
}
