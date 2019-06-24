const {
  resolve
} = require('./utils')
const theme = require('./theme')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./config')

module.exports = [

  {
    test: /\.css$/, // 正则匹配文件路径
    exclude: /node_modules/,
    use: [
      config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader', // 解析 @import 和 url() 为 import/require() 方式处理
        options: {
          importLoaders: 1 // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
        }
      },
      'postcss-loader'
    ],
  },
  {
    test: /\.scss$/,
    include: resolve('../src'),
    use: [
      config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          includePaths: [resolve('../src/styles')]
        }
      }
    ]
  },
  {
    // for ant design
    test: /\.less$/,
    include: resolve('../node_modules'),
    use: [
      config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
      // {
      //   loader: 'css-loader',
      //   options: { localIdentName: '[name]__[local]--[hash:base64:5]' }
      // },
      'css-loader',
      'postcss-loader',
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