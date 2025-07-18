const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    clean: true,
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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: ["autoprefixer"],
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        // 打包图片并且返回图片url
        // type:"asset/resource"
        // 打包图片并且返回base64 放到打包后的js文件中
        // type:"asset/inline"
        // 自动选择 大文件使用图片url打包 小一点的使用base64打包
        type: "asset",
        // 设置limit条件
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
      {
        test: /\.js$/,
        use: ["babel-loader"],
        // use: [
        //   {
        //     loader: "babel-loader",
        //     options: {
        //       plugins: ["@babel/plugin-transform-arrow-functions"],
        //     },
        //   },
        // ],
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      title: "hello world",
      template: "./src/index.html",
    }),
    new DefinePlugin({
      value: JSON.stringify("hello world"),
    }),
  ],
  devServer: {
    hot: true,
    port: 8080,
    open: true,
    compress: true,
  },
};
