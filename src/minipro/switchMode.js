const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');
const appidProxy = require('./__appid');

// 改造 teenager页面js文件
module.exports = function switchMode(context) {
  // 注册命令
  const disposable = vscode.commands.registerTextEditorCommand('elfin.minipro.switchMode', async () => {
    if (vscode.window.activeTextEditor) {
      // 环境mode
      let mode = '';
      // 项目远端名
      const command = 'git remote -v';
      const originContent = childProcess.execSync(command, {
        cwd: vscode.workspace.rootPath,
      }).toString();

      const matches = originContent.match(/\/(.*?).git/);
      if (matches.length === 0) {
        return vscode.window.showErrorMessage('未匹配remote信息，请确认后重试');
      }

      const originRemote = matches.pop();

      // task ====> 修改 config.js
      const configFilePath = `${vscode.workspace.rootPath + path.sep}config.js`;
      if (fs.existsSync(configFilePath)) {
        // 根据选择的环境确定mode
        mode = await getMode(originRemote);
        if (!mode) {
          return vscode.window.showErrorMessage('未匹配mode，请检查配置后重试');
        }

        // 读取文件内容
        let contents = fs.readFileSync(configFilePath, 'utf-8');
        const custRegExp = /(let|const) mode = ['"](dev|pro)['"]/g;
        contents = contents.replace(custRegExp, (match, $1, $2) => {
          return match.replace($2, mode);
        });
        fs.writeFileSync(configFilePath, contents);
      } else {
        vscode.window.showInformationMessage('跳过config.js文件修改');
      }


      // task ====> 修改 project.config.json
      const appFilePath = `${vscode.workspace.rootPath + path.sep}project.config.json`;
      if (fs.existsSync(appFilePath)) {
        // 根据选择的环境确定appid
        const appid = getAppIdByMode(originRemote, mode);
        if (!appid) {
          return vscode.window.showErrorMessage('未匹配appid，请检查配置后重试');
        }

        // 读取文件内容
        const contents = fs.readFileSync(appFilePath, 'utf-8');
        const parseContents = JSON.parse(contents.toString());
        // 补全字段内容
        if (parseContents.appid !== appid) {
          parseContents.appid = appid;
          // 写文件内容 采用【两空格】制度
          fs.writeFileSync(appFilePath, JSON.stringify(parseContents, null, '  '));
        }
      } else {
        vscode.window.showInformationMessage('跳过project.config.json文件修改');
      }
    }
  });

  context.subscriptions.push(disposable);
};

/**
 * 选择mode环境
 * @param {string} originRemote
 */
async function getMode(originRemote) {
  const proxy = appidProxy[originRemote];
  if (!proxy) return '';

  let query = '';
  const modes = proxy.modes || [];
  const querys = modes.map(e => e.query);
  if (querys && querys.length > 1) {
    query = await vscode.window.showQuickPick(querys);
  } else if (querys && querys.length === 1) {
    query = querys[0];
  }

  const mode = modes.find(e => e.query === query);
  return mode.value;
};

/**
 * 根据mode返回指定的appid
 * @param {string} originRemote
 * @param {string} mode
 */
function getAppIdByMode(originRemote, mode) {
  const proxy = appidProxy[originRemote];
  if (!proxy) return '';
  const appids = proxy.appids || {};
  return appids[mode];
};
