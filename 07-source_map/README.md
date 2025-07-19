
# 06_source_map

这个demo用来学习source-map

# Demo说明
初始化了一个新的webpack配置


# source-map
通常运行在浏览器上的代码是通过打包压缩过后的，这与我们的原代码是有出入的，比如行列，比如使用TS写的最终变成了JS，比如ES6写的会被转换成ES5，比如很多变量名称函数名称，都经过了丑化简写。这使得我们调试打包后的代码变得非常困难，怎么调试打包后的代码，答案就是source-map。source-map是从已转换的代码，映射到原始的源文件，
使浏览器可以重构原始源并在调试器中显示重建的原始源。

# source-map使用
首先在浏览器中打开source-map相关设置，通常名称为Enable JavaScript SOurce Maps 相关字眼。

然后在webpack.config.js配置devtool即可
```javascript
const path = require("path");
module.exports = {
  mode: "development",
  devtool:'source-map',
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
  },
};
```
这样再进行打包的时候会同时在打包目录下生成对应的一个.map也就是对应的原代码。

devtool可以设置的值有非常多，官方文档进行了具体解释
- [webpack devtool 配置](https://www.webpackjs.com/configuration/devtool#root)


以上是对source-map的学习