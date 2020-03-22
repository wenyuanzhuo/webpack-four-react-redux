const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const AntdScssThemePlugin = require('antd-scss-theme-plugin');
// const Dashboard = require('webpack-dashboard')
const DashboardPlugin = require('webpack-dashboard/plugin')

const path = require('path');
const config = {
  buildPath: path.resolve(`build/localhost`),
}
const srcPath = path.resolve('./src')
const dllPath = path.resolve('./dll')

// const dashboard = new Dashboard()

module.exports = (env, argv) => {
  console.log(`mode: ${argv.mode}`);
  return {
    entry: {
      app: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
      path: path.resolve('./dist'),
      filename: '[name].js?[hash:6]',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.js|jsx$/,
          exclude: [ /node_modules/, /server/],
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "awesome-typescript-loader"
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
            AntdScssThemePlugin.themify({
              loader: 'sass-loader',
              options: {
                // indentedSyntax: true, 
                outputStyle: 'expanded',// nested嵌套 compact紧凑 compressed压缩 expanded延展
              }
            })
          ],
        },
        {
          test: /\.less/,
          use: [
            argv.mode === 'production' ? MiniCssExtractPlugin.loader: "style-loader",
            'css-loader',
            'postcss-loader',
            'less-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif|woff|woff2|svg)$/,
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
        new TerserPlugin(),
      ],
      splitChunks: {
        chunks: "async",
        minSize: 30000,
        minChunks: 1,
        maxInitialRequests: 3,
        maxAsyncRequests: 5,
        name: false,
        cacheGroups: { //cache info
          vendor: {
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
      new AntdScssThemePlugin('./theme.scss'),
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
        }),
        new webpack.HotModuleReplacementPlugin()
      ],
      new DashboardPlugin()
    ],
    devServer: {
      historyApiFallback: true,
      hot: true,
      publicPath: '/',
      port: 8001,
      noInfo: false,
      host: '0.0.0.0',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Credentials': true
      },
      proxy: {
        "/api": { // mock
          target: "http://mock.videojj.com/mock/5b8ca8a2380a47002f43587e/example",
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        },
        "/demo": {//python server
          target: "http://192.168.2.230:5000/demo",
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/demo': ''
          }
        },
        "/img": {// get
          target: "http://localhost:3000/img",
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/img': ''
          }
        },
        "/test": {// post test
          target: "http://localhost:3000/test",
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/test': ''
          }
        },
      }
    },
    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    //source-map 整个 source map 作为一个单独的文件生成。它为 bundle 添加了一个引用注释，以便开发工具知道在哪里可以找到它
    //eval-source-map 开发环境的最佳品质的 source map  首次构建较慢 重新构建较快 映射原始代码 同时反映正常行数 但是不利于调试
    resolve: {
      modules: [srcPath, 'node_modules'],
      extensions: ['.js', '.jsx', 'ts', 'tsx', 'json'],
      alias: {
        src: srcPath,
        components: `${srcPath}/components`,
        container: `${srcPath}/container`,
        styles: `${srcPath}/styles`,
        reducer: `${srcPath}/reducer`,
        action: `${srcPath}/action`,
        layouts: `${srcPath}/layouts`,
        common: `${srcPath}/common`,
        routes: `${srcPath}/routes`,
        assets: `${srcPath}/assets`,
        utils: `${srcPath}/utils`,
        mock: `${srcPath}/mock`,
      }
    }
  }
}
