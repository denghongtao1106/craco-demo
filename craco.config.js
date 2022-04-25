const CracoLessPlugin = require("craco-less");
const { loaderByName } = require("@craco/craco");
const CracoAntDesign = require("craco-antd");
const path = require("path");

module.exports = function (webpackEnv) {
  const lessModuleRegex = /\.module\.less$/;

  return {
    babel: {
      presets: [],
      plugins: [
        // AntDesign 按需加载
        [
          "import",
          {
            libraryName: "antd",
            libraryDirectory: "es",
            style: true,
          },
          "antd",
        ],
        [
          "@babel/plugin-proposal-decorators",
          {
            legacy: true,
          },
        ], // 用来支持装饰器
      ],
      loaderOptions: {},
      loaderOptions: (babelLoaderOptions, { env, paths }) => {
        return babelLoaderOptions;
      },
    },
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          // less loader option
          lessLoaderOptions: {
            lessOptions: {
              /*
                如果项目中有使用TDesign或AntDesign组件库需要自定义主题，可以在modifyVars中添加对应less变量
            */
              modifyVars: {
                "@primary-color": "#2378ff",
              },
              javascriptEnabled: true,
            },
          },
          modifyLessRule(lessRule) {
            lessRule.exclude = lessModuleRegex;
            return lessRule;
          },
          modifyLessModuleRule(lessModuleRule) {
            // configure the file suffix
            lessModuleRule.test = lessModuleRegex;

            // configure the generated local ident name
            const cssLoader = lessModuleRule.use.find(
              loaderByName("css-loader")
            );
            cssLoader.options.modules = {
              /* 
                注意这里的命名规则：
                - CRA脚手架创建的项目是可以直接使用css modules的，css文件的命名规则默认是[local]_[hash:base64:5]
                - 这里使用css modules的命名规则
            */

              localIdentName: "[local]_[hash:base64:5]",
            };

            return lessModuleRule;
          },
        },
      },
    ],
    devServer: {
      port: 9000,
      proxy: {
        '/bsp': {
          target: 'https://bimdc.bzlrobot.com',
          changeOrigin: true,
          secure: false,
          xfwd: false,
        }
      }
    }
  };
};
