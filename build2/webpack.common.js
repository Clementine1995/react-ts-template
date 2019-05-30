const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')

module.exports={
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'dist')
  },
  module: {
    rules:[
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]', 
            outputPath: 'images/', 
            limit: 2048           
          }
        }
      },
      {
        test: /\.css$/,
        use:[
          'style-loader',
          'css-loader',
          'postcss-loader' 
        ]
      },
      {
        test: /\.scss$/,
        use:[
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true 
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
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
    new htmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new cleanWebpackPlugin(),
  ]
}