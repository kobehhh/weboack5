const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true, // 在生成文件之前清空 output 目录
    assetModuleFilename: 'images/[contenthash][ext][query]' // 全局指定资源文件输出位置及名字
  },
  mode: "development", // production development
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "app.html",
      inject: "body", // 在指定位置去生成script标签
    }),
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
          filename: 'images/[contenthash][ext][query]'
        }
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
            maxSize: 4 * 1024
          }
        }
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
    ],
  },
};
