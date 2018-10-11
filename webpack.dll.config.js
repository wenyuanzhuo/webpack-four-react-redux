const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports = {
entry: {
    vendor: ['antd']
  },
  output: {
    path: path.join(__dirname, './dll'),
    filename: 'dll.[name].[hash:16].js',
    library: '[name]'
  },
  plugins: [
    new CleanWebpackPlugin(['dll'],{
      root: path.join(__dirname, '.'),
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, './dll', '[name]-manifest.json'),
      name: '[name]'
    })
  ],
  devtool: 'inline-source-map',
  mode: 'production',
  module: {
    rules: [{
      test: /\.(js|jsx)?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
      },
    }],
  },
}