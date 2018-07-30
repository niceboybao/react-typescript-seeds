# 简介

这里只是针对工程开发，做了如下规范，想了解更多VS Code可参考我的文章 [强大的 VS Code](https://juejin.im/post/5b123ace6fb9a01e6f560a4b)

## 1、统一自定义设置

使用快捷键 `Com + ,`或者`control + ,` 打开用户默认设置界面，左边是默认设置，右边是自定义设置，新增如下设置

```javascript
{
    // 设置格式化缩进4格
    "prettier.tabWidth": 4,
    "vetur.format.defaultFormatter.html": "prettier",
    // 创建和更新代码的头部信息作者
    "fileheader.Author": "guangwei.bao",
    "fileheader.LastModifiedBy": "guangwei.bao",
}
```

## 2、格式刷插件统一

弃用`beautify`插件,统一使用`Prettier - Code formatter`和`Prettier Now`插件

> beautify

[beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify) ：良好的拓展性，可以格式化JSON|JS|HTML|CSS|SCSS,比内置格式化好用；**但是react工程的jsx文件用beautify插件格式化会乱掉，建议不要用**

> Prettier - Code formatter

[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) ： 代码格式化插件，主要针对工程中的JavaScript / TypeScript / CSS

## 3、代码提交前先格式化（只针对react的H5工程）

## 4、一些命名规范
