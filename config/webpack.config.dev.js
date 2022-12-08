module.exports = {
  output: {
    filename: "scripts/[name].js", // 针对多入口时命名不同的打包文件
  },
  mode: "development", // production development
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
};
