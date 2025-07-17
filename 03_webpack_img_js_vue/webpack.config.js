const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"),
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
    ],
  },
};
