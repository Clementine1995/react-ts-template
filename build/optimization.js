const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  runtimeChunk: {
    name: "manifest"
  },
  splitChunks: {
    cacheGroups: {
      default: false,
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'all'
      }
    }
  },
  minimizer: [
    new TerserPlugin({
      sourceMap: true,
      terserOptions: {
        compress: {
          warnings: true,
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log']// 移除console
        }
      }
    }),
    new OptimizeCssAssetsPlugin ({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        reduceIdents: false,
        autoprefixer: false
      }
    })
  ]
}