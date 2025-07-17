
# 02_webpack_css

这个demo用来演示webpack处理css和less文件

# Demo说明
创建了component文件夹，以及div_cpn.js

创建了css文件夹，以及div_style.css和div_style.less
```javascript
import "../css/div_style.css";
import "../css/div_style.less";

const divEl = document.createElement("div");

divEl.textContent = "Hello Webpack";
divEl.classList.add("div-cpn");

document.body.appendChild(divEl);

// 创建第二个元素
const divEl2 = document.createElement("div");
divEl2.textContent = "Hello Webpack 2";
divEl2.classList.add("div-cpn1");
document.body.appendChild(divEl2);
```
两个样式分别对应了，div_cpn.js里创建的两个元素

# 关系依赖图
webpack在处理应用程序时，会根据命令从入口文件开始生成一个依赖关系图，这个依赖关系图会包含应用程序中所需的所有模块（比如.js文件、css文件、图片、字体等）；
然后遍历图结构，打包一个个模块，
简单来说就是该文件有没有被使用，被使用就会出现在我们的依赖图上，就会被打包
# 处理css
所以当我想让css被打包，我需要让它出现在关系依赖图中，也就是导入并且使用，这样webpack就会去打包他。
但是当我运行打包命令后会出现了报错，其中这句话`You may need an appropriate loader to handle this file type`,告诉了我需要一个`loader`的东西去帮我处理css。
# 什么是loader?
css文件可以被看作是一个模块，当它被import进来的时候，webpack并不知道如何去处理它，所以loader就是对模块进行转换处理的工具，比如我们写react的.jsx，vue的.vue文件这些文件都是需要一个对应的loader才可以被处理。
# css-loader 安装
目前代码里并没有处理css的loader，所以需要安装
```bash
  npm install css-loader -D
```
# css-loader 使用
使用loader需要去webpack的config文件中进行配置
新添加一个module对象，通过rules数组进行配置，test是需要匹配的文件的正则表达式，这里是匹配所有.css结尾的文件，use表示使用什么loader。对css使用css-loader如下：
```javascript
 module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "css-loader",
        ],
      },

```
# style-loader 使用
虽然说css-loader成功解析了.css文件，但是webpack还是不认识我们写的样式，所以还需要一个专门解析样式的style-loader

```bash
  npm install style-loader -D
```
use数组是从右往左的顺序，所以是先解析.css文件再去解析样式
```javascript
 module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader"
          "css-loader",
        ],
      },

```
# less-loader 使用
同理如果是.less文件，只需要下载对应的loader并且进行配置

```bash
  npm install less-loader -D
```
```javascript
 module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  ```

  # postcss-loader使用
比如我们加一些比较新的css样式的时候，往往会需要额外添加一些用来兼容的前缀，随着样式越来越多每次加也会变得很繁琐，postcss是一个通过JavaScript来转换样式的工具；
这个工具可以帮助我们进行一些CSS的转换和适配，比如自动添加浏览器前缀、css样式的重置。
```bash
  npm install postcss-loader -D
```
但是实现这些功能，我们需要借助于postcss对应的插件
添加样式前缀插件
```bash
  npm install autoprefixer -D
```
插件配置
```javascript
 module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader","postcss-loader"],
      },
    ],
  },
```
use里针对插件单独配置可以再写一个对象，这里给postcss-loader又配置了autoprefixer插件，但是这样会让webpack配置变得冗余，所以可以单独抽离出来针对postcss的配置文件

新建一个postcss.config.js文件  （固定命名）
```javascript
module.exports = {
  plugins: ["autoprefixer"],
};
```
这样原本的webpack配置文件就变得更加简洁
```javascript
 module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
         "postcss-loader"
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader","postcss-loader"],
      },
    ],
  },
```
# postcss-preset-env使用
事实上，在使用postcss-loader有一个更加方便的插件，叫做postcss-preset-env,这个插件预设了很多操作，包括且不限于autoprefixer并且更加好用。
所以只需要下载
```bash
  npm install postcss-preset-env -D
```
把原来的autoprefixer修改为postcss-preset-env即可
```javascript
module.exports = {
  plugins: ["postcss-preset-env"],
};
```
以上就是样式相关的loader处理。
