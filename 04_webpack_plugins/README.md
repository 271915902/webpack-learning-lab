
# 04_webpack_plugins

这个demo用来演示webpack中插件的简单使用

# Demo说明
添加了一个插件相关的配置


# plugin
plugin是webpack另一个核心的东西，如果说loader是处理特定文件的，那么插件就是做除了loader可以做的所有事情，比如资源管理，打包优化，变量注入等等。

# HtmlWebpackPlugin
目前打包后的文件我们可以看到build目录下只有一个bundle.js,部署项目是要部署build目录，但是缺少了html文件是没有办法部署的，每次部署前自己写一个html文件也很麻烦，所以通过这个插件可以帮助我们每次打包的时候生成一个html文件。

安装
```bash
  npm install html-webpack-plugin -D
```

配置

```javascript
 const HtmlWebpackPlugin = require("html-webpack-plugin");
//  其他省略
module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      title: "hello world",
      template: "./src/index.html",
    }),
  ],
};
```
配置以后在每次打包后会帮助我们自动在build目录下生成一个html文件。
也可以给这个函数传递参数

| 参数 |  描述                        |
| :-------- |  :-------------------------------- |
| `title`      | 生成的html文件中title标签里的内容 |
| `template`      | 参考当前项目里的html生成 |

# DefinePlugin
通过HtmlWebpackPlugin生成的html模板里面会有语法<% 变量%>，这个是EJS模块填充数据的方式，这些变量读取不到就会报错，我们可以通过DefinePlugin去定义一些全局的变量，在项目的任何地方都可以访问到



安装
这个是webpack内置插件不需要安装

配置

```javascript
 const DefinePlugin = require("webpack/lib/DefinePlugin");
//  其他省略
module.exports = {
  ...
  plugins: [
   new DefinePlugin({
      value: JSON.stringify("hello world"),
    }),
  ],
};
```

这样定义的变量在任何地方都可以访问到了。

# Mode配置
webpack还有一个mode的配置，分为三个值

| 参数      |  描述                        |
| :-------- |  :-------------------------------------- |
| `development`      | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development. 为模块和 chunk 启用有效的名。 |
| `production`      | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。为模块和 chunk 启用确定性的混淆名称。 |
| `none`      | 不使用任何默认优化选项 |


修改了mode也会默认开启很多与之相关的配置，具体可以查看文档。
一般开发中根据当前环境设置即可。


```javascript
//  其他省略
module.exports = {
 mode:"xxxx"
};
```

以上是对webpack插件的简单使用
