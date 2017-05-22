'use strict';
const fs = require('fs');
const path = require('path');
const npmBase = path.join(__dirname, '../../node_modules');
const webpack = require('webpack');

class WebpackBaseConfig {
  constructor() {
    this._config = {};
    this.commonPlugins = [
      new webpack.ProvidePlugin({
        'Reveal': 'reveal.js',
        'hljs': 'reveal.js/plugin/highlight/highlight.js'
      })
    ];
  }
  get includedPackages() {
    return [].map(pkg => fs.realpathSync(path.join(npmBase, pkg)));
  }
  set config(data) {
    this._config = Object.assign({}, this.defaultSettings, data);
    this.commonPlugins.forEach(plugin => {
      this._config.plugins.push(plugin);
    });
    return this._config;
  }
  get config() {
    return this._config;
  }
  get env() {
    return 'dev';
  }
  get srcPathAbsolute() {
    return path.resolve('./src');
  }
  get testPathAbsolute() {
    return path.resolve('./test');
  }
  get defaultSettings() {
    const cssModulesQuery = {
      modules: true,
      importLoaders: 1,
      localIdentName: '[name]-[local]-[hash:base64:5]'
    };
    return {
      context: this.srcPathAbsolute,
      devtool: 'eval',
      devServer: {
        contentBase: './src/',
        publicPath: '/assets/',
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 8000
      },
      entry: './index.js',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            include: this.srcPathAbsolute,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  plugins: [
                    // 'syntax-dynamic-import',
                    // 'transform-proto-to-assign',
                    // 'transform-class-properties',
                    // ['transform-es2015-classes', {loose: true}],
                  ],
                  presets: [
                    'react',
                    'es2015',
                    'stage-0'
                  ]
                }
              }
            ],
          },
          {
            test: /\.css$/,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  plugins: function() {
                    return [
                      require('autoprefixer')
                    ];
                  }
                }
              }
            ]
          },
          {
            test: /\.scss$/,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  plugins: function() {
                    return [
                      require('autoprefixer')
                    ];
                  }
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          {
            test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)(\?.*)?$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 32 * 1024
                }
              }
            ]
          },
          {
            test: /\.(mp4|ogg|svg)(\?.*)?$/,
            use: [
              'file-loader'
            ]
          },
          {
            test: /ckeditor.conf$/,
            use: [
              'ckeditor-loader'
            ]
          }
        ]
      },
      output: {
        path: path.resolve('./dist/assets'),
        filename: 'app.js',
        publicPath: './assets/'
      },
      plugins: [],
      resolveLoader: {
        modules: ['node_modules'],
        alias: {
          'ckeditor-loader': path.resolve(__dirname, '../../index')
        }
      },
      resolve: {
        alias: {
          actions: `${ this.srcPathAbsolute }/actions/`,
          components: `${ this.srcPathAbsolute }/components/`,
          config: `${ this.srcPathAbsolute }/config/${ this.env }.js`,
          images: `${ this.srcPathAbsolute }/images/`,
          sources: `${ this.srcPathAbsolute }/sources/`,
          stores: `${ this.srcPathAbsolute }/stores/`,
          styles: `${ this.srcPathAbsolute }/styles/`
        },
        extensions: [
          '.js',
          '.jsx'
        ],
        modules: [
          this.srcPathAbsolute,
          'node_modules'
        ]
      },
    };
  }
}
module.exports = WebpackBaseConfig;
