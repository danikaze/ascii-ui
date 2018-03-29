const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EXAMPLES_PATH = './examples';
const EXAMPLES_BUILD_PATH = './build_examples';
const getFolders = require('./getFolders');
const stripExtension = require('./stripExtension');

/**
 * Generate an object with the entry points for each example
 * Basically the examples folder should be like
 * * basePath/
 *   * example1/
 *     * index1.html
 *     * index1.js
 *     * index2.html
 *     * index2.js
 *     * otherFile.js
 *     * otherFolder/
 *       * otherFiles.js
 *   * example2/
 *     * ...
 *   * ...
 */
function getEntryPoints() {
  const entries = {};
  const folders = getFolders(EXAMPLES_PATH);

  folders.forEach((folder) => {
    fs.readdirSync(folder).forEach((file) => {
      const match = /^(.*)\.([jt]sx?)$/.exec(file);
      if (match) {
        const filePath = path.join(folder, file);
        const htmlFile = `${stripExtension(filePath)}.html`;
        if (fs.existsSync(htmlFile)) {
          const output = path.relative(EXAMPLES_PATH, filePath);
          entries[output] = path.resolve(path.join('.', filePath));
        }
      }
    });
  });

  return entries;
}

/**
 *
 *
 * @param {any} entries
 * @returns
 */
function generateHtmlIndex(entries) {
  function getHtmlTitle(file) {
    const regExp = /<title>(.*)<\/title>/;
    const html = fs.readFileSync(file);
    const match = regExp.exec(html);

    return match && match[1] || '';
  }

  function getEntryHtml(folder, htmlFile) {
    const relativePath = path.join(folder, htmlFile);
    const fullPath = path.join(EXAMPLES_PATH, relativePath);
    return `<a href="${relativePath}"><b>${htmlFile}:</b> <em>${getHtmlTitle(fullPath)}</em></a>`;
  }

  const examplesHtml = [];
  const folders = {};
  const fileRegExp = /^[^/\\]+[\/\\](.*)\.([jt]sx?)$/;
  const folderRegExp = /^([^/\\]+)[\/\\].*$/;

  // group files by its folder
  Object.keys(entries).forEach((output, index) => {
    const fileMatch = fileRegExp.exec(output);
    const folderMatch = folderRegExp.exec(output);
    const folder = folderMatch[1];
    const htmlFile = `${fileMatch[1]}.html`;
    if (!folders[folder]) {
      folders[folder] = [];
    }
    folders[folder].push(htmlFile);
  });

  // generate output
  Object.keys(folders).forEach((folder) => {
    const listHtmls = folders[folder].map((file) => getEntryHtml(folder, file));
    const listHtml = `<ul><li>${listHtmls.join('</li> <li>')}</li></ul>`;
    const folderHtml = `<li><b>${folder}/</b>${listHtml}</li>`;
    examplesHtml.push(folderHtml);
  });

  return new HtmlWebpackPlugin({
    template: path.join(EXAMPLES_PATH, 'index.html'),
    filename: 'index.html',
    chunks: [],
    minify: false,
    exampleIndex: `<ul>\n${examplesHtml.join('\n')}\n</ul>`,
  });
}

/**
 *
 *
 * @param {any} chunk
 * @returns
 */
function getHtmlWebpackPlugin(jsInput) {
  const jsOutput = path.join(EXAMPLES_BUILD_PATH, jsInput);
  let match = /^(.*)\.([jt]sx?)$/.exec(jsInput);

  const template = path.join(EXAMPLES_PATH, `${match[1]}.html`);
  match = /^(.*)\.([jt]sx?)$/.exec(jsOutput);

  const filename = path.relative(EXAMPLES_BUILD_PATH, `${match[1]}.html`);

  return new HtmlWebpackPlugin({
    template,
    filename,
    chunks: [jsInput],
    inject: true,
    minify: false,
  });
}

/**
 *
 *
 * @param {any} entries
 */
function getHtmlWebpackPlugins(entries) {
  const plugins = [];
  plugins.push(generateHtmlIndex(entries));
  Object.keys(entries).forEach((file) => {
    const pluginInstance = getHtmlWebpackPlugin(file);
    plugins.push(pluginInstance);
  });
  return plugins;
}

function get(env) {
  const entry = getEntryPoints();
  const plugins = getHtmlWebpackPlugins(entry);

  return {
    entry,
    plugins,
  };
}

module.exports = get;
