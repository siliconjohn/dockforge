const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const WebpackErrorNotificationPlugin = require('webpack-error-notification');

var exportValues = {}

const env = process.argv[process.argv.indexOf("--env=production")]
const nodeEnv =  env && "--env=production" ? 'production' : 'development'
console.log('Environment: ' + nodeEnv )

// setup default plugins
var plugins = [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify (nodeEnv ) }
    }),
    new WebpackErrorNotificationPlugin(),
    new WebpackNotifierPlugin({ title: 'Webpack', excludeWarnings: true }),
  ]

// add plugins used only in production
if( nodeEnv == 'production') {
  plugins.push(  new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false,
        },
        minimize: true
    })
  )
}

exportValues =  {
  entry:[
      './app/app.jsx',
      // all of bootstrap js
      //'bootstrap-sass/assets/javascripts/bootstrap.js',
      // or individual bootstrap files
      //'bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
      //'script!bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
    ],

  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
  },

  resolve: {
    root: __dirname,
    modulesDirectories: [
        'node_modules',
        './app/redux',
        './app/components',
        './app/components/dockeditor',
        './app/components/dockeditor/componentpicker',
        './app/components/dockeditor/svg',
        './app/components/dockeditor/components/',
      ],
    alias: {
      applicationStyles: 'app/styles/app.scss'
    },
    extensions:[ '','.js','.jsx']
  },

  module:{
    loaders: [
      {
        loader: 'babel-loader',
        query:{
          presets:['react','es2015']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules)/
      }
    ]
  },

  sassLoader: {
    includePaths:[
      path.resolve(__dirname, './node_modules/bootstrap-sass/assets'),
    ]
  },

  plugins: plugins,
  devtool: 'source-map'
}

module.exports = exportValues
