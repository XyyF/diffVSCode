const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const tmp = require('tmp');

// 新建小程序Page
module.exports = function comparePage(context) {
  // 注册命令
  const disposable = vscode.commands.registerTextEditorCommand('elfin.wcn.comparePage', async () => {
    // 获取UI工程路径
    const settings = vscode.workspace.getConfiguration('elfin');
    const UIRootPath = settings.UIRootPath;
    if (!fs.existsSync(UIRootPath)) {
      return vscode.window.showErrorMessage('错误的UIRootPath，请在设置中确认！');
    }
    // 获取UI文件路径
    const UIPath = getPath();
    if (!UIPath) {
      return vscode.window.showErrorMessage('未匹配 <!-- path/，请确认文件径路是否设置 或者 正确');
    }
    if (path.extname(path.join(UIPath)) !== '.wxml') {
      return vscode.window.showErrorMessage('<!-- path/ 未以.wxml结束，请确认文件径路是否正确');
    }
    // 获取分支名
    const branch = await getBranch(UIRootPath);
    if (!branch) {
      return vscode.window.showErrorMessage('未正确获取UI工程当前分支！');
    }
    // 获取最新的commitId
    const commitId = await getCommitId(UIPath, branch, UIRootPath);
    if (!commitId) {
      return vscode.window.showErrorMessage('未正确获取UI工程文件当前记录commitId！');
    }

    // 获取最新的文件内容
    const content = await getPageContent(commitId, UIPath, UIRootPath);
    const tempFile = await getCommitFile(content, commitId);

    // 对比文件
    vscode.commands.executeCommand(
      'vscode.diff',
      // 本地文件
      vscode.Uri.file(vscode.window.activeTextEditor.document.fileName),
      // UI临时文件
      tempFile,
      'elfin.vscode.UI.diff',
      { preview: true },
    )
  });

  context.subscriptions.push(disposable);
};


/**
 * 根据文件内定义的path内容，获取对应的UI路径
 */
function getPath() {
  const custRegExp = /^\<\!\-\- path\/([a-zA-Z0-9\/\-_.]*) \-\-\>$/g;
  const activeTextEditor = vscode.window.activeTextEditor;
  let matchPath = '';
  // 从首行开始匹配
  const range = activeTextEditor.document.getWordRangeAtPosition(
    new vscode.Position(0, 0),
    custRegExp,
  );
  if (typeof range !== 'undefined') {
    const match = custRegExp.exec(activeTextEditor.document.getText(range));
    if (match) {
      matchPath = match.pop();
    }
  }
  return matchPath;
};

/**
 * UI工程中的当前分支
 */
function getBranch(UIRootPath) {
  return new Promise((resolve, reject) => {
    try {
      const branchRegExp = /^\* (.*)/g;``
      const content = childProcess.execSync('git branch', {
        cwd: UIRootPath,
      });
      const match = branchRegExp.exec(content.toString());
      return resolve(match && match.pop());
    } catch (error) {
      vscode.window.showErrorMessage('获取UI工程本地分支失败，请确认git配置 或者 路径正确后操作');
      reject(error);
    }
  })
};

/**
 * 某个文件的远端最新commmitId
 * @param {*} UIPath 
 * @param {*} branch 
 */
function getCommitId(UIPath, branch, UIRootPath) {
  return new Promise((resolve, reject) => {
    try {
      const commitRegExp = /^\* (.*)/g;
      const content = childProcess.execSync(`git log remotes/origin/${branch} -1 --pretty=format:"%H" --graph ${UIPath}`, {
        cwd: UIRootPath,
      });
      const match = commitRegExp.exec(content.toString());
      return resolve(match && match.pop());
    } catch (error) {
      vscode.window.showErrorMessage('获取远端文件记录错误，可能是文件被删除 或者 路径错误，请确认后操作');
      reject(error);
    }
  })
};

/**
 * 获取远端文件的最新内容
 * @param {*} commitId 
 * @param {*} UIPath 
 */
function getPageContent(commitId, UIPath, UIRootPath) {
  return new Promise((resolve, reject) => {
    try {
      const content = childProcess.execSync(`git show --textconv ${commitId}:${UIPath}`, {
        cwd: UIRootPath,
      });
      return resolve(content.toString());
    } catch (error) {
      vscode.window.showErrorMessage('获取远端文件内容错误，可能是文件被删除 或者 路径错误，请确认后操作');
      reject(error);
    }
  })
};

/**
 * 获取远端最新的内容的临时文件
 * @param {*} content 
 * @param {*} commitId 
 */
function getCommitFile(content, commitId) {
  const filePath = 'elfin.vscode.wxml';
  return new Promise((resolve, reject) => {
    tmp.file({}, async (err, tmpPath) => {
      if (err) return reject(err);

      try {
        // 文件目录
        const tmpDirPath = path
          .join(path.dirname(tmpPath), 'elfin.vscode')
          .replace(/\\/g, '/');
        // 临时文件路径
        const tmpFile = path.join(tmpDirPath, `${commitId}${new Date().getTime()}${path.basename(tmpPath)}-${path.basename(filePath)}`);
        if (!fs.existsSync(tmpDirPath)) {
          await fs.mkdirSync(tmpDirPath)
        }
        await fs.writeFileSync(tmpFile, content);
        resolve(vscode.Uri.file(tmpFile));
      } catch (ex) {
        vscode.window.showErrorMessage(`未知错误: ${ex}`);
        reject(ex);
      }
    });
  });
};