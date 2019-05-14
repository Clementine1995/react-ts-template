const { resolve } = require('./utils')
const theme = require('./theme')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
  {
    test: /\.scss$/,
    include: resolve('../src'),
    use: [
      // 'style-loader',
      MiniCssExtractPlugin.loader, // 应该生产环境开启
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          includePaths: [resolve('../src/styles')]
        }
      }
    ]
  },
  {
    test: /\.less$/,
    include: resolve('../node_modules'),
    use: [
      // 'style-loader',
      MiniCssExtractPlugin.loader, // 应该生产环境开启
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
          modifyVars: theme
        }
      }
    ]
  }
]