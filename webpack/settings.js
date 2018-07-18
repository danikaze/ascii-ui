const absPath = require('./util/absPath');

module.exports = {
  paths: {
    /* relative to PROJECT_ROOT */
    examples: 'examples',
    /* absolute */
    buildExamples: absPath('buildExamples'),
    /* relative to examples */
    buildInfo: 'info.html',
    /* relative to examples */
    assets: 'assets',
    /* relative to examples */
    fonts: 'fonts',
  },
  options: {
    fileName: '[name].js',
    vendorName: 'vendor.js',
    vendorContent: [
      'babel-polyfill',
    ],
    jsonpFunction: 'wp_ajax',
    publicPath: '',
    devPort: 8084,
    devHost: 'localhost',
    minimizeBuild: false,
    libraryTarget: 'umd',
    auxiliaryComment: 'terminal-in-canvas',
  },
  // aliases need to be defined also in tsconfig.json (compilerOptions.paths)
  alias: {
    '@src': absPath('src'),
  },
};
