/**
 * 跳转到定义
 */
const vscode = require('vscode');
const fs = require('fs');
const { underscores, levels } = require('./__wekf.config');

function getDestPathByWord(word, lineText) {
    if (underscores.indexOf(word) > -1) {
        return 'underscore.m.js';
    }
    const levelWord = levels.find(e => {
        if (new RegExp(`wekf\\.${e.label}`, 'g').test(lineText)) {
            if (e.words) {
                return e.words.indexOf(word) > -1;
            }
            return word === e.label;
        }
    });
    if (levelWord) {
        return levelWord.detail;
    }
    return null;
}

/**
 * 查找文件定义的provider，匹配到了就return一个location，否则不做处理
 * 最终效果是，当按住Ctrl键时，如果return了一个location，字符串就会变成一个可以点击的链接，否则无任何效果
 * @param {*} document
 * @param {*} position
 */
function provideDefinition(document, position) {
    const word = document.getText(document.getWordRangeAtPosition(position));
    const line = document.lineAt(position);

    if (new RegExp('wekf\\.', 'g').test(line.text)) {
        let destPath = `${vscode.workspace.rootPath}/node_modules/@tencent/kakashi-wekf/src/`;
        if (fs.existsSync(destPath)) {
            const file = getDestPathByWord(word, line.text);
            if (file) {
                destPath += file;
                // new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
                return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
            }
        }
    }
}

module.exports = function (context) {
    // 注册如何实现跳转到定义，第一个参数表示仅对javascript文件生效
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(['javascript'], {
        provideDefinition
    }));
};
