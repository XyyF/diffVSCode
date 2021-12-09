const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const Ejs = require('../../utils/ejs');

// 新建小程序Component
module.exports = function createComponent(context, isWekf) {
    // 注册命令
    const disposable = vscode.commands.registerCommand('elfin.minipro.createComponent', (url) => {
        vscode.window
            .showInputBox({
                placeHolder: '请输入组件名称，可以输入 component 或者 component/index',
                prompt: '请输入组件名称，可以输入 component 或者 component/index',
            })
            .then((userStr) => {
                if (userStr) {
                    // 用户输入的 目录 & 文件名
                    let file;

                    // 兼容 component 和 component/index
                    if (userStr.indexOf('/') > -1) {
                        const paths = userStr.split('/');
                        // 如果已经存在目录则跳过错误
                        const dir = paths[0];
                        try {
                            fs.mkdirSync(`${url.fsPath}${path.sep}${dir}`);
                        } catch (err) {
                            console.log(err);
                        }
                        file = `${dir}${path.sep}${paths[1]}`;
                    } else {
                        file = userStr;
                    }

                    // 渲染模板数据
                    const ejs = new Ejs();
                    let js, wxml, wxss, json;
                    if (isWekf) {
                        js = ejs.renderWekfComponentJs();
                        wxml = ejs.renderWekfComponentWxml();
                        wxss = ejs.renderWekfComponentWxss();
                        json = ejs.renderWekfComponentJson();
                    } else {
                        js = ejs.renderMiniProComponentJs();
                        wxml = ejs.renderMiniProComponentWxml();
                        wxss = ejs.renderMiniProComponentWxss();
                        json = ejs.renderMiniProComponentJson();
                    }

                    fs.writeFileSync(`${url.fsPath}${path.sep}${file}.js`, `${js}\n`);
                    fs.writeFileSync(`${url.fsPath}${path.sep}${file}.wxml`, `${wxml}\n`);
                    fs.writeFileSync(`${url.fsPath}${path.sep}${file}.wxss`, wxss);
                    fs.writeFileSync(`${url.fsPath}${path.sep}${file}.json`, json);
                } else {
                    vscode.window.showErrorMessage('组件名称不能为空！');
                }
            });
    });

    context.subscriptions.push(disposable);
};
