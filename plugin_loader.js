const fs = require('fs');
const path = require('path');
let ckf = require.resolve('ckeditor');

var read = (file) => {
  if (/\.js$/.exec(file) && fs.existsSync(file)) {
    return fs.readFileSync(file).toString('utf8').replace(/^\uFEFF/, '');
  } else if (/\.css$/.exec(file) && fs.existsSync(file)){
    return `require("${file}");`;
  } else {
    console.log("unknow file ", file);
    return "";
  }
};

var readFile = function(file) {
  let code = '';
  if (Array.isArray(file)) {
    file.forEach(n => {
      code += read(n);
    });
  } else {
    code += read(file);
  }
  return code;
};

const CKPlugins = [
  "a11yhelp",
  "about",
  "adobeair",
  "ajax",
  "autoembed",
  "autogrow",
  "autolink",
  "balloonpanel",
  "bbcode",
  "bidi",
  "clipboard",
  "codesnippet",
  "codesnippetgeshi",
  "colorbutton",
  "colordialog",
  "copyformatting",
  "devtools",
  "dialog",
  "dialogadvtab",
  "div",
  "divarea",
  "docprops",
  "embed",
  "embedbase",
  "embedsemantic",
  "filetools",
  "find",
  "flash",
  "font",
  "forms",
  "iframe",
  "iframedialog",
  "image",
  "image2",
  "indentblock",
  "justify",
  "language",
  "lineutils",
  "link",
  "liststyle",
  "magicline",
  "mathjax",
  "newpage",
  "notification",
  "notificationaggregator",
  "pagebreak",
  "panelbutton",
  "pastefromword",
  "placeholder",
  "preview",
  "print",
  "save",
  "scayt",
  "selectall",
  "sharedspace",
  "showblocks",
  "smiley",
  "sourcedialog",
  "specialchar",
  "stylesheetparser",
  "table",
  "tableresize",
  "tabletools",
  "tableselection",
  "templates",
  "uicolor",
  "uploadfile",
  "uploadimage",
  "uploadwidget",
  "widget",
  "widgetselection",
  "wsc",
  "xml",
];

