const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const Ejs = require('../../utils/ejs');

// 新建小程序Page
module.exports = function createPage(context) {
    // 注册命令
    const disposable = vscode.commands.registerCommand('elfin.wcn.createPage', (url) => {
        vscode.window
            .showInputBox({
                placeHolder: '请输入页面名称',
                prompt: '请输入页面名称',
            })
            .then((fileName) => {
                if (fileName) {
                    // 渲染模板数据
                    const ejs = new Ejs({ fileName });
                    // js
                    const js = ejs.renderWcnPageJs();
                    fs.writeFileSync(`${url.fsPath}${path.sep}${fileName}.js`, js);
                    // wxml
                    const wxml = ejs.renderWcnPageWxml();
                    fs.writeFileSync(`${url.fsPath}${path.sep}${fileName}.wxml`, wxml);
                    // wxss
                    const wxss = ejs.renderWcnPageWxss();
                    fs.writeFileSync(`${url.fsPath}${path.sep}${fileName}.wxss`, wxss);
                    // json
                    const json = ejs.renderWcnPageJson();
                    fs.writeFileSync(`${url.fsPath}${path.sep}${fileName}.json`, json);
                } else {
                    vscode.window.showErrorMessage('页面名称不能为空！')
                }
            })
    });

    context.subscriptions.push(disposable);
};