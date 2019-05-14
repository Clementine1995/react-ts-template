const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { resolveAssetsRootDir } = require('./utils')

module.exports = [
  new HtmlWebpackPlugin({
    // 以哪个文件为模板，模板路径
    template: "public/index.html",
    // 编译后的文件名
    filename: "index.html",
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  }),
  new MiniCssExtractPlugin({
    filename: resolveAssetsRootDir('css/[name].css')
  })
]