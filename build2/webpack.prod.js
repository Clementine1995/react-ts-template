const merge = require('webpack-merge')
const config = require('./config')
const baseConfig = require('./webpack.common')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const {
  assetsPath,
  resolve
} = require('./utils')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const DLL_PATH = '../dll'

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  optimization: { // 性能配置
    runtimeChunk: true, // 开启 manifest 缓存，每个入口单独创建
    splitChunks: {
      chunks: 'async', // 提取的 chunk 类型，all: 所有，async: 异步，initial: 初始
      // minSize: 30000, // 默认值，新 chunk 产生的最小限制 整数类型（以字节为单位）
      // maxSize: 0, // 默认值，新 chunk 产生的最大限制，0为无限 整数类型（以字节为单位）
      // minChunks: 1, // 默认值，新 chunk 被引用的最少次数
      // maxAsyncRequests: 5, // 默认值，按需加载的 chunk，最大数量
      // maxInitialRequests: 3, // 默认值，初始加载的 chunk，最大数量
      // name: true, // 默认值，控制 chunk 的命名
      cacheGroups: { // 配置缓存组
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: 20, // 优先级
          reuseExistingChunk: false, // 允许复用已经存在的代码块
          test: /node_modules\/(.*)\.js/,
        },
        common: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true
        }
      },
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        // parallel: true,
        terserOptions: {
          compress: {
            warnings: true,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log'] // 移除console
          }
        },
        sourceMap: Boolean(config.sourceMap)
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          reduceIdents: false,
          autoprefixer: false,
          safe: true,
          discardComments: {
            removeAll: true
          }
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require(`${DLL_PATH}/vendor.manifest.json`)
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new AddAssetHtmlPlugin({
      filepath: resolve(`${DLL_PATH}/**/*.js`),
      includeSourcemap: false
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: assetsPath('css/[name].[contenthash].css'),
      chunkFilename: assetsPath('css/[name].[id].[contenthash].css')
    })
  ]
}

if (config.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  prodConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(baseConfig, prodConfig)