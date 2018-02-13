const packageJson = require('../package.json');
const absPath = require('./util/absPath');

module.exports = {
  entries: {
    Template: absPath('src/Terminal.ts'),
  },
  paths: {
    build: absPath(`build/${packageJson.version}`),
    htmlTemplate: absPath('src/index.html'),
  },
  options: {
    fileName: '[name].js',
    vendorName: 'vendor.js',
    vendorContent: [
      'babel-polyfill',
    ],
    jsonpFunction: 'wp_ichibaItemPc',
    publicPath: '',
    devPort: 8084,
    devHost: 'localhost',
    minimizeBuild: false,
    libraryTarget: 'umd',
    auxiliaryComment: 'Test comment',
  },
  // aliases need to be defined also in tsconfig.json (compilerOptions.paths)
  alias: {
    'Terminal': absPath('src'),
  },
};
