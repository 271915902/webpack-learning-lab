
# 06_webpack_dev_prod

这个demo用来演示webpack中区分开发生产环境配置

# Demo说明
添加了dev,prod,common的webpack配置


# 区分环境
目前针对所有环境的webpack配置都写在了一个配置文件中，实际开发中往往针对开发环境和生产环境的配置是不一样的，所以需要区分不同的环境

首先创建两套不同的配置文件放在config文件夹下

然后添加两个不同的脚本命令
```javascript
"scripts": {
    "prod": "webpack --config ./config/webpack.prod.config.js",
    "dev": "webpack --config ./config/webpack.dev.config.js"
  },
```
这样便可以针对不同的环境去运行不同的配置文件

不同环境的配置往往会有一些公共的配置可以单独抽离出一个common配置文件

webpack.comm.config.js

然后通过merge函数和其他两个环境进行合并

```javascript
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.config.js");

module.exports = merge(commonConfig, {
  mode: "development",
  devServer: {
    hot: true,
    port: 8080,
    open: true,
    compress: true,
  },
});
```

以上是对区分环境配置的学习


