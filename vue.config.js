const pxtorem = require("postcss-pxtorem");
const autoprefixer = require("autoprefixer");
// const env = process.env.NODE_ENV;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const remoteurl = process.env.VUE_APP_baseurl;
const rewritePath = process.env.VUE_APP_rewritePath;
const rewritePath2 = process.env.VUE_APP_rewritePath2;
const options = {
  publicPath: "./",
  outputDir: "dist",
  //postcss 配置
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ["*"]
          })
        ]
      }
    }
  },
  configureWebpack: config => {
    let plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            // warnings: false,
            drop_console: true,
            drop_debugger: true
          },
          output: {
            // 去掉注释内容
            comments: false
          }
        },
        sourceMap: true,
        parallel: 2
      })
    ];
    if (process.env.NODE_ENV == "production") {
      config.plugins = [...config.plugins, ...plugins];
    }
  },
  devServer: {
    proxy: {
      "/way": {
        target: remoteurl,
        changeOrigin: true,
        pathRewrite: {
          "^/way": rewritePath
        }
      },
      "/method": {
        target: remoteurl,
        changeOrigin: true,
        pathRewrite: {
          "^/method": rewritePath2
        }
      }
    }
  }
};
module.exports = options;