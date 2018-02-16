const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const stripExtension = require('./util/stripExtension');
const settings = require('./settings');

module.exports = (env) => {
  const baseConfig = {
    entry: settings.entries,

    output: {
      filename: settings.options.fileName,
      path: settings.paths.build,
    },

    stats: {
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
            { loader: 'ts-loader' },
          ],
        },
        {
          test: /\.(css|scss|sass|less)$/,
          // use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'typings-for-css-modules-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                  namedExport: true,
                  camelCase: true,
                  sourceMap: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
              {
                loader: 'postcss-loader',
                options: { plugins: () => [autoprefixer('ie >= 9')] },
              },
            ],
          // }),
        },
        {
          test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
          exclude: /node_modules/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: './',
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
              context: 'build_examples/',
              outputPath: 'img/',
              publicPath: './',
            },
          }],
        },
      ],
    },
    plugins: [
      // new StyleLintPlugin({
      //   context: 'src',
      //   files: [
      //     '**/*.css',
      //     '**/*.less',
      //     '**/*.sass',
      //     '**/*.scss',
      //   ],
      // }),

      // new ExtractTextPlugin('[name].css'),
    ],
  };

  return baseConfig;
};
