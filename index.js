const fs = require('fs');
const path = require('path');
const loaderUtils = require("loader-utils");
let ckf = require.resolve('ckeditor');

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

  console.log(arguments);

  ck = ck.replace(/^\uFEFF/, '');
  ck = ck.replace(/window\.CKEDITOR/g, 'CKEDITOR');
  ck = ck.replace(/window.CKEDITOR_BASEPATH/g, 'CKEDITOR_BASEPATH');

  var code = '';
  code += 'var CKEDITOR;';
  code += 'var CKEDITOR_BASEPATH = "";';
  code += 'var CKEDITOR_GETURL;';
  code += ck;

  code += readFile('config.js');
  code += readFile('lang/zh-cn.js');
  code += readFile('styles.js');
  code += readFile('plugins/clipboard/dialogs/paste.js');
  code += readFile('plugins/table/dialogs/table.js');
  code += readFile('plugins/about/dialogs/about.js');
  code += readFile('plugins/link/dialogs/link.js');
  code += readFile('plugins/link/dialogs/anchor.js');
  code += readFile('plugins/image/dialogs/image.js');
  code += readFile('plugins/specialchar/dialogs/lang/zh-cn.js');
  code += readFile('plugins/specialchar/dialogs/specialchar.js');
  code += readFile('plugins/scayt/dialogs/options.js');

  code += 'CKEDITOR.dom.document.prototype.appendStyleSheet = console.log;';
  code += 'CKEDITOR.config.contentsCss = null;';

  code += '\nwindow.CKEDITOR = CKEDITOR;\nmodule.exports = CKEDITOR;';

  code += 'require("ckeditor/skins/moono/editor.css");';
  code += 'require("ckeditor/plugins/scayt/skins/moono-lisa/scayt.css");';
  code += 'require("ckeditor/plugins/wsc/skins/moono-lisa/wsc.css");';
  code += 'require("ckeditor/contents.css");';
  code += 'require("ckeditor/skins/moono-lisa/dialog.css");';
  return code;
};

var readFile = function(name) {
  var file = path.join(ckf, '..', name);
  var code = fs.readFileSync(file).toString('utf8').replace(/^\uFEFF/, '');
  return code;
};
