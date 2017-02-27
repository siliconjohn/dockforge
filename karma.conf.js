var webpackConfig = require('./webpack.config.js')

module.exports = function (config) {
  config.set({
    base: __dirname,
    browsers: ['Chrome'], //,'Firefox'
    singleRun: true,
    frameworks: ['mocha'],
    reporters: ['mocha'],
    files: [
      //'node_modules/jquery/dist/jquery.min.js',
      'app/tests/**/*.test.js'
    ],
    preprocessors: {
      'app/tests/**/*.test.js': ['webpack', 'sourcemap']
    },
    client: {
      captureConsole: true,
      mocha: {
        timeout: '5000'
      }
    },
    webpack: webpackConfig, webpackServer: { noInfo: true }
  })
}
