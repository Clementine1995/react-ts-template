const { resolve } = require('./utils')
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = [
  { 
    // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
    // 可以使用react-hot-loader
    test: /\.tsx?$/, 
    loader: "ts-loader",
    options: {
      transpileOnly: true,
      getCustomTransformers: () => ({
        before: [ tsImportPluginFactory({
          libraryName: 'antd',
          libraryDirectory: 'lib',
          // with less
          style: true
        })]
      }),
      compilerOptions: {
        module: 'es2015'
      }
    },
    exclude: /node_modules/
  }
]