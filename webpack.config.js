const path = require('path')

module.exports = {
  entry: {
    index: ['babel-polyfill', './src/app.js']
  },
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: '[name]-bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      }
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader', // inject styles into DOM
        'css-loader', // compiles css into js
        'sass-loader' // compiles sass into css
      ]
    }]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    publicPath: '/scripts/'
  },
  devtool: 'source-map'
}