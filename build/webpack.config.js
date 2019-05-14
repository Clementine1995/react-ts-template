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
};
