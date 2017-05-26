const fs = require('fs');
const path = require('path');
const loaderUtils = require("loader-utils");
let ckf = require.resolve('ckeditor');

var pluginLoader = require('./plugin_loader');

var AllPlugins = require('./plugin_loader').AllPlugins;

var AllLanguages = [
  "af",
  "ar",
  "az",
  "bg",
  "bn",
  "bs",
  "ca",
  "cs",
  "cy",
  "da",
  "de-ch",
  "de",
  "el",
  "en-au",
  "en-ca",
  "en-gb",
  "en",
  "eo",
  "es",
  "et",
  "eu",
  "fa",
  "fi",
  "fo",
  "fr-ca",
  "fr",
  "gl",
  "gu",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "is",
  "it",
  "ja",
  "ka",
  "km",
  "ko",
  "ku",
  "lt",
  "lv",
  "mk",
  "mn",
  "ms",
  "nb",
  "nl",
  "no",
  "oc",
  "pl",
  "pt-br",
  "pt",
  "ro",
  "ru",
  "si",
  "sk",
  "sl",
  "sq",
  "sr-latn",
  "sr",
  "sv",
  "th",
  "tr",
  "tt",
  "ug",
  "uk",
  "vi",
  "zh-cn",
  "zh",
];

/*
  Example:

  var callback = this.async();
  var headerPath = path.resolve("header.js");
  this.addDependency(headerPath);
  fs.readFile(headerPath, "utf-8", function(err, header) {
  if(err) return callback(err);
  callback(null, header + "\n" + source);
  });

*/

module.exports = function(conf) {
  const options = loaderUtils.getOptions(this);
  let ckb = fs.readFileSync(ckf);
  var ck = ckb.toString('utf8');

  ck = ck.replace(/^\uFEFF/, '');
  ck = ck.replace(/window\.CKEDITOR/g, 'CKEDITOR');
  ck = ck.replace(/window.CKEDITOR_BASEPATH/g, 'CKEDITOR_BASEPATH');

  var code = '';
  code += 'var CKEDITOR;';
  code += 'var CKEDITOR_BASEPATH = "";';
  code += 'var CKEDITOR_GETURL;';
  code += ck;

  conf = JSON.parse(conf);
  var {plugins, theme, languages} = conf;

  plugins = plugins || AllPlugins;
  theme = theme || "moono";
  languages = languages || AllLanguages;

  code += readFile('config.js');
  code += readFile('styles.js');
  languages.forEach(lang => {
    code += readFile(`lang/${lang}.js`);
  });

  code += pluginLoader(plugins, languages, theme);

  //code += 'CKEDITOR.scriptLoader.load = function(){};';
  code += 'CKEDITOR.dom.document.prototype.appendStyleSheet = function(){};';
  code += 'CKEDITOR.config.contentsCss = null;';

  code += '\nwindow.CKEDITOR = CKEDITOR;\nmodule.exports = CKEDITOR;';

  code += 'require("ckeditor/contents.css");';
  code += `require("ckeditor/skins/${theme}/editor.css");`;
  code += `require("ckeditor/skins/${theme}/dialog.css");`;
  return code;
};

var readFile = function(name) {
  var file = path.join(ckf, '..', name);
  var code = fs.readFileSync(file).toString('utf8').replace(/^\uFEFF/, '');
  return code;
};
