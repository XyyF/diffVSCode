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
                placeHolder: '请输入页面名称，可以输入 page 或者 page/index',
                prompt: '请输入页面名称，可以输入 page 或者 page/index',
            })
            .then((userStr) => {
                if (userStr) {
                    // 用户输入的 目录 & 文件名
                    let dir, file;
                    // 当前的目录名
                    const currentDir = url.fsPath.split('\\').pop();

                    // 兼容 page 和 page/index
                    if (userStr.indexOf('/') > -1) {
                        const paths = userStr.split('/');
                        dir = paths[0];
                        file = paths[1];
                    } else {
                        file = userStr;
                    }

                    // 渲染模板数据，文件名尽量不要用index
                    // page => page
                    // page/index => page
                    // index => currentDir
                    const fileName = file === 'index' ? (dir || currentDir) : file
                    const ejs = new Ejs({ fileName });

                    // 渲染页面
                    const js = ejs.renderWcnPageJs();
                    const wxml = ejs.renderWcnPageWxml();
                    const wxss = ejs.renderWcnPageWxss();
                    const json = ejs.renderWcnPageJson();

                    // 如果使用者输入了目录的话
                    if (dir) {
                        fs.mkdirSync(`${url.fsPath}${path.sep}${dir}`)
                        file = `${dir}${path.sep}${file}`;
                    }
                    // 写页面
                    fs.writeFileSync(`${url.fsPath}${path.sep}${file}.js`, js);
                    fs.writeFileSync(`${url.fsPath}${path.sep}${file}.wxml`, wxml);
                    fs.writeFileSync(`${url.fsPath}${path.sep}${file}.wxss`, wxss);
                    fs.writeFileSync(`${url.fsPath}${path.sep}${file}.json`, json);

                    // 修改 project.config.js 文件内容
                    const projectFilePath = vscode.workspace.rootPath + 'project.config.js'
                    if (fs.existsSync(projectFilePath)) {
                        console.log('projectFilePath', projectFilePath)
                    }
                } else {
                    vscode.window.showErrorMessage('页面名称不能为空！')
                }
            })
    });

    context.subscriptions.push(disposable);
};