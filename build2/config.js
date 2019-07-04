/** @format */

// const path = require('path')
const argv = require('yargs-parser')(process.argv.slice(4))
const APP_ENV = argv.env || 'dev'

const STATICDOMAIN = APP_ENV === 'prod' ? '.' : ''

module.exports = {
  APP_ENV,
  // index: path.resolve(__dirname, `./../dist/${constants.APP_ENV}/index.html`),
  // assetsRoot: path.resolve(__dirname, `./../dist/${constants.APP_ENV}`),
  assetsPublicPath: APP_ENV === 'dev' ? '/' : `${STATICDOMAIN}/`,
  assetsSubDirectory: '',
  isHash: APP_ENV === 'dev' ? 'hash' : 'chunkhash',
  // page Pattern for workbox
  // pagePattern: new RegExp(DOMAIN),
  // id you use CDN, change it!!!
  // assetsPattern: new RegExp(`${DOMAIN.replace(/\//g, '\\/')}\\/(static|vendor.dll)`),
  // production sourceMap for monitoring
  sourceMap: APP_ENV === 'dev' ? 'eval-source-map' : APP_ENV === 'prod' ? 'source-map' : false,
  extractCss: APP_ENV !== 'dev',
  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --report`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: false
}
