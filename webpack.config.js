const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
  const isProduction = env === 'production'
  return {
    entry: {
      index: ['babel-polyfill', './src/app.js'],
    },
    output: {
      path: path.resolve(__dirname, 'public/'),
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      })
    ],
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/scripts/'
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map'
  }
}