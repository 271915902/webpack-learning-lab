01.webpack 的基本使用
随着前端项目的蓬勃发展,前端项目的代码量也在不断增加，而项目的代码量增加，就会导致项目的维护成本不断增加，所以需要一个工具来帮助我们管理项目的代码，这个工具就是 webpack。
举个例子：不论是我们写 React 还是写 Sass 浏览器都是不认识我们写的代码的，但是 webpack 可以将我们写的代码转换为浏览器认识的代码。

当前示例里我先是创建了一个 index.js 的文件 然后创建了一个 utils 工具文件 这个工具文件里我写了一个加法的函数 然后在 index.js 文件里我引入了这个工具文件，并且调用了这个加法函数。 -那么有个问题，index.js 可以直接运行在浏览器上吗？ -答案是不一定，浏览器可能不兼容模块化，也可能不兼容 ES6 的语法，所以我们需要 webpack 来将我们的代码转换为浏览器认识的代码。

所以这个时候就需要借助到 webpack 来帮助我们打包代码
首先 执行 npm init -y 初始化项目
然后 执行 npm install webpack webpack-cli -D 安装 webpack （这里为什么是局部安装而不是全局安装？ 因为我们的电脑里可能有很多项目 每个项目对应的 webpack 版本也可能不一致 所以是需要区分版本的）
最后 执行 npx webpack 打包代码 （npx webpack 会自动的去 node_modules 里找 webpack 然后执行 webpack 这里为什么不直接执行 webpack 而是要执行 npx webpack 呢？ 因为 webpack 是一个局部安装的包 所以我们需要在当前项目里执行 而 npx webpack 会自动的去 node_modules 里找 webpack 然后执行 webpack）

执行完毕以后项目产生 dist 目录 里面的文件就是我们打包后的代码
这个时候本地生成一个 index.html 通过 script 标签直接引入打包后 dist 目录下文件
一切完美的运行在了浏览器上

问题一
如果我把 src/index.js 改为了 main.js,再去执行 npx webpack,会出现打包错误,原因是因为 webpack 默认的打包入口是 src/index.js,如果我们想改变打包的入口,
若是想改变 webpack 打包文件入口，可以使用命令 npx webpack --entry ./src/main.js
问题二
如果不希望打包后的文件名是 main.js,而是希望打包后的文件名是 bundle.js,可以使用命令 npx webpack --output-filename bundle.js
如果我希望打包后的文件是 dist 目录而是 build 目录,可以使用命令 npx webpack --output-path ./build
问题三
每次打包都要输入这么长的命令，难免会有些麻烦，所以我们可以通过一个 webpack 的配置文件进行统一管理，即 webpack.config.js 文件
webpack 是运行在 node 环境下的，所以使用 common.js 规范导出
如果给 path 直接设置 ./build 为值,会出现错误，原因是 webpack 期望的是一个绝对路径，所以我们需要使用 path.resolve(\_\_dirname, "./build") 来获取当前目录的绝对路径
问题四
如果把配置文件改为别的名字 需要打包的时候执行 npx webpack --config "新的配置文件名"
问题五
每次打包都要输入很多命令，所以可以在 package.json 文件里配置一个脚本，这样就可以直接执行 npm run build 来进行打包了
