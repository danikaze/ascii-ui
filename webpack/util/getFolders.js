const path = require('path');
const fs = require('fs');

/**
 * Return first level folders of a specified path
 *
 * @param   {string}        basePath
 * @returns {Array<string>}
 */
function getFolders(basePath) {
  const res = [];

  fs.readdirSync(basePath).forEach((file) => {
    const fullPath = path.join(basePath, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      res.push(fullPath);
    }
  });

  return res;
}

module.exports = getFolders;
