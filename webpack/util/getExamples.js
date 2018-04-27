const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getFolders = require('./getFolders');
const stripExtension = require('./stripExtension');
const settings = require('../settings');
const packageJson = require('../../package.json');

const EXAMPLES_ENV = 'examples';

/**
 * Get the current date as a formated string
 */
function getDate() {
  const now = new Date();
  const locale = 'ja';
  const options = {
    timeZone: 'Asia/Tokyo',
    hour12: false,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return now.toLocaleString(locale, options);
}

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
  const folders = getFolders(settings.paths.examples);

  folders.forEach((folder) => {
    fs.readdirSync(folder).forEach((file) => {
      const match = /^(.*)\.([jt]sx?)$/.exec(file);
      if (match) {
        const filePath = path.join(folder, file);
        const htmlFile = `${stripExtension(filePath)}.html`;
        if (fs.existsSync(htmlFile)) {
          const output = stripExtension(path.relative(settings.paths.examples, filePath));
          entries[output] = path.resolve(path.join('.', filePath));
        }
      }
    });
  });

  return entries;
}

/**
 * Generate the HtmlWebpackPlugin with the data for the examples index page
 */
function generateHtmlIndex(entries, env) {
  function getHtmlTitle(file) {
    const regExp = /<title>(.*)<\/title>/;
    const html = fs.readFileSync(file);
    const match = regExp.exec(html);

    return match && match[1] || '';
  }

  function getEntryHtml(folder, htmlFile) {
    const relativePath = path.join(folder, htmlFile);
    const fullPath = path.join(settings.paths.examples, relativePath);

    return `<a class="list-group-item" href="${relativePath}">
        <b>${path.basename(htmlFile)}:</b>
        <em>${getHtmlTitle(fullPath)}</em>
      </a>`;
  }

  const examplesHtml = [];
  const folders = {};

  // group files by its folder
  Object.keys(entries).forEach((output, index) => {
    const folderFile = output.split(path.sep);
    const folder = folderFile[0];
    const htmlFile = `${folderFile[1]}.html`;
    if (!folders[folder]) {
      folders[folder] = [];
    }
    folders[folder].push(getEntryHtml(folder, htmlFile));
  });

  // generate output
  Object.keys(folders).forEach((folder) => {
    const folderHtml = `<div class="list-group shadow my-4">
        <h5 class="list-group-item list-group-item-primary">${folder}/</h5>
        ${folders[folder].join('\n')}
      </div>`;
    examplesHtml.push(folderHtml);
  });

  return new HtmlWebpackPlugin({
    template: path.join(settings.paths.examples, 'index.html'),
    filename: 'index.html',
    chunks: [],
    minify: false,
    // options for templates
    exampleIndex: `${examplesHtml.join('\n')}`,
    buildInfoLink: env === EXAMPLES_ENV
      ? `<a href="${settings.paths.buildInfo}">Build Info</a>`
      : undefined,
    assets: settings.paths.assets,
    version: packageJson.version,
    date: getDate(),
  });
}

/**
 * Generate the HTML for the breadcrumbs associated to an example page
 */
function getBreadCrumbsHtml(chunk) {
  let html = '<li class="breadcrumb-item"><a href="../index.html">Examples</a></li>';
  const steps = chunk.split(path.sep);

  for (let i = 0; i < steps.length; i++) {
    const activeClass = i === steps.length - 1 ? ' active' : '';
    html += `<li class="breadcrumb-item${activeClass}">${steps[i]}</li>`;
  }

  return `<ol class="breadcrumb">${html}</ol>`;
}

/**
 * Generate the HtmlWebpackPlugin with the data for one example page
 */
function getHtmlWebpackPlugin(chunk) {
  const template = path.join(settings.paths.examples, `${chunk}.html`);
  const filename = `${chunk}.html`;

  return new HtmlWebpackPlugin({
    template,
    filename,
    chunks: [chunk],
    inject: true,
    minify: false,
    // options for templates
    backLink: '../index.html',
    assets: `../${settings.paths.assets}`,
    breadcrumbs: getBreadCrumbsHtml(chunk),
    version: packageJson.version,
    date: getDate(),
  });
}

/**
 * Get all the HtmlWebpackPlugins instances needed (index + examples)
 */
function getHtmlWebpackPlugins(entries, env) {
  const plugins = [];
  plugins.push(generateHtmlIndex(entries, env));
  Object.keys(entries).forEach((file) => {
    const pluginInstance = getHtmlWebpackPlugin(file);
    plugins.push(pluginInstance);
  });
  return plugins;
}

/**
 * Returns an object to be merged with the webpack configuration with the examples data
 */
function get(env) {
  const entry = getEntryPoints();
  const plugins = getHtmlWebpackPlugins(entry, env);

  return {
    entry,
    plugins,
  };
}

module.exports = get;
