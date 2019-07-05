export default {
  files: ['test/**.test.js'],
  sources: ['**/*.{js,jsx}', '!dist/**/*'],
  cache: true,
  concurrency: 5,
<<<<<<< HEAD
  require: ['@babel/register', 'ava-playback'],
=======
  require: ['@babel/register',  'ava-playback'],
>>>>>>> 09eeed2ca256502e894f741ba80151e4f92af1ae
  babel: {
    testOptions: {
      presets: [['ava/stage-4', false]]
    }
  },
  playbacks: 'test/fixtures',
  inherit: true
}
