const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true, // 在生成文件之前清空 output 目录
    assetModuleFilename: "images/[contenthash][ext][query]", // 全局指定资源文件输出位置及名字
  },
  mode: "development", // production development
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "app.html",
      inject: "body", // 在指定位置去生成script标签
    }),
    new MiniCssExtractPlugin({ filename: "styles/[contenthash].css" }),
  ],
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        /**
         * asset/resource： 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
           asset/inline： 导出一个资源的 data URI。之前通过使用 url-loader 实现。
           asset/source： 导出资源的源代码。之前通过使用 raw-loader 实现。
           asset： 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现
         */
        type: "asset/resource",
        // 指定资源文件输出位置及名字
        generator: {
          filename: "images/[contenthash][ext][query]",
        },
      },
      {
        test: /\.svg$/,
        type: "asset/inline",
      },
      {
        test: /\.text$/,
        type: "asset/source",
      },
      {
        test: /\.jpg$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // },
      {
        test: /\.(css|less)$/,
        /**
         * MiniCssExtractPlugin.loader 提取css成单独文件
         * style-loader 将css-loader解析的结果运行时动态插入head的 style 标签来让 CSS 代码生效
         * css-loader 解析css文件中的@import和url语句，处理css-modules，并将结果作为一个js模块返回
         * less-loader 将less文件编译成css文件
         */
        // use: ['style-loader', 'css-loader', 'less-loader']
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
    ],
  },
};
