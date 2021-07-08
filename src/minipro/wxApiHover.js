const vscode = require('vscode');

const Shell = require('../../utils/Shell');
const shell = new Shell();

// 遍历所有的json
const miniproJs = JSON.parse(shell.loadFileFromElfinRoot('src/snippets/miniproJs.json'));
const miniproJson = JSON.parse(shell.loadFileFromElfinRoot('src/snippets/miniproJson.json'));
const miniproWxml = JSON.parse(shell.loadFileFromElfinRoot('src/snippets/miniproWxml.json'));

function provideHoverJs(document, position) {
  let apiName = document.getText(document.getWordRangeAtPosition(position));
  if (!apiName) return;

  apiName = apiName.replace(/"/g, '');
  const jstag = `minipro-js-${apiName}`;
  if (miniproJs[jstag]) {
    return new vscode.Hover(
      new vscode.MarkdownString(`${miniproJs[jstag].description} \r\n` + '\r\n' + `[官方文档](${miniproJs[jstag].url})`)
    );
  }
  return null;
}
function provideHoverWxml(document, position) {
  const custRegExp = /<[A-Za-z0-9-]+/;
  const range = document.getWordRangeAtPosition(position, custRegExp);
  if (!range) return;
  let apiName = document.getText(range).match(custRegExp)[0];;
  if (!apiName) return;

  // 将<符号去除
  apiName = apiName.replace(/</g, '');

  const wxmltag = `minipro-wxml-${apiName}`;
  if (miniproWxml[wxmltag]) {
    return new vscode.Hover(
      new vscode.MarkdownString(`${miniproWxml[wxmltag].description} \r\n` + '\r\n' + `[官方文档](${miniproWxml[wxmltag].url})`)
    );
  }
  return null;
}
function provideHoverJson(document, position) {
  const custRegExp = /"[A-Za-z0-9-]+"/;
  const range = document.getWordRangeAtPosition(position, custRegExp);
  if (!range) return;
  let apiName = document.getText(range);
  if (!apiName) return;

  apiName = apiName.replace(/"/g, '');
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
