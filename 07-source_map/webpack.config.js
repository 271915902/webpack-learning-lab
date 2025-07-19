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
