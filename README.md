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
>
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

3.升级webpack5

react-router-dom > react-router > mini-create-react-context@0.4.0" has incorrect peer dependency "react@^0.14.0 || ^15.0.0 || ^16.0.0".
add-asset-html-webpack-plugin@3.1.3" has incorrect peer dependency "webpack@^4.0.0".
autoprefixer@10.0.2" has unmet peer dependency "postcss@^8.1.0".
optimize-css-assets-webpack-plugin@5.0.4" has incorrect peer dependency "webpack@^4.0.0".
postcss-loader@4.0.4" has unmet peer dependency "postcss@^7.0.0 || ^8.0.1".
script-ext-html-webpack-plugin@2.1.5" has incorrect peer dependency "webpack@^1.0.0 || ^2.0.0 || ^3.0.0 || ^4.0.0".
webpack-dev-server > webpack-dev-middleware@3.7.2" has incorrect peer dependency "webpack@^4.0.0".
workbox-webpack-plugin@5.1.4" has incorrect peer dependency "webpack@^4.0.0".

"antd > rc-steps@4.1.2" has incorrect peer dependency "react@^16.0.0".
"antd > rc-steps@4.1.2" has incorrect peer dependency "react-dom@^16.0.0".