var getPath = function(name, languages, theme) {
  let pwd = path.join(ckf,'..', 'plugins');
  let join = (f) => path.join(pwd, f);
  let files = [];
  switch(name) {
    case "a11yhelp":
      files.push(join(`${name}/dialogs/${name}.js`));
      languages.forEach(lang => files.push(join(`${name}/dialogs/lang/${lang}.js`)));
      break;
    case "about":
      files.push(join(`${name}/dialogs/${name}.js`));
      break;
    case "adobeair":
      files.push(join(`${name}/plugin.js`));
      break;
    case "ajax":
      files.push(join(`${name}/plugin.js`));
      break;
    case "autoembed":
      files.push(join(`${name}/plugin.js`));
      languages.forEach(lang =>files.push(join(`${name}/lang/${lang}.js`)));
      break;
    case "autogrow":
      files.push(join(`${name}/plugin.js`));
      break;
    case "autolink":
      files.push(join(`${name}/plugin.js`));
      break;
    case "balloonpanel":
      files.push(join(`${name}/plugin.js`));
      if (['kama', 'moono', 'moono-lisa'].includes(theme) < 0) theme = "moono";
      files.push(join(`${name}/skins/${theme}/${name}.css`));
      break;
    case "bbcode":
      files.push(join(`${name}/plugin.js`));
      break;
    case "bidi":
      files.push(join(`${name}/plugin.js`));
      break;
    case "clipboard":
      files.push(join(`${name}/dialogs/paste.js`));
      break;
    case "codesnippet":
      files.push(join(`${name}/plugin.js`));
      break;
    case "codesnippetgeshi":
      files.push(join(`${name}/plugin.js`));
      break;
    case "colorbutton":
      files.push(join(`${name}/plugin.js`));
      break;
    case "colordialog":
      files.push(join(`${name}/plugin.js`));
      break;
    case "copyformatting":
      files.push(join(`${name}/plugin.js`));
      break;
    case "devtools":
      files.push(join(`${name}/plugin.js`));
      break;
    case "dialog":
      files.push(join(`${name}/Definition.js`));
      break;
    case "dialogadvtab":
      files.push(join(`${name}/plugin.js`));
      break;
    case "div":
      files.push(join(`${name}/plugin.js`));
      break;
    case "divarea":
      files.push(join(`${name}/plugin.js`));
      break;
    case "docprops":
      files.push(join(`${name}/plugin.js`));
      break;
    case "embed":
      files.push(join(`${name}/plugin.js`));
      break;
    case "embedbase":
      files.push(join(`${name}/plugin.js`));
      break;
    case "embedsemantic":
      files.push(join(`${name}/plugin.js`));
      break;
    case "filetools":
      files.push(join(`${name}/plugin.js`));
      break;
    case "find":
      files.push(join(`${name}/plugin.js`));
      break;
    case "flash":
      files.push(join(`${name}/plugin.js`));
      break;
    case "font":
      files.push(join(`${name}/plugin.js`));
      languages.forEach(lang =>files.push(join(`${name}/lang/${lang}.js`)));
      break;
    case "forms":
      files.push(join(`${name}/plugin.js`));
      languages.forEach(lang =>files.push(join(`${name}/lang/${lang}.js`)));
      break;
    case "iframe":
      files.push(join(`${name}/plugin.js`));
      break;
    case "iframedialog":
      files.push(join(`${name}/plugin.js`));
      break;
    case "image":
      files.push(join(`${name}/dialogs/${name}.js`));
      break;
    case "image2":
      files.push(join(`${name}/plugin.js`));
      languages.forEach(lang =>files.push(join(`${name}/lang/${lang}.js`)));
      break;
    case "indentblock":
      files.push(join(`${name}/plugin.js`));
      break;
    case "justify":
      files.push(join(`${name}/plugin.js`));
      languages.forEach(lang =>files.push(join(`${name}/lang/${lang}.js`)));
      break;
    case "language":
      files.push(join(`${name}/plugin.js`));
      break;
    case "lineutils":
      files.push(join(`${name}/plugin.js`));
      break;
    case "link":
      files.push(join(`${name}/dialogs/${name}.js`));
      files.push(join(`${name}/dialogs/anchor.js`));
      break;
    case "liststyle":
      files.push(join(`${name}/plugin.js`));
      break;
    case "magicline":
      break;
    case "mathjax":
      files.push(join(`${name}/plugin.js`));
      break;
    case "newpage":
      files.push(join(`${name}/plugin.js`));
      break;
    case "notification":
      files.push(join(`${name}/plugin.js`));
      break;
    case "notificationaggregator":
      files.push(join(`${name}/plugin.js`));
      break;
    case "pagebreak":
      files.push(join(`${name}/plugin.js`));
      break;
    case "panelbutton":
      files.push(join(`${name}/plugin.js`));
      break;
    case "pastefromword":
      break;
    case "placeholder":
      files.push(join(`${name}/plugin.js`));
      break;
    case "preview":
      files.push(join(`${name}/plugin.js`));
      break;
    case "print":
      files.push(join(`${name}/plugin.js`));
      break;
    case "save":
      files.push(join(`${name}/plugin.js`));
      break;
    case "scayt":
      files.push(join(`${name}/dialogs/options.js`));
      files.push(join(`${name}/skins/moono-lisa/${name}.css`));
      break;
    case "selectall":
      files.push(join(`${name}/plugin.js`));
      break;
    case "sharedspace":
      files.push(join(`${name}/plugin.js`));
      break;
    case "showblocks":
      files.push(join(`${name}/plugin.js`));
      break;
    case "smiley":
      files.push(join(`${name}/plugin.js`));
      break;
    case "sourcedialog":
      files.push(join(`${name}/plugin.js`));
      break;
    case "specialchar":
      files.push(join(`${name}/dialogs/${name}.js`));
      languages.forEach(lang =>files.push(join(`${name}/dialogs/lang/${lang}.js`)));
      break;
    case "stylesheetparser":
      files.push(join(`${name}/plugin.js`));
      break;
    case "table":
      files.push(join(`${name}/dialogs/${name}.js`));
      break;
    case "tableresize":
      files.push(join(`${name}/plugin.js`));
      break;
    case "tabletools":
      files.push(join(`${name}/dialogs/tableCell.js`));
      break;
    case "tableselection":
      files.push(join(`${name}/styles/tableselection.css`));
      break;
    case "templates":
      files.push(join(`${name}/plugin.js`));
      break;
    case "uicolor":
      files.push(join(`${name}/plugin.js`));
      break;
    case "uploadfile":
      files.push(join(`${name}/plugin.js`));
      break;
    case "uploadimage":
      files.push(join(`${name}/plugin.js`));
      break;
    case "uploadwidget":
      files.push(join(`${name}/plugin.js`));
      break;
    case "widget":
      files.push(join(`${name}/plugin.js`));
      languages.forEach(lang =>files.push(join(`${name}/lang/${lang}.js`)));
      break;
    case "widgetselection":
      files.push(join(`${name}/plugin.js`));
      break;
    case "wsc":
      files.push(join(`${name}/dialogs/${name}.js`));
      files.push(join(`${name}/skins/moono-lisa/${name}.css`));
      break;
    case "xml":
      files.push(join(`${name}/plugin.js`));
      break;
  }
  return files;
};

var loader = function(plugins, languages, theme = 'mono') {
  let CODE = '';

  plugins.forEach(plugin => {
    if (CKPlugins.indexOf(plugin) >= 0) {
      let f = getPath(plugin, languages, theme);
      CODE += readFile(f);
    } else {
      CODE += readFile(plugin);
    }
  });

  return CODE;
};

loader.AllPlugins = CKPlugins;

module.exports = loader;
