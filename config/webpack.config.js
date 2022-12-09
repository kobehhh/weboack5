const { merge } = require("webpack-merge");

const base = require("./webpack.config.base");
const prod = require("./webpack.config.prod");
const dev = require("./webpack.config.dev");

module.exports = (env) => {
  switch (true) {
    case env.development:
      return merge(base, dev);
    case env.production:
      return merge(base, prod);
    default:
      return new Error("未匹配到env");
  }
};
