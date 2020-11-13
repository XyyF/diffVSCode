const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const Ejs = require('../../utils/ejs');

// 新建小程序Component
module.exports = function createComponent(context) {
    // 注册命令
    const disposable = vscode.commands.registerCommand('elfin.wcn.createComponent', (url) => {
        vscode.window
            .showInputBox({
                placeHolder: '请输入组件名称',
                prompt: '请输入组件名称',
            })
            .then((fileName) => {
                if (fileName) {
                    // 渲染模板数据
                    const ejs = new Ejs({ fileName });
                    // js
                    const js = ejs.renderWcnComponentJs();
                    fs.writeFileSync(`${url.fsPath}${path.sep}${fileName}.js`, js);
                    // wxml
                    const wxml = ejs.renderWcnComponentWxml();
                    fs.writeFileSync(`${url.fsPath}${path.sep}${fileName}.wxml`, wxml);
                    // wxss
                    const wxss = ejs.renderWcnComponentWxss();
                    fs.writeFileSync(`${url.fsPath}${path.sep}${fileName}.wxss`, wxss);
                    // json
                    const json = ejs.renderWcnComponentJson();
                    fs.writeFileSync(`${url.fsPath}${path.sep}${fileName}.json`, json);
                } else {
                    vscode.window.showErrorMessage('组件名称不能为空！')
                }
            })
    });

    context.subscriptions.push(disposable);
};