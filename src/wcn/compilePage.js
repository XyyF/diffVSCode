const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const Key = 'elfin.vscode';

// 新建小程序Page
module.exports = function compilePage(context) {
  // 注册命令
  const disposable = vscode.commands.registerTextEditorCommand('elfin.wcn.compilePage', async () => {
    if (vscode.window.activeTextEditor) {
      // 修改 project.config.json 文件内容
      const appFilePath = `${vscode.workspace.rootPath + path.sep}project.config.json`;
      if (fs.existsSync(appFilePath)) {
        // 读取文件内容
        const contents = fs.readFileSync(appFilePath, 'utf-8');
        const parseContents = JSON.parse(contents.toString());

        // 获取文件路径
        const ext = path.extname(vscode.window.activeTextEditor.document.fileName);
        const fullPath = vscode.window.activeTextEditor.document.fileName.split(path.sep).join('/');
        const tempPath = fullPath.replace(new RegExp(`${ext}$`), '');
        const pathName = tempPath.split(`${vscode.workspace.name}/`).pop();

        // 补全字段内容
        const condition = parseContents.condition;
        if (condition) {
          const miniprogram = condition.miniprogram;
          if (miniprogram && !miniprogram.list) {
            parseContents.condition.miniprogram.list = [];
          } else if (!miniprogram) {
            parseContents.condition.miniprogram = {};
            parseContents.condition.miniprogram.list = [];
          }
        } else {
          parseContents.condition = {};
          parseContents.condition.miniprogram = {};
          parseContents.condition.miniprogram.list = [];
        }

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

/**
 * 创建编译选项
 */
async function createCompileItem(pathName) {
  let query = '';
  const querys = getQuery();
  if (querys && querys.length > 1) {
    query = await vscode.window.showQuickPick(querys);
  } else if (querys && querys.length === 1) {
    query = querys[0];
  }

  return Promise.resolve({
    id: -1,
    name: Key,
    pathName: pathName,
    query: query,
  });
};

/**
 * 根据文件内定义的query内容选择编译需要的query
 */
function getQuery() {
  const custRegExp = /^\/\/ query\?(.*)/g;
  let isCarryOn = true, line = 0;
  const activeTextEditor = vscode.window.activeTextEditor;
  const matchArry = [];
  while (isCarryOn) {
    // 从首行开始匹配
    const range = activeTextEditor.document.getWordRangeAtPosition(
      new vscode.Position(line, 0),
      custRegExp,
    );
    if (typeof range === 'undefined') {
      isCarryOn = false;
    } else {
      const match = custRegExp.exec(activeTextEditor.document.getText(range));
      if (match) {
        line++;
        matchArry.push(match.pop());
      }
    }
  }
  return matchArry;
};
