var webpack = require('webpack');
var WebpackErrorNotificationPlugin = require('webpack-error-notification');
var WebpackNotifierPlugin = require('webpack-notifier');
var path = require('path');

var exportValues = {}

// if -p (production)
const production = process.argv.indexOf("-p") != -1 ? true : false

// these files are used for both dev and production
const entryFiles = [
  'script!jquery/dist/jquery.min.js',
  // all bootstrap js
  //'script!bootstrap-sass/assets/javascripts/bootstrap.js',
  // or individual files
  //'script!bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
  //'script!bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
  './app/app.jsx'
  ]

// these files are used for both dev and production
const modulesDirectories = [
    'node_modules',
    './app/redux',
    './app/components',
    './app/components/dockeditor',
    './app/components/dockeditor/componentpicker',
    './app/components/dockeditor/svg',
    './app/components/dockeditor/components/',
  ]

if( production ) {

  /////////////////////
  // production
  /////////////////////

  exportValues = {
    entry: entryFiles,
    externals: {
      jquery: 'jQuery'
    },
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
      }),
      new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          output: {
            comments: false,
          },
          minimize: true
      }),
      new webpack.optimize.DedupePlugin(),
      new WebpackErrorNotificationPlugin(),
      new WebpackNotifierPlugin({title: 'Webpack', excludeWarnings: true}),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ],
    output: {
      path: __dirname,
      filename: './public/bundle.js',
      sourceMapFilename: '[file].map'
    },
    resolve: {
      root: __dirname,
      modulesDirectories: modulesDirectories,
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
          exclude: /(node_modules|bower_components)/
        }
      ]
    },
    sassLoader: {
      includePaths:[
        path.resolve(__dirname, './node_modules/bootstrap-sass/assets'),
      ]
    },
    devtool: 'source-map'
  }
} else {

  ////////////////////
  // dev
  ////////////////////

  exportValues = {
    entry: entryFiles,
    externals: {
      jquery: 'jQuery'
    },
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
      }),
      new webpack.optimize.DedupePlugin(),
      new WebpackErrorNotificationPlugin(),
      new WebpackNotifierPlugin({title: 'Webpack', excludeWarnings: true})
    ],
    output: {
      path: __dirname,
      filename: './public/bundle.js',
      sourceMapFilename: '[file].map'
    },
    resolve: {
      root: __dirname,
      modulesDirectories: modulesDirectories,
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
          exclude: /(node_modules|bower_components)/
        }
      ]
    },
    sassLoader: {
      includePaths:[
        path.resolve(__dirname, './node_modules/bootstrap-sass/assets'),
      ]
    },
    devtool: 'cheap-source-map'
  }
}

module.exports = exportValues
// const path = require('path');
// const webpack = require('webpack');
// const WebpackNotifierPlugin = require('webpack-notifier');
//
// module.exports = function (env) {
//   const nodeEnv = env && env ? 'production' : 'development'
//
//   return {
//     context: path.resolve( __dirname, './app' ),
//
//     entry: {
//       app: [
//         './app.jsx',
//         // all of bootstrap js
//         //'bootstrap-sass/assets/javascripts/bootstrap.js',
//         // or individual bootstrap files
//         //'bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
//         //'script!bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
//       ]
//     },
//
//     output: {
//       path: path.resolve(__dirname, './public'),
//       filename: 'bundle.js',
//     },
//     resolve: {
//       modules: [
//         "./app/redux",
//         "./app/components",
//         './app/components/dockeditor',
//         './app/components/dockeditor/componentpicker',
//         './app/components/dockeditor/svg',
//         './app/components/dockeditor/components',
//         "node_modules"
//       ],
//       alias: {
//         initialState: path.resolve(__dirname, './app/initialState.jsx'),
//         applicationStyles:  path.resolve(__dirname,'./app/styles/app.scss')
//       },
//       extensions: [".js", ".jsx"],
//     },
//
//     plugins: [
//       new webpack.ProvidePlugin({
//         '$': 'jquery',
//         'jQuery': 'jquery',
//       }),
//       new webpack.DefinePlugin({
//         'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
//       }),
//       new WebpackNotifierPlugin()
//     ],
//
//     module: {
//       rules: [
//         {
//           test: /\.(js|jsx)$/,
//           use: [
//             'babel-loader',
//             {
//               loader: 'babel-loader',
//               options: { presets: ['react','es2015'] },
//             },
//           ],
//         },
//         {
//           test: /\.scss$/,
//           use: [{
//               loader: "style-loader"
//           }, {
//               loader: "css-loader"
//           }, {
//               loader: "sass-loader",
//               options: {
//                   includePaths: [path.resolve(__dirname, './node_modules/bootstrap-sass/assets')]
//               }
//           }]
//         }
//       ],
//     },
//     devtool: 'source-map'
//   }
// }
