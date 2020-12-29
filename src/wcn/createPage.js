const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const Ejs = require('../../utils/ejs');

// 新建小程序Page
module.exports = function createPage(context) {
    // 注册命令
    const disposable = vscode.commands.registerCommand('elfin.minipro.createPage', (url) => {
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
                    const currentDir = url.fsPath.split(path.sep).pop();

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
                    const fileName = file === 'index' ? (dir || currentDir) : file;
                    const ejs = new Ejs({ fileName });

                    // 渲染页面
                    const js = ejs.renderWcnPageJs();
                    const wxml = ejs.renderWcnPageWxml();
                    const wxss = ejs.renderWcnPageWxss();
                    const json = ejs.renderWcnPageJson();

                    // 如果使用者输入了目录的话
                    if (dir) {
                        // 如果已经存在目录则跳过错误
                        try {
                            fs.mkdirSync(`${url.fsPath}${path.sep}${dir}`);
                        } catch (err) {
                            console.log(err);
                        }
                        file = `${dir}${path.sep}${file}`;
                    }
                    // 写页面
                    fs.writeFileSync(`${url.fsPath}${path.sep}${file}.js`, `${js}\n`);
                    fs.writeFileSync(`${url.fsPath}${path.sep}${file}.wxml`, `${wxml}\n`);
                    fs.writeFileSync(`${url.fsPath}${path.sep}${file}.wxss`, wxss);
                    fs.writeFileSync(`${url.fsPath}${path.sep}${file}.json`, json);

                    // 修改 app.json 文件内容
                    const appFilePath = `${vscode.workspace.rootPath + path.sep}app.json`;
                    if (fs.existsSync(appFilePath)) {
                        // 读取文件内容
                        const contents = fs.readFileSync(appFilePath, 'utf-8');
                        const parseContents = JSON.parse(contents.toString());
                        // 转化文件内容
                        const fullPath = `${url.fsPath.split(path.sep).join('/')}/${file.split(path.sep).join('/')}`;
                        const tempPath = fullPath.split(`${vscode.workspace.name}/`).pop(); // 相对根目录路径
                        const tempDir = tempPath.split('/').shift(); // 主root目录
                        // 如果是子包的路径的话，需要在子包中添加相应的路径
                        const subPackages = parseContents.subPackages || [];
                        const subPackage = subPackages.find(subPackage => {
                            return subPackage.root === tempDir;
                        });
                        if (subPackage) {
                            // 子包路径
                            subPackage.pages.push(tempPath.split(`${tempDir}/`).pop());
                        } else {
                            // 主包路径
                            parseContents.pages.push(tempPath);
                        }
                        // 写文件内容
                        fs.writeFileSync(appFilePath, JSON.stringify(parseContents, null, '\t'));
                    }
                } else {
                    vscode.window.showErrorMessage('页面名称不能为空！');
                }
            });
    });

    context.subscriptions.push(disposable);
};
