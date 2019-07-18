export default {
  files: ['test/**.test.js'],
  sources: ['**/*.{js,jsx}', '!dist/**/*'],
  cache: true,
  concurrency: 5,
  require: ['@babel/register', 'ava-playback'],
  babel: {
    testOptions: {
      presets: [['ava/stage-4', false]]
    }
  },
  playbacks: 'test/fixtures',
  inherit: true
}
