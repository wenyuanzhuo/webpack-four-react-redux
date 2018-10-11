const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path');
const config = {
  buildPath: path.resolve(`build/localhost`),
}
const srcPath = path.resolve('./src')
const dllPath = path.resolve('./dll')
module.exports = (env, argv) => {
  console.log(`mode: ${argv.mode}`);
  return {
    module: {
      rules: [
        {
          test: /\.js|jsx$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: {
            loader: "html-loader",
            options: { minimize: true }
          }
        },
        {
          test: /\.css$/,
          use:[
            argv.mode === 'production' ? MiniCssExtractPlugin.loader: 'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
            },
          ],
        },
        {
          test: /\.sass/,
          use: [
            argv.mode !== 'production' ? MiniCssExtractPlugin.loader: 'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                indentedSyntax: true,
              },
            },
          ],
        }, 
        {
          test: /\.scss/,
          use:[
            argv.mode === 'production' ? MiniCssExtractPlugin.loader: "style-loader",
            "css-loader",
            "postcss-loader",
            {
              loader: 'sass-loader',
              options: {
                // indentedSyntax: true, 
                outputStyle: 'expanded',// nested嵌套 compact紧凑 compressed压缩 expanded延展
                // includePaths: [
                //   path.resolve(__dirname, 'node_modules')
                // ]
              }
            }
          ],
        },
        {
          test: /\.(png|jpg|gif|woff|woff2)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
      ]
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        })
      ],
      splitChunks: {
        chunks: "async",
        maxSize: 30000,
        minChunks: 1,
        maxInitialRequests: 3,
        maxAsyncRequests: 5,
        name: false,
        cacheGroups: { //cache info
          vendors: {
            test: /node_modules\/(.*)\.js/,
            chunks: 'initial',
            priority: -10,
            name: "verdor",
            reuseExistingChunk: false,
          },
          styles: {
            name: "styles",
            test: /\.(scss|css)$/,
            chunks: "all",
            reuseExistingChunk: true, //if match exactly, reuse existing chunk  
            minChunks: 1,
            enforce: true,
          }
        }
      },
      noEmitOnErrors: true,
      // runtimeChunk: true,
    },
    plugins:  [
      new webpack.DefinePlugin({
        'webpack.define.config': JSON.stringify(config)
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.ejs",
        filename: "./index.html",
        chunksSortMode: 'none',
      }),
      ...(argv.mode === 'production') ?  [
        new CleanWebpackPlugin(['dist'], {
          root: path.resolve(__dirname, '.')
        }),
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
        }),
      ]: [
        new webpack.DllReferencePlugin({
          manifest: `${dllPath}/vendor-manifest.json`
        }),
        new AddAssetHtmlWebpackPlugin({
          filepath: path.join(__dirname, './dll', 'dll.*.js')
        })
      ]
    ],
    devServer: {
      publicPath: '/',
      port: 9000,
      noInfo: false,
    },
    devtool: argv.mode === 'production' ? 'source-map': 'eval-source-map',
    //source-map 整个 source map 作为一个单独的文件生成。它为 bundle 添加了一个引用注释，以便开发工具知道在哪里可以找到它
    //eval-source-map 开发环境的最佳品质的 source map  首次构建较慢 重新构建较快 映射原始代码 同时反映正常行数
    resolve: {
      modules: [srcPath, 'node_modules'],
      extensions: ['.js', '.jsx'],
      alias: {
        src: srcPath,
        components: `${srcPath}/components`,
        container: `${srcPath}/container`,
        styles: `${srcPath}/styles`,
        reducer: `${srcPath}/reducer`,
        action: `${srcPath}/action`,
      }
    }
  }
}
