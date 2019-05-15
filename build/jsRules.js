const { resolve } = require('./utils')

module.exports = [
  {
    test: /\.(j|t)sx?$/,
    include: [resolve('../src')],
    use: [
      {
        loader: 'babel-loader'
      }
    ],
    exclude: /node_modules/
  }
]