const autoprefixer = require('autoprefixer');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const mkdirp = require('mkdirp').sync;
const stripExtension = require('./util/stripExtension');
const settings = require('./settings');
const absPath = require('./util/absPath');

module.exports = (env) => {
  const baseConfig = {
    output: {
      filename: settings.options.fileName,
      path: settings.paths.build,
    },

    devtool: 'source-map',

    stats: {
      assetsSort: 'name',
      modules: false,
      children: false,
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: settings.alias,
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)|(examples)/,
          enforce: 'pre',
          use: [
            {
              loader: 'tslint-loader',
              options: {
                formatter: 'stylish',
                typeCheck: true,
              },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: {
                  declaration: false,
                },
              },
            },
          ],
        },
        {
          test: /\.(css|scss|sass|less)$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'typings-for-css-modules-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                  namedExport: true,
                  camelCase: true,
                  sourceMap: true,
                  localIdentName: '[local]',
                },
              },
              {
                loader: 'postcss-loader',
                options: { plugins: () => [autoprefixer('ie >= 9')] },
              },
            ],
          }),
        },
        {
          test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
          exclude: /node_modules/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              useRelativePath: true,
              outputPath: settings.paths.fonts,
            },
          }],
        },
        {
          test: /\.(png|jpg|gif|webp)$/,
          exclude: /node_modules/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              useRelativePath: true,
              outputPath: 'img/',
              publicPath: './',
            },
          }],
        },
      ],
    },
    plugins: [
      new ProgressBarPlugin(),
      new ExtractTextPlugin('[name].css'),
      new CopyWebpackPlugin([{
        from: path.join(settings.paths.examples, settings.paths.assets),
        to: settings.paths.assets,
      }]),
    ],
  };

  const assetsAbsolutePath = absPath(path.join(settings.paths.examples, settings.paths.assets));
  if (!fs.existsSync(assetsAbsolutePath)) {
    mkdirp(assetsAbsolutePath);
  }

  return baseConfig;
};
