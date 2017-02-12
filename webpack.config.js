const path = require('path');
const webpack = require('webpack');
// const WebpackErrorNotificationPlugin = require('webpack-error-notification');
// const WebpackNotifierPlugin = require('webpack-notifier');


module.exports = function (env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  return {
    context: path.resolve( __dirname, './app' ),

    entry: {
      app: [
        './app.jsx',

        // bootstrap js
        //'bootstrap-sass/assets/javascripts/bootstrap.js',
        // or individual bootstrap files
        //'bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
        //'script!bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
      ]
    },

    output: {
      path: path.resolve(__dirname, './public'),
      filename: 'bundle.js',
    },
    resolve: {
      modules: [
        "./app/redux",
        "./app/components",
        './app/components/dockeditor',
        './app/components/dockeditor/componentpicker',
        './app/components/dockeditor/svg',
        './app/components/dockeditor/components',
        "node_modules"
      ],
      alias: {
        initialState: path.resolve(__dirname, './app/initialState.jsx'),
        applicationStyles:  path.resolve(__dirname,'./app/styles/app.scss')
      },
      extensions: [".js", ".jsx"],
    },


    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
      }),
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
      }),
    ],

    module: {
      rules: [
        {
          test: /\.jsx$/,
          use: [
            'babel-loader',
            {
              loader: 'babel-loader',
              options: { presets: ['react','es2015'] },
            },
          ],
        },
        {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: [path.resolve(__dirname, './node_modules/bootstrap-sass/assets')]
                    }
                }]
            }
      ],
    },
    devtool: 'source-map'
  }
}
