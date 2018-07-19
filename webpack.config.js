const autoprefixer = require('autoprefixer');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExamplesGenerator = require('generate-examples-index-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const settings = require('./webpack.settings');

module.exports = (env) => {
  const stats = {
    assetsSort: 'name',
    modules: false,
    children: false,
    excludeAssets: [/hot(-update)?\.js(on)?/, /webpack-dev-server/],
  };

  const baseConfig = {
    mode: 'development',

    output: {
      filename: settings.options.fileName,
      path: settings.paths.buildExamples,
    },

    stats,

    devtool: 'source-map',

    devServer: {
      hot: true,
      inline: true,
      port: settings.options.devPort,
      contentBase: settings.paths.buildExamples,
      publicPath: settings.options.publicPath,
      stats,
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
      new CleanWebpackPlugin(
        [settings.paths.buildExamples],
        { root: path.resolve(__dirname, '..'), verbose: false }
      ),
      new ProgressBarPlugin(),
      new ExtractTextPlugin('[name].css'),
      new ExamplesGenerator({
        noEntries: true,
        outputPath: settings.paths.buildExamples,
        static: 'examples/assets',
      }),
    ],
  };

  if (env === 'env') {
    baseConfig.entry = {
      'webpack-dev-server': `webpack-dev-server/client?http://${settings.options.devHost}:${settings.options.devPort}`,
      hot: 'webpack/hot/only-dev-server',
    };

    baseConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    );
  }

  return baseConfig;
};
