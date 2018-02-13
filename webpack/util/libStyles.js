const fs = require('fs');
const path = require('path');
const stripExtension = require('./stripExtension');
const absPath = require('./absPath');

/**
 * Return list of files (no recursive) in a folder
 *
 * @param   {string}        basePath
 * @param   {RegExp}        pattern
 * @returns {Array<string>}
 */
function getFiles(basePath, pattern) {
  const res = [];

  if (!fs.existsSync(basePath)) {
    return res;
  }

  fs.readdirSync(basePath).forEach((file) => {
    const fullPath = path.join(basePath, file);
    const stats = fs.statSync(fullPath);
    if (stats.isFile() && (!pattern || pattern.test(file))) {
      res.push(fullPath);
    }
  });

  return res;
}

/**
 * Return an object with an entry for each css,scss,sass,less file found in `src/styles`
 *
 * @returns {object} as `{ 'path.css': 'absolutePath.less' }`
 */
function getStylesEntryPoints() {
  const res = {};

  const files = getFiles('src/styles', /\.(css|scss|sass|less)$/);
  files.forEach((file) => {
    const cssPath = path.relative('src', `${stripExtension(file)}.css`);
    res[cssPath] = absPath(file);
  });

  return res;
}

module.exports = (env) => ({
  entry: getStylesEntryPoints(),
});
