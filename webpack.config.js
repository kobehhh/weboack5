const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = (env) => {
  return {
    // entry: "./src/index.js",
    /**
     * 代码分离 1、使用多入口
     * 缺点：分割的各个包通用的代码会打包多次
     */
    entry: {
      index: "./src/index.js",
      another: "./src/another-module.js",
    },
    /**
     * 代码分离 1、使用多入口 优化
     */
    // entry: {
    //   index: {
    //     import: './src/index.js',
    //     dependOn: 'shared'
    //   },
    //   another: {
    //     import: './src/another-module.js',
    //     dependOn: 'shared'
    //   },
    //   shared: 'lodash' // 抽离lodash打包成名为shared的淡出chunk
    // },
    output: {
      // filename: "bundle.js",
      filename: "scripts/[name].[contenthash].js", // 针对多入口时命名不同的打包文件
      path: path.resolve(__dirname, "./dist"),
      clean: true, // 在生成文件之前清空 output 目录
      assetModuleFilename: "images/[contenthash][ext][query]", // 全局指定资源文件输出位置及名字
      publicPath: "http://localhost:8080/", // 公共路径
    },
    mode: env.production ? "production" : "development", // production development
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
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: "asset/resource",
          generator: {
            filename: "files/[contenthash][ext][query]",
          },
        },
        {
          // 转换成js对象
          test: /\.(csv|tsv)$/,
          use: "csv-loader",
        },
        {
          // 转换成数组
          test: /\.(xml)$/,
          use: "xml-loader",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env"] },
          },
        },
      ],
    },
    optimization: {
      minimizer: [new cssMinimizerWebpackPlugin(), new TerserWebpackPlugin()], // css压缩
      /**
       * 代码分离 2、splitChunks(entry配置多入口后配置以下代码即可)
       */
      // splitChunks: {
      //   chunks: 'all'
      // }

      /**
       * 缓存第三方库
       */
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
  };
};
