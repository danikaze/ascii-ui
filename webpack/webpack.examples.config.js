const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const getBaseConfig = require('./webpack.base.config.js');
const getExamplesData = require('./util/getExamples');
const settings = require('./settings');

const moduleConfig = {
  output: {
    path: settings.paths.buildExamples,
  },

  plugins: [
    new CleanWebpackPlugin(
      [settings.paths.buildExamples],
      { root: path.resolve(__dirname, '..'), verbose: false }
    ),
    new webpack.NamedModulesPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'gzip',
      openAnalyzer: false,
      reportFilename: settings.paths.buildInfo,
    }),
  ],
};

module.exports = (env) => {
  const baseConfig = getBaseConfig(env);
  const exampleConfig = getExamplesData(env);
  const config = merge(baseConfig, moduleConfig, exampleConfig);

  return config;
};
