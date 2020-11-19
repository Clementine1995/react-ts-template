/** @format */

const { merge } = require('webpack-merge')
const config = require('./config')
const baseConfig = require('./webpack.common')
// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { assetsPath } = require('./utils')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

// const workboxPlugin = require('workbox-webpack-plugin')

// const DLL_PATH = '../dll'

const prodConfig = {
  mode: 'production',
  devtool: 'nosources-source-map', // source-map 是完整的不过体积大很多
  optimization: {
    // 性能配置
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    }, // 开启 manifest 缓存，每个入口单独创建
    moduleIds: 'deterministic', // The value 'hashed' for option 'optimization.moduleIds' is deprecated. Use 'deterministic' instead.
    splitChunks: {
      chunks: 'async', // 提取的 chunk 类型，all: 所有，async: 异步，initial: 初始
      // minSize: 30000, // 默认值，新 chunk 产生的最小限制 整数类型（以字节为单位）
      // maxSize: 0, // 默认值，新 chunk 产生的最大限制，0为无限 整数类型（以字节为单位）
      // minChunks: 1, // 默认值，新 chunk 被引用的最少次数
      // maxAsyncRequests: 5, // 默认值，按需加载的 chunk，最大数量
      // maxInitialRequests: 3, // 默认值，初始加载的 chunk，最大数量
      // name: true, // 默认值，控制 chunk 的命名
      automaticNameDelimiter: '-', // 默认值 ~
      cacheGroups: {
        // 配置缓存组
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: 10, // 优先级
          reuseExistingChunk: false, // 允许复用已经存在的代码块
          test: /node_modules\/(.*)\.js/
        },
        common: {
          name: 'common',
          chunks: 'initial',
          // test: resolve("src/components"), // 可自定义拓展你的规则
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        // cache: true, 也没用了与 webpack 5 不能兼容
        // parallel: true, // 提高构建速度用的
        terserOptions: {
          compress: {
            warnings: true,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log'] // 移除console
          }
        }
        // sourceMap: true // 这个配置项没了
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
  performance: {
    // 性能提示，可以提示过大文件
    hints: 'warning', // 性能提示开关 false | "error" | "warning"
    maxAssetSize: 100000, // 生成的文件最大限制 整数类型（以字节为单位）
    maxEntrypointSize: 100000, // 引入的文件最大限制 整数类型（以字节为单位）
    assetFilter: function (assetFilename) {
      // 提供资源文件名的断言函数
      return /\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetFilename)
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new webpack.DllReferencePlugin({
    //   manifest: require(`${DLL_PATH}/vendor.manifest.json`)
    // }),
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
      }
    }),
    // new AddAssetHtmlPlugin({
    //   // files: [], // 默认会将下面匹配文件加入到所有HtmlWebpackPlugin指定的资源中，可以指定加入到那些里
    //   filepath: resolve(`${DLL_PATH}/**/*.js`),
    //   includeSourcemap: false,
    //   outputPath: assetsPath('js'),
    //   publicPath: 'js'
    // }),
    new ScriptExtHtmlWebpackPlugin({
      //`runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime\..*\.js$/
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: assetsPath('css/[name].[contenthash:8].css'),
      chunkFilename: assetsPath('css/[name].[id].[contenthash:8].css')
    })
    // new workboxPlugin.GenerateSW({
    //   swDest: 'sw.js',
    //   clientsClaim: true,
    //   skipWaiting: true
    //   // runtimeCaching: []
    // }),
    // new workboxPlugin.InjectManifest({
    //   swSrc: './src/sw.js'
    // })
  ]
}

if (config.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  prodConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(baseConfig, prodConfig)
