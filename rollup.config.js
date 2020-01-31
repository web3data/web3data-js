import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import filesize from 'rollup-plugin-filesize'
import {terser} from 'rollup-plugin-terser'

import pkg from './package.json'

export default {
  input: 'index.js',
  output: {
    name: 'web3data',
    file: pkg.browser,
    compact: true,
    format: 'umd',
    globals: {
      crypto: 'crypto'
    }
  },

  external: ['crypto', 'https'],
  plugins: [
    resolve({
      preferBuiltins: true,
      browser: true
    }),
    commonjs(),
    json(),
    builtins({crypto: false, https: false}),
    globals(),
    filesize(),
    terser()
  ]
}
