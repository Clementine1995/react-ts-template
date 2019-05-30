const webpack=require('webpack')
const merge = require('webpack-merge')
const baseConfig=require('./webpack.base')

const devConfig={
  mode: 'development', 
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  },
  devServer: {
    contentBase: './dist',
    // open: true, //自动打开浏览器
    // port: 8080,
    hot: true,//启用webpack的热模块替换功能
    //hotOnly: true&emsp;
    //devServer.hot在没有页面刷新的情况下启用热模块替换作为构建失败时的后备
  }
}

module.exports=merge(baseConfig,devConfig)