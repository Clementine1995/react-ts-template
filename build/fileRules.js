const {
  assetsPath
} = require('./utils')

function getUrlloader(assetsPrefix) {
  return {
    loader: 'url-loader',
    options: {
      limit: 10000,
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