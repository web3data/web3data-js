import babel from 'rollup-plugin-babel';

export default {
    input: 'index.js',
    output: {
      dir: 'dist/node',
      file: 'web3data.js',
      format: 'cjs'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
}
