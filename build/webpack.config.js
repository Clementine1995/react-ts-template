/** @format */

const config = require('./config')
const plugins = require('./plugins')
const { resolve } = require('./utils')
const jsRules = require('./jsRules')
const styleRules = require('./styleRules')
const optimization = require('./optimization')

module.exports = {
  /*入口*/
  entry: resolve('../src/index.tsx'),

  /*输出到dist目录，输出文件名字为bundle.js*/
  output: {
    path: resolve('../dist'),
    filename: 'js/[name].js'
  },
  devtool: config.sourceMap,
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    overlay: {
      //当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
      errors: true
    },
    inline: true,
    hot: true
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
  },
  module: {
    rules: [...jsRules, ...styleRules]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
    alias: {
      '@': resolve('../src'),
      '@components': resolve('../src/components')
    }
  },
  plugins: [...plugins],
  optimization
}
