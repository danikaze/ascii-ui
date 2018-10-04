const path = require('path');
const packageJson = require('./package.json');

/**
 * @param {string} pathFromProjectRoot path specified from the root of the project (where package.json is)
 * @return {string} absolute path
 */
function absPath(pathFromProjectRoot) {
  return path.resolve(__dirname, pathFromProjectRoot);
}

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
    auxiliaryComment: packageJson.name,
  },
  // aliases need to be defined also in tsconfig.json (compilerOptions.paths)
  alias: {
    '@src': absPath('src'),
  },
};
