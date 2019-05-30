const {
  assetsPath
} = require('./utils')

function getUrlloader(assetsPrefix) {
  return {
    loader: 'url-loader',
    options: {
      //1024 == 1kb  
      //小于20kb时打包成base64编码的图片否则单独打包成图片
      limit: 10240,
      name: assetsPath(`${assetsPrefix}/[name].[hash:7].[ext]`)
    }
  }
}

module.exports = [{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use: [getUrlloader('img')]
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    use: [getUrlloader('fonts')]
  }
]