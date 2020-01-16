/** @format */

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        modules: false, // 生成ES6模块代码
        corejs: 3 // 2-corejs@2  3-corejs@3
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { corejs: 3, useESModules: true }],
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true // `style: true` 会加载 less 文件
      }
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-syntax-dynamic-import'
  ]
}
