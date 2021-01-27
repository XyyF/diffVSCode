const vscode = require('vscode');
const path = require('path');

const Shell = require('../../utils/Shell');
const documents = {};
const shell = new Shell();

// 遍历所有的markdown
const markdowns = shell.readDeepDir(path.join(__dirname, '../../documents/wx'));
markdowns.forEach((file) => {
  const filename = path.basename(file).replace('.md', '');
  documents[filename] = shell.loadFlieFromScript(file);
});

function provideHover(document, position) {
  const apiName = document.getText(document.getWordRangeAtPosition(position));
  if (documents[apiName]) {
    return new vscode.Hover(new vscode.MarkdownString(documents[apiName]));
  }
  return null;
};

module.exports = function (context) {
  // 注册实现定义提示，第一个参数表示仅对javascript文件生效
  context.subscriptions.push(vscode.languages.registerHoverProvider(['javascript'], {
    provideHover,
  }));
};
