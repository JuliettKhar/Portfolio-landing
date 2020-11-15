const path = require("path");

module.exports = {
  publicPath: "/",
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/")
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");

    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type("javascript/auto")
      .use("i18n")
      .loader("@kazupon/vue-i18n-loader")
      .end();

    config.plugin("html").tap(args => {
      args[0].meta = [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        }
      ];
      return args;
    });
  },

  css: {
    loaderOptions: {
      scss: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, "src/scss/core/")],
          indentedSyntax: false
        },
        prependData: `
          @charset "utf-8";
          @import "~bulma/sass/utilities/initial-variables.sass";
          @import "~bulma/sass/utilities/functions.sass";
          @import "~bulma/sass/utilities/derived-variables.sass";
          @import "~bulma/sass/utilities/mixins.sass";
        `
      }
    }
  },

  assetsDir: "@/assets/"
};
