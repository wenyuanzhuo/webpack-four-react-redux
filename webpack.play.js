const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')
module.exports = () => {
  return {
    entry: {
      paly: path.resolve(__dirname, './play.js')
    },
    output: {
      path: path.resolve('./local'),
      filename: '[name].js?[hash:6]',
    },
    module: {
      rules: [{
        test: path.resolve(__dirname, './play.js'),
        use: [{
          loader: 'babel-loader',
        }]
      }]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.resolve('./play.ejs'),
        filename: 'play.html'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      publicPath: '/',
      hot: true,
      port: 8000,
      host: 'localhost',
      contentBase: '/'
    }
  }
}