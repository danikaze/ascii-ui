const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const getBaseConfig = require('./webpack.base.config.js');
const getExamplesData = require('./util/getExamples');
const settings = require('./settings');

const moduleConfig = {
  // Entry points
  entry: {
    // Connect client to webserver
    'webpack-dev-server': `webpack-dev-server/client?http://${settings.options.devHost}:${settings.options.devPort}`,
    // "only-" means to only hot reload for successful updates
    hot: 'webpack/hot/only-dev-server',
  },

  output: {
    path: path.resolve(path.join(__dirname, '../build_examples')),
  },

  devtool: 'inline-source-map',

  // Configuration for dev server
  devServer: {
    // Enables HMR on the dev server
    hot: true,
    inline: true,
    // Listen port
    port: settings.options.devPort,
    // Match the output.path
    contentBase: settings.paths.build,
    // Match the output.publicPath
    publicPath: settings.options.publicPath,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};

module.exports = (env) => {
  const baseConfig = getBaseConfig(env);
  const exampleConfig = getExamplesData(env);
  const config = merge(baseConfig, moduleConfig, exampleConfig);
  console.log(config.entry);
  return config;
};
