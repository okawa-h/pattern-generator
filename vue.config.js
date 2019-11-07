const path = require("path");
const { BASE_PATH, SITE_ORIGIN, META } = require("./src/assets/constants.json");

const TEMPLATE_PARAMS = {
  SITE_ORIGIN,
  META,
  BASE_PATH,
  BASE_URL: path.join(SITE_ORIGIN, BASE_PATH)
};

module.exports = {
  publicPath: "pattern-generator/dist/",
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/common.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      return args.map(arg => {
        return Object.assign({}, arg, {
          templateParameters(params) {
            return Object.assign(
              {},
              arg.templateParameters(params),
              TEMPLATE_PARAMS
            );
          }
        });
      });
    });
  },
  devServer: {
    contentBase: path.join(__dirname, "pattern-generator/dist/"),
    port: 3000
  }
};
