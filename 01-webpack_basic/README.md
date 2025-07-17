
# 01_webpack基础

这个demo主要是了解webpack以及简单的使用


## 为什么使用webpack?

-  浏览器原生对 ES Modules (ESM) 的支持相对较晚且有限，老浏览器完全不支持。项目规模增大时，手动管理`<script>`标签顺序和依赖关系极其困难且容易出错。
- 现代前端项目不仅仅是 JavaScript，还包括 CSS（Sass/Less/Stylus）、图片、字体、数据文件（JSON, CSV）、模板（Vue, JSX）等。浏览器无法直接处理非 JS 资源或较新的 JS 语法（如 JSX, TypeScript）。
- 需要对构建过程进行更复杂的操作，如代码压缩、环境变量注入、生成 HTML 文件、拷贝静态资源、分析包大小、实现热更新等。
- ...
针对以上种种前端开发中的痛点webpack这一前端构建工具可以帮助我们更好的去进行开发。



## Demo说明

首先我创建了一个`index.js`文件,并且创建了一个`utils`目录，在其中导出了一个`add`函数,然后在`index.js`导入并使用

index.js

```javascript
import { add } from "./utils/add";
const text = "hello webpack";
console.log(add(1, 2));
console.log(text);
```
add.js
```javascript
export function add(a, b) {
  return a + b;
}
  
```

## 那么这个`index.js`文件可以通过`html`引入并且运行在浏览器上吗？
我认为是不一定的，我使用了`模块化`引入，浏览器是不一定可以兼容和支持的。
所以需要借助webpack帮我去打包代码让他变得可以被浏览器兼容和认识。

## 安装webpack

初始化项目
```bash
  npm init -y 
```

安装webpack 和 webpack-cli

（这里使用局部安装而不是全局安装，考虑到我们的电脑中一般有不止一个项目，而这些项目也不一定是同一个webpack版本，所以针对不同的项目进行局部安装，也方便管理和维护。）

```bash
  npm install webpack webpack-cli -D
```

打包代码

```bash
  npx webpack 
```
## 打包完毕

打包结束以后我们会发现文件根目录下有一个`dist`文件夹，`dist`文件夹下的`main.js` 便是打包以后的代码,这个时候新建一个`html`文件引入`dist/main.js`，代码便成功的运行了。

## 修改打包入口文件名
 如果把`index.js`改名为`main.js`这个时候再去打包，控制台会进行报错，原因是当使用webpack打包命令的时候，默认的入口文件就是`index.js`，如果我们想改变入口文件名，需要修改命令
```bash
  npx webpack --entry ./src/xxx.js 
```
## 修改打包出口文件目录和文件名
 默认的打包出口目录是`dist` 出口文件名是`main.js`

 修改目录名
```bash
  npx webpack --output-path ./build 
```
 修改文件名
```bash
  npx webpack --output-filename bundle.js
```
## 生成配置文件
每次输入这么多命令难免会有些繁琐，所以可以通过生成一个配置文件去配置webpack
webpack中默认的配置文件名是`webpack.config.js`
可以把上述的入口出口文件名都配置在这个配置文件里
这里使用了path模块是因为webpack需要一个绝对路径，使用`path.resolve`方法去生成
```javascript
const path = require("path");
module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"),
  },
};
  
```
## 配置脚本命令
可以在packge.json中配置一个打包的脚本命令

```javascript
"scripts": {
    "build": "webpack"
  },
  
```
这样以后打包直接输入脚本命令就可以了
```bash
  npm run build
```
以上就是我对webpack的一个初体验。


