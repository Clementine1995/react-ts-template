# react-ts-template

React + Typescript项目模板

1. webpack4
2. babel7
3. eslint
4. antd
5. prettier
6. pwa
7. 还有一些东西

VS code 校验配置

```js
{
  "eslint.enable": true,  //是否开启vscode的eslint
  "eslint.autoFixOnSave": true, //是否在保存的时候自动fix eslint
  "eslint.options": {    //指定vscode的eslint所处理的文件的后缀
    "extensions": [
      ".js",
      ".vue",
      ".ts",
      ".tsx"
    ]
  },
  "eslint.validate": [     //确定校验准则
    "javascript",
    "javascriptreact",
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ]
}
```

## workbox相关

[workbox官方文档](https://developers.google.com/web/tools/workbox/guides/get-started)

[workbox-webpack 配置](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)
