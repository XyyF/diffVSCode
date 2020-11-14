const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const {queryConfigs} = require('./__query.config');

const Key = 'elfin.vscode.filling'

// 新建小程序Page
module.exports = function compilePage(context) {
  // 注册命令
  const disposable = vscode.commands.registerTextEditorCommand('elfin.wcn.compilePage', async () => {
    if (vscode.window.activeTextEditor) {
      // 修改 project.config.json 文件内容
      const appFilePath = vscode.workspace.rootPath + path.sep + 'project.config.json';
      if (fs.existsSync(appFilePath)) {
        // 读取文件内容
        const contents = fs.readFileSync(appFilePath, 'utf-8');
        const parseContents = JSON.parse(contents.toString());

        // 获取文件路径
        const ext = path.extname(vscode.window.activeTextEditor.document.fileName);
        const fullPath = vscode.window.activeTextEditor.document.fileName.split(path.sep).join('/');
        const tempPath = fullPath.replace(new RegExp(`${ext}$`), '');
        const pathName = tempPath.split(`${vscode.workspace.name}/`).pop();

        // 替换文件内容
        const list = parseContents.condition.miniprogram.list;
        const itemIndex = list.findIndex(e => e.name === Key);
        if (itemIndex > -1) {
          list.splice(itemIndex, 1);
        }
        const item = await createCompileItem(pathName);
        list.unshift(item);

        // 写文件内容
        fs.writeFileSync(appFilePath, JSON.stringify(parseContents, null, '\t'));
      }
    }
  });

  context.subscriptions.push(disposable);
};

async function createCompileItem(pathName) {
  let query = ''
  const querys = queryConfigs[pathName];
  if (querys) {
    query = await vscode.window.showQuickPick(querys);
  }

  return Promise.resolve({
    "id": -1,
    "name": Key,
    "pathName": pathName,
    "query": query
  })
}