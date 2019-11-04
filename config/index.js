'use strict';

var path = require("path");
var theme = require('./../theme.config');
var config = {
  projectName: 'taro',
  date: '2019-8-26',
  designWidth: 750,
  deviceRatio: {
    '640': 1.17,
    '750': 1,
    '828': 0.905
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  alias: {
    '@/': path.resolve(__dirname, '..', 'src/'),
    '@/api': path.resolve(__dirname, '..', 'src/api'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),
    '@/types': path.resolve(__dirname, '..', 'src/types'),
    '@/hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/constant': path.resolve(__dirname, '..', 'src/constant'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
  },
  plugins: {
    babel: {
      sourceMap: true,
      presets: [['env', {
        modules: false
      }]],
      plugins: ['transform-decorators-legacy', 'transform-class-properties', 'transform-object-rest-spread']
    },
    sass: {
      resource: path.resolve(__dirname, '..', `src/assets/style/${theme.name}/variables.scss`),
      // OR 
      // resource:  ['path/to/global.variable.scss', 'path/to/global.mixin.scss']
      projectDirectory: path.resolve(__dirname, '..')
    }
  },
  defineConstants: {
    THEME_CONFIG: theme //主题名字
  },
  copy: {
    patterns: [],
    options: {}
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8']
          }
        },
        pxtransform: {
          enable: true,
          config: {}
        },
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    esnextModules: ['taro-ui'],
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8']
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  }
};

module.exports = function (merge) {
  {
    return merge({}, config, require("./dev.js"));
  }
  return merge({}, config, require("./prod.js"));
};