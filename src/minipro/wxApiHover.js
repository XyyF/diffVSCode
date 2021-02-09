const vscode = require('vscode');
const path = require('path');

const Shell = require('../../utils/Shell');
const documents = {};
const shell = new Shell();

// 遍历所有的json
const miniproJs = JSON.parse(shell.loadFileFromElfinRoot('src/snippets/miniproJs.json'));
const miniproJson = JSON.parse(shell.loadFileFromElfinRoot('src/snippets/miniproJson.json'));
const miniproWxml = JSON.parse(shell.loadFileFromElfinRoot('src/snippets/miniproWxml.json'));
// 遍历所有的markdown
const markdowns = shell.readDeepDir(path.join(__dirname, '../../documents/wx'));
markdowns.forEach((file) => {
  const filename = path.basename(file).replace('.md', '');
  documents[filename] = shell.loadFlieFromScript(file);
});

function provideHoverJs(document, position) {
  let apiName = document.getText(document.getWordRangeAtPosition(position));
  if (!apiName) return;

  apiName = apiName.replace(/"/g, '');
  if (documents[apiName]) {
    return new vscode.Hover(new vscode.MarkdownString(documents[apiName]));
  }
  const jstag = `minipro-js-${apiName}`;
  if (miniproJs[jstag]) {
    return new vscode.Hover(
      new vscode.MarkdownString(`${miniproJs[jstag].description} \r\n` + '\r\n' + `[官方文档](${miniproJs[jstag].url})`)
    );
  }
  return null;
}
function provideHoverWxml(document, position) {
  let apiName = document.getText(document.getWordRangeAtPosition(position));
  if (!apiName) return;

  apiName = apiName.replace(/"/g, '');
  if (documents[apiName]) {
    return new vscode.Hover(new vscode.MarkdownString(documents[apiName]));
  }
  const wxmltag = `minipro-wxml-${apiName}`;
  if (miniproWxml[wxmltag]) {
    return new vscode.Hover(
      new vscode.MarkdownString(`${miniproWxml[wxmltag].description} \r\n` + '\r\n' + `[官方文档](${miniproWxml[wxmltag].url})`)
    );
  }
  return null;
}
function provideHoverJson(document, position) {
  let apiName = document.getText(document.getWordRangeAtPosition(position));
  if (!apiName) return;

  apiName = apiName.replace(/"/g, '');
  if (documents[apiName]) {
    return new vscode.Hover(new vscode.MarkdownString(documents[apiName]));
  }
  const jsontag = `minipro-json-${apiName}`;
  if (miniproJson[jsontag]) {
    return new vscode.Hover(
      new vscode.MarkdownString(`${miniproJson[jsontag].description} \r\n` + '\r\n' + `[官方文档](${miniproJson[jsontag].url})`)
    );
  }
  return null;
}

module.exports = function (context) {
  // 注册实现定义提示，第一个参数表示仅对javascript文件生效
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(['javascript'], {
      provideHover: provideHoverJs,
    }),
    vscode.languages.registerHoverProvider(['wxml'], {
      provideHover: provideHoverWxml,
    }),
    vscode.languages.registerHoverProvider(['json'], {
      provideHover: provideHoverJson,
    }),
  );
};
