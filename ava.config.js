export default {
  files: ['test/**.test.js'],
  ignoredByWatcher: ['dist/**/*'],
  cache: true,
  concurrency: 5,
  require: ['@babel/register'],
<<<<<<< HEAD
  babel: true,
=======
  babel: {
    testOptions: {
      presets: [['@ava/stage-4', false]]
    }
  },
>>>>>>> fix/update-deps
  inherit: true
}
