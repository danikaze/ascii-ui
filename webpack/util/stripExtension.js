const path = require('path');

/**
 *
 * @param {string} file
 * @return {string} file without extension
 */
function stripExtension(file) {
  const ext = path.extname(file);
  return file.substring(0, file.length - ext.length);
}

module.exports = stripExtension;
