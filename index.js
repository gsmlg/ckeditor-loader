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

  var langf = path.join(ckf, '../lang/zh-cn.js');
  var lang = fs.readFileSync(langf).toString('utf8').replace(/^\uFEFF/, '');

  var stylef = path.join(ckf, '../styles.js');
  var styles = fs.readFileSync(stylef).toString('utf8').replace(/^\uFEFF/, '');

  ck = ck.replace(/^\uFEFF/, '');
  ck = ck.replace(/window\.CKEDITOR/g, 'CKEDITOR');
  ck = ck.replace(/window.CKEDITOR_BASEPATH/g, 'CKEDITOR_BASEPATH');
  var code = '';
  code += 'var CKEDITOR;';
  code += 'var CKEDITOR_BASEPATH = "";';
  code += 'var CKEDITOR_GETURL;';
  code += ck;
  code += lang;
  code += styles;
  code += '\nwindow.CKEDITOR = CKEDITOR;\nmodule.exports = CKEDITOR;';
  code += 'require("ckeditor/skins/moono/editor.css");';
  code += 'require("ckeditor/contents.css");';
  code += 'require("ckeditor/plugins/scayt/skins/moono-lisa/scayt.css");';
  code += 'require("ckeditor/plugins/wsc/skins/moono-lisa/wsc.css");';
  return code;
};
