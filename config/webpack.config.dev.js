module.exports = {
  output: {
    filename: "scripts/[name].js", // 针对多入口时命名不同的打包文件
  },
  mode: "development", // production development
  /**
   * source-map
   * 1、eval(默认) 会产生单独的.map文件，将webpack中每个模块包裹，然后在模块末尾添加模块来源//# souceURL， 依靠souceURL找到原始代码的位置
   * 2、source-map 生成一个.map文件，该文件保存有原始代码与运行代码的映射关系， 标识出报错列和行
   * 3、inline-source-map 产生.map文件，但是这个map文件是经过base64编码作为DataURI嵌入
   * 4、eval-source-map 不会产生单独的文件，显示列和行
   * 5、cheap-source-map  生成一个.map文件， 标识出报错行,不包含列
   * 6、cheap-module-source-map 生成一个.map文件， 标识出报错行,不包含列，同时 loader 的 sourcemap 也被简化为只包含对应行的
   */
  devtool: "source-map",
  devServer: {
    static: "./dist",
    hot: true, // 启用模块热替换HMR（在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面）,默认开启
    liveReload: true, // 启用模块热加载（文件更新时自动刷新服务和页面）,默认开启
    port: 8080, // 设置端口号
    // open: true, // 自动打开浏览器
    compress: true, // 将静态资源进行gzip压缩
    headers: {
      // 为所有响应response添加 headers信息
      "X-Access-Token": "wlf",
    },
    // headers: [
    //   {
    //     key: 'X-Custom',
    //     value: 'foo',
    //   },
    //   {
    //     key: 'Y-Custom',
    //     value: 'bar',
    //   },
    // ],
    proxy: {
      // 开启代理
      "/api": "http://localhost:9000",
    },
    host: "0.0.0.0", // 让你服务器可以被外部访问
    // https: true, // 将本地http服务变成https服务
    // historyApiFallback: true, // 提供页面来代替任何404响应
  },
};
