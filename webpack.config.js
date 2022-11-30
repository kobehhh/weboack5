const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true, // 在生成文件之前清空 output 目录
  },
  mode: "development", // production development
  devtool: 'inline-source-map',
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'app.html',
    inject: 'body', // 在指定位置去生成script标签
  })],
  devServer: {
    static: './dist'
  }
};
