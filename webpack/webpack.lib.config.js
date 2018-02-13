const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MergeFilesPlugin = require('merge-files-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const getStylesConfig = require('./util/libStyles');
const getBaseConfig = require('./webpack.base.config');
const settings = require('./settings');
const packageJson = require('../package.json');

const moduleConfig = {
  output: {
    path: path.resolve(path.join(__dirname, '..', 'lib')),
    library: settings.options.fileName,
    libraryTarget: settings.options.libraryTarget,
    auxiliaryComment: settings.options.auxiliaryComment,
  },

  bail: true,
  cache: false,
  devtool: 'source-map',
  node: {
    Buffer: false,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new webpack.optimize.ModuleConcatenationPlugin(),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'buildInfo/analyzer.html',
    }),

    new MergeFilesPlugin({
      filename: `${packageJson.name}.css`,
      test: /\.css$/,
      deleteSourceFiles: true,
    }),
  ]
};

if (settings.options.minimizeBuild) {
  moduleConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {
      screw_ie8: true,
      warnings: false,
    },
    output: {
      screw_ie8: true,
      comments: false,
    },
    sourceMap: true,
  }));
}

module.exports = (env) => {
  const baseConfig = getBaseConfig(env);
  const stylesConfig = getStylesConfig(env);
  const config = merge(baseConfig, moduleConfig, stylesConfig);

  return config;
};
