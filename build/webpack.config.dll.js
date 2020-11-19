/** @format */

const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('./utils')

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom']
  },
  output: {
    filename: '[name].dll.[fullhash:8].js',
    path: resolve('../dll'),
    // 链接库 输出方式 默认'var'形式赋给变量
    libraryTarget: 'var',
    // 全局变量名称 导出库将被以var的形式赋给这个全局变量 通过这个变量获取到里面模块
    library: '_dll_[name]_[fullhash:8]'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [resolve('../dll/**/*')]
    }),
    new webpack.DllPlugin({
      // path 指定manifest文件的输出路径
      path: resolve('../dll/[name].manifest.json'),
      // 和library 一致，输出的manifest.json中的name值
      name: '_dll_[name]_[fullhash:8]'
    })
  ]
}
