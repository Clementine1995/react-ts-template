/** @format */

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    open: true,
    // hot: true, hot已经自动开启，不需要手动设置了
    client: {
      logging: 'info',
      overlay: true, //当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
      progress: true
    }
    // proxy: {
    //   '/api/v1': {
    //     target: '',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api/v1': '/api/v1'
    //     }
    //   }
    // }
  }
}

module.exports = merge(baseConfig, devConfig)
