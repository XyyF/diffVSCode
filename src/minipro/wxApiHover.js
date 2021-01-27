const vscode = require('vscode');
const context = {};

function provideHover(document, position) {
  const tagName = document.getText(document.getWordRangeAtPosition(position));
  if (context[tagName]) {
    let hoverTips = '';
    Object.keys(context[tagName]).forEach((key) => {
      hoverTips += context[tagName][key];
      hoverTips += `
            `;
    });
    return new vscode.Hover(new vscode.MarkdownString(hoverTips));
  }
  return null;
};

module.exports = {
  provideHover,
};
