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
