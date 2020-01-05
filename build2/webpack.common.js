/** @format */

const config = require('./config')
const { assetsPath, resolve } = require('./utils')
const theme = require('./theme')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = require('./env.json')
const oriEnv = env[config.APP_ENV]
Object.assign(oriEnv, {
  APP_ENV: config.APP_ENV
})

// 根据不同环境引入不同变量的问题也可以通过域名来解决，这样就免去了这个插件的使用
const defineEnv = {}
for (const key in oriEnv) {
  defineEnv[`process.env.${key}`] = JSON.stringify(oriEnv[key])
}

module.exports = {
  entry: resolve('../src/index.tsx'),
  output: {
    filename: `js/[name].[${config.isHash}].js`,
    path: resolve('../dist')
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [resolve('../src')],
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/, // 正则匹配文件路径
        // include: resolve('../node_modules/antd'),
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
        ]
      },
      {
        test: /\.scss$/,
        include: resolve('../src'),
        use: [
          // MiniCssExtractPlugin不会热更新，所以本地开发的时候还是用style-loader
          config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [resolve('../src/styles')]
              }
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
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              //1024 == 1kb
              //小于10kb时打包成base64编码的图片否则单独打包成图片
              limit: 10240,
              name: assetsPath('img/[name].[hash:7].[ext]')
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              //1024 == 1kb
              limit: 10240,
              name: assetsPath('font/[name].[hash:7].[ext]')
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
    alias: {
      '@': resolve('../src'),
      '@ant-design/icons/lib/dist$': resolve('../src/icons.ts'),
      '@components': resolve('../src/components'),
      _img: resolve('../src/assets/img')
    }
  },
  plugins: [new webpack.DefinePlugin(defineEnv)]
}
