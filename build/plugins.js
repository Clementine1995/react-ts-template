const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CleanWebpaclPlugin = require('clean-webpack-plugin')

const {
	assetsPath
} = require('./utils')

const constants = require('./constants')
const env = require('./env.json')

const oriEnv = env[constants.APP_ENV]
Object.assign(oriEnv, {
	APP_ENV: constants.APP_ENV
})

const defineEnv = {}
for (let key in oriEnv) {
	defineEnv[`process.env.${key}`] = JSON.stringify(oriEnv[key])
}
const DLL_PATH = '../dll'

const basePlugins = [
	new webpack.DefinePlugin(defineEnv)
]

const devPlugins = [
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: 'public/index.html',
		inject: true
	}),
	new webpack.HotModuleReplacementPlugin()
]

const prodPlugins = [
	new CleanWebpaclPlugin(),
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
		filepath: path.resolve(__dirname, `${DLL_PATH}/**/*.js`),
		includeSourcemap: false
	}),
	new MiniCssExtractPlugin({
		// Options similar to the same options in webpackOptions.output
		// both options are optional
		filename: assetsPath('css/[name].[contenthash].css'),
		chunkFilename: assetsPath('css/[name].[id].[contenthash].css')
	})
]

module.exports = basePlugins.concat(constants.APP_ENV === 'dev' ? devPlugins : prodPlugins)