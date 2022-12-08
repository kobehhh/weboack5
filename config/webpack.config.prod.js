const path = require("path");
const cssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  output: {
    filename: "scripts/[name].[contenthash].js", // 针对多入口时命名不同的打包文件
    publicPath: "http://localhost:8080/", // 公共路径
  },
  mode: "production", // production development
  optimization: {
    minimizer: [new cssMinimizerWebpackPlugin(), new TerserWebpackPlugin()], // css压缩
  },
};
