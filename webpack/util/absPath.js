const path = require('path');

/**
 * @param {string} pathFromProjectRoot path specified from the root of the project (where package.json is)
 * @return {string} absolute path
 */
function absPath(pathFromProjectRoot) {
  return path.resolve(__dirname, '../..', pathFromProjectRoot);
}

module.exports = absPath;
