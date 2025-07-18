
# 05_webpack_server

这个demo用来演示webpack中开启本地服务器

# Demo说明
添加了本地服务相关配置


# 为什么要搭建本地服务器？
目前有代码更新的时候webpack打包，需要输入命令，然后再打开浏览器查看。
这个过程经常操作会影响我们的开发效率，我们希望可以做到，当文件发生变化时，可以自动的完成编译和展示；

# webpack-dev-server
借助这个库就可以帮助我们实现

安装
```bash
  npm install webpack-dev-server -D
```

配置packge.json

```javascript
 "scripts": {
    "build": "webpack",
    "serve": "webpack serve"
  },
```
这样当npm run serve的时候就会在本地开启一个本地服务器，当监听到代码变化，自动帮助我们去打包。

# server配置
针对本地服务器也可以进行一些配置


```javascript
//  其他省略
module.exports = {
  ...
  devServer: {
    hot: true,
    port: 8080,
    open: true,
    compress: true,
  },
};
```

| 参数 |  描述                        |
| :-------- |  :-------------------------------- |
| `hot`      | 开启热更新，默认为true |
| `port`      | 本地服务跑在哪个端口 |
| `open`      | 运行完命令是否自动打开浏览器 |
| `compress`      | 是否为静态文件开启gzip |

以上是对webapck开启本地服务器的一个简单了解使用