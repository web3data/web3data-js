export default {
  files: ['test/**.test.js'],
  ignoredByWatcher: ['dist/**/*'],
  cache: true,
  concurrency: 5,
  require: ['@babel/register'],
  babel: true,
  inherit: true
}
