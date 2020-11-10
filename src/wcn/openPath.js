/* jshint esversion: 6 */

//Required modules
const vscode = require('vscode');
const fs = require('fs');

const custRegExp = /['|"|`]([^'|"|`|?]+)['|"|`|?]/;

//Set error view
const showError = message => vscode.window.showErrorMessage(`elfin vscode: ${message}`);

function provideDefinition(document, position, token) {
    // 确保工作空间打开状态
    if (!vscode.workspace.rootPath) {
        showError('You must have a workspace opened.');
        return [];
    }

    const editor = vscode.window.activeTextEditor;
    // 通过正则从 光标两侧开始匹配
    const range = editor.document.getWordRangeAtPosition(editor.selection.active, custRegExp);

    // 没有匹配的话
    if (typeof range === 'undefined') return [];
    // 匹配url字符串
    const matchArray = editor.document.getText(range).match(custRegExp);

    // 找到最后一个可用元素
    let found = 0;
    for (var i = 1; i < matchArray.length; i++) {
        if (typeof matchArray[i] !== 'undefined') {
            found = i;
            break;
        }
    }
    if (found == 0) return [];

    let lastPart = matchArray[found].trim();
    // 去除 ./ ../
    lastPart = lastPart.replace(/^.+\.\//, '');
    if (lastPart.indexOf('./') > -1) lastPart = lastPart.replace('./', '');

    // 最终的地址
    const destPath = `${vscode.workspace.rootPath}${lastPart}.js`;
    if (fs.existsSync(destPath)) {
        // new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
        return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
    }
};

module.exports = function (context) {
    // 注册如何实现跳转到定义，第一个参数表示仅对javascript文件生效
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(['javascript'], {
        provideDefinition,
    }));
};