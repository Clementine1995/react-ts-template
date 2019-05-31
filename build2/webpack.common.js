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

const defineEnv = {}
for (let key in oriEnv) {
	defineEnv[`process.env.${key}`] = JSON.stringify(oriEnv[key])
}


module.exports={
  entry: resolve('../src/index.tsx'),
  output: {
    filename: 'js/[name].js',
    path: resolve('../dist')
  },
  module: {
    rules:[
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
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
          loader: 'url-loader',
          options: {
            //1024 == 1kb  
            //小于20kb时打包成base64编码的图片否则单独打包成图片
            limit: 10240,
            name: assetsPath('img/[name].[hash:7].[ext]')
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            //1024 == 1kb  
            //小于20kb时打包成base64编码的图片否则单独打包成图片
            limit: 10240,
            name: assetsPath('font/[name].[hash:7].[ext]')
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
    alias: {
      '@': resolve('../src'),
      "@ant-design/icons/lib/dist$": resolve('../src/icons.ts'),
      '@components': resolve('../src/components')
    }
  },
  performance: { // 性能提示，可以提示过大文件
    hints: "warning", // 性能提示开关 false | "error" | "warning"
    maxAssetSize: 100000, // 生成的文件最大限制 整数类型（以字节为单位）
    maxEntrypointSize: 100000, // 引入的文件最大限制 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
        // 提供资源文件名的断言函数
        return (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetFilename))
    }
  },
  plugins: [
    new webpack.DefinePlugin(defineEnv)
  ]
}