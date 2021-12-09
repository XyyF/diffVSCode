const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const statusBarItem = {
  instance: null,
  command: 'elfin.pixui.switchGameClick',
  alignment: vscode.StatusBarAlignment.Left,
  priority: 10000,
  text: 'build:暂无',
  color: 'white',
  show: false,
};

// 切换项目mode
module.exports = function registerPixuiSwitchMode(context) {
  // 底部按钮
  if (!statusBarItem.instance) {
    statusBarItem.instance = vscode.window.createStatusBarItem(statusBarItem.alignment, statusBarItem.priority);
    // 执行的命令
    statusBarItem.instance.command = statusBarItem.command;
    // 展示的文本
    statusBarItem.instance.color = statusBarItem.color;
    const BuildPathConst = `${vscode.workspace.rootPath + path.sep}pixide-system-config/apps.json`;
    const game = findCurrentGame(BuildPathConst);
    if (game) {
      const text = `build:${game}`;
      statusBarItem.instance.text = text;
      statusBarItem.text = text;
      statusBarItem.instance.show();
    } else {
      statusBarItem.instance.text = statusBarItem.text;
    }
    // 展示文本内容
    statusBarItem.instance.show();
    statusBarItem.show = true;
  }

  // 注册命令
  context.subscriptions.push(vscode.commands.registerCommand('elfin.pixui.switchGameClick', async () => {
    // 【1、清理dist文件夹】
    const DistPathConst = `${vscode.workspace.rootPath + path.sep}dist/.build/`;
    deleteFolder(DistPathConst);

    let game = '', games = [];
    // 【2、找到游戏列表】
    const CodePathConst = `${vscode.workspace.rootPath + path.sep}src/`;
    games = findGameList(CodePathConst);

    // 【3、选择游戏】
    if (games && games.length > 1) {
      game = await vscode.window.showQuickPick(games);
    } else if (games && games.length === 1) {
      game = games[0];
    }
    if (game == '') {
      vscode.window.showInformationMessage('elfin_vscode: 未选择切换游戏');
      return;
    }

    // 【4、修改打包配置】
    const BuildPathConst = `${vscode.workspace.rootPath + path.sep}pixide-system-config/apps.json`;
    if (game && fs.existsSync(BuildPathConst)) {
      const contents = fs.readFileSync(BuildPathConst, 'utf-8');
      const parseContents = JSON.parse(contents.toString());
      if (parseContents) {
        const app = parseContents.find(item => item.name === 'app');
        if (app) {
          app.template = `./src/${game}/index.html`;
          app.entry = `./src/${game}/main.tsx`;
        } else {
          parseContents.unshift({
            name: 'app',
            template: `./src/${game}/index.html`,
            entry: `./src/${game}/main.tsx`,
          });
        }
        // 写文件内容
        fs.writeFileSync(BuildPathConst, JSON.stringify(parseContents, null, '\t'));
        vscode.window.showInformationMessage(`elfin_vscode: 切换打包项目成功: ${game}`);

        // 【5、切换文本展示内容】
        const text = `build:${game}`;
        statusBarItem.instance.text = text;
        statusBarItem.text = text;
        return;
      }
    }
    vscode.window.showWarningMessage('elfin_vscode: 切换打包游戏失败');
  }));
};

/**
 * 递归删除文件夹内容
 * @param {string} filePath
 */
function deleteFolder(filePath) {
  if (fs.existsSync(filePath)) {
    const files = fs.readdirSync(filePath);
    files.forEach((file) => {
      const curFilePath = `${filePath}/${file}`;
      const states = fs.statSync(curFilePath);
      if (states.isDirectory()) {
        // 递归
        deleteFolder(curFilePath);
      } else {
        // 删除文件
        fs.unlinkSync(curFilePath);
      }
    });
    fs.rmdirSync(filePath);
  }
};

/**
 * 找到游戏列表
 * @param {string} gamesPath
 */
function findGameList(gamesPath) {
  if (fs.existsSync(gamesPath)) {
    const games = fs.readdirSync(gamesPath);
    const execGames = ['app', 'asset', 'common', 'preprocess'];
    return games.filter((file) => execGames.indexOf(file) === -1);
  }
  return [];
}

function findCurrentGame(buildPath) {
  if (fs.existsSync(buildPath)) {
    const contents = fs.readFileSync(buildPath, 'utf-8');
    const parseContents = JSON.parse(contents.toString());
    if (parseContents) {
      const app = parseContents.find(item => item.name === 'app');
      if (app && app.entry) {
        const matches = app.entry.match(/src\/([a-zA-Z0-9]+)\/main/);
        if (matches && matches[1]) {
          return matches[1];
        }
      }
    }
  }
  vscode.window.showWarningMessage('elfin_vscode: 获取打包游戏信息失败');
  return '';
}
