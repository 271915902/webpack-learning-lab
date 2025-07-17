
# 02_webpack_img_js_vue

这个demo用来演示webpack处理图片，js文件，vue文件

# Demo说明
创建了vue_demo文件夹和App.vue文件

创建了img文件夹和图片demo.jpg


# 图片打包
webpack也会帮助我们打包图片资源，还是先引入到div_cpn.js里的img元素当中，
这样图片出现在了关系依赖图中就会被打包。
webpack现在默认内部就有处理图片的loader,只需要配置即可。
# file-loader
对png jpg gif svg后缀的文件进行打包
```javascript
{
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset",
        use: ["file-loader"],
      },
```
这里相比以往的配置多了一个type属性，这个属性有三个常见值
| value  | Description                |
| :-------- |:------------------------- |
| `asset/resource` | 将图片打包为url的形式，然后在使用的地方引入 | 
| `asset/inline` | 将图片打包为base64格式，直接在入口文件中使用| 
| `asset` |自动选择， 大文件使用图片url打包 小一点的使用base64打包 | 
如果使用了`asset`我们也可以指定文件大小的limit,通过parser对象

```javascript
  {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024, // 100kb
          },
        },
        use: ["file-loader"],
      },
```

默认的图片打包以后文件名是hash乱码，我们也可以指定输出的文件名
generator对象
加了img/就会在build目录下生成一个img文件夹去存放这些打包以后的图片
```javascript
  {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024, // 100kb
          },
        },
        generator: {
          filename: "img/[name]_[hash:6][ext]",
        },
        use: ["file-loader"],
      },
```
# 处理js
webpack默认就有处理js的功能，为什么还需要打包js呢，那是因为默认遇到es6代码，只是会做一些丑化处理，并不会转化成es5确保浏览器的兼容。
所以需要一个babel工具，babel本身也可以作为一个独立的工具来使用

# babel使用
在webpack中，我们可以通过babel-loader去打包js代码


```bash
  npm install babel-loader -D
```
babael和postcss一样，里面有很多插件需要单独下载配置，
比如我想对箭头函数语法做转化，那么就要下载相关插件

```bash
  npm install @babel/plugin-transform-arrow-functions -D
```
然后进行配置

```javascript
  {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-transform-arrow-functions"],
            },
          },
        ],
      },
```
和postcss-loader一样，也可以单独抽离一个babel的配置文件

babel.config.js
```javascript
module.exports = {
    plugins: ["@babel/plugin-transform-arrow-functions"],
  
};

```
和postcss-loader一样，babel也提供了一个预设插件

```bash
  npm install @babel/preset-env -D
```

```javascript
module.exports = {
  presets: ["@babel/preset-env"],
};

```
babel-loader的使用方法和postcss-loader很像

# 处理Vue文件
实际企业开发里，我们更多的使用的是框架，.vue文件或者.jsx文件，这些文件也是需要webpack帮助我们打包以后才能运行。

下载vue框架
```bash
  npm install vue
```
然后通过就是使用vue语法简单构建了App.vue,然后在div_cpn.js使用，
最后在index.html定义了一个id为app的div，提供给vue挂载

```JavaScript
import { createApp } from "vue";
import App from "./vue_demo/App.vue";
// vue代码
const app = createApp(App);
app.mount("#app");
```
完成上述步骤以后，使用打包同样还是报错没有相应的loader，所以需要下载vue-loader

```bash
  npm install vue-loader -D
```
```javaScript
 {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
```
和其他loader不同的是，vue-loader还需要额外配置一个plugins
```javaScript
...
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
...
module:{...}
plugins: [new VueLoaderPlugin()],
}
```
这样vue文件就可以被成功打包了。


# webpack解析文件路径
在通过import导入各种文件模块的时候，假如说导入的是index.js文件，通常是可以省略后缀.js
```JavaScript
import {demo} from "./index"
```
一开始导入vue文件的时候就需要指定后缀
```JavaScript
import App from "./App.vue"
```
这是因为webpack在解析文件的时候当发现没有后缀的时候他会默认的添加一些后缀去解析默认的是['.wasm', '.mjs', '.js', '.json']，
所以如果我们希望解析vue文件的时候不需要补充后缀名，

可以通过webpack的配置文件中resolve对象的extensions属性进行配置


同理在解析文件夹的时候如果希望默认去找文件夹下的index文件也是可以进行配置

某些时候当某个工具目录结构很深的时候我们往往需要写../../../utils/xxx才可以找到，这个时候也可以通过起别名alias进行配置
这样在导入的时候只需要utils/xxx 从而省去了很多../

```JavaScript
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"),
  },
  resolve: {
    extensions: [".js", ".vue"],
    mainFiles: ["index"],
    alias: {
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
  }
```
以上就是我对webpack打包图片,js,vue的学习。