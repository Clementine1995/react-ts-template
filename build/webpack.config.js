const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  /*入口*/
  entry: path.join(__dirname, '../src/index.tsx'),
  
  /*输出到dist目录，输出文件名字为bundle.js*/
  output: {
      path: path.join(__dirname, '../dist'),
      filename: '[name].js'
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { 
        test: /\.tsx?$/, 
        loader: "ts-loader" 
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 以哪个文件为模板，模板路径
      template: "public/index.html",
      // 编译后的文件名
      filename: "index.html"
    })
  ]
};
