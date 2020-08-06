# react-ts-template

React + Typescript项目模板

1. webpack4
2. babel7
3. eslint
4. antd4
5. prettier
6. pwa
7. 还有一些东西

## workbox相关

[workbox官方文档](https://developers.google.com/web/tools/workbox/guides/get-started)

[workbox-webpack 配置](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)

## @loadable/component

[官方文档](https://loadable-components.com/docs/getting-started/)

## Delete `␍`eslint(prettier/prettier) 错误

git config --global core.autocrlf false

## TODO

>[Cz工具集使用介绍 - 规范Git提交说明](https://juejin.im/post/6844903831893966856)
>[从零开始配置 TypeScript 项目](https://juejin.im/post/6856410900577026061)

1. 增加Git Commit Message
  1.1 npm install -g commitizen
  1.2 commitizen init cz-conventional-changelog --yarn --dev --exact
  1.3 .cz-config.js
  1.4 npm install --save-dev @commitlint/cli
  1.5 npm install --save-dev @commitlint/config-conventional
  1.6 commitlint.config.js
  1.7 npm install husky --save-dev
  1.8 配置git commit提交时的校验钩子
2. Lint Staged

package.json husky hook里面暂时删了"pre-commit": "lint-staged",
