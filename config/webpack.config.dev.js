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
  },
};
