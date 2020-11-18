const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const tmp = require('tmp');

const UIRootPath = 'E:\TEG\\weapp-sndt';

// 新建小程序Page
module.exports = function comparePage(context) {
  // 注册命令
  const disposable = vscode.commands.registerTextEditorCommand('elfin.wcn.comparePage', async () => {
    // 获取UI文件路径
    const UIPath = getPath();
    // 获取分支名
    const branch = getBranch();
    // 获取最新的commitId
    const commitId = getCommitId(UIPath, branch);

    // 获取最新的文件内容
    const content = getPageContent(commitId, UIPath);
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
  const custRegExp = /^\<\!\-\- path\/(.*) \-\-\>$/g;
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
function getBranch() {
  const branchRegExp = /^\* (.*)/g;
  const content = childProcess.execSync('git branch', {
    cwd: UIRootPath,
  });
  const match = branchRegExp.exec(content.toString());
  return match && match.pop();
};

/**
 * 某个文件的远端最新commmitId
 * @param {*} UIPath 
 * @param {*} branch 
 */
function getCommitId(UIPath, branch) {
  const commitRegExp = /^\* (.*)/g;
  const content = childProcess.execSync(`git log remotes/origin/${branch} -1 --pretty=format:"%H" --graph ${UIPath}`, {
    cwd: UIRootPath,
  });
  const match = commitRegExp.exec(content.toString());
  return match && match.pop();
};

/**
 * 获取远端文件的最新内容
 * @param {*} commitId 
 * @param {*} UIPath 
 */
function getPageContent(commitId, UIPath) {
  const content = childProcess.execSync(`git show --textconv ${commitId}:${UIPath}`, {
    cwd: UIRootPath,
  });
  return content.toString();
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
          .join(path.dirname(tmpPath), `${commitId}${new Date().getTime()}${path.basename(tmpPath)}`)
          .replace(/\\/g, '/');
        const tmpFile = path.join(tmpDirPath, path.basename(filePath));
        if (!fs.existsSync(tmpDirPath)) {
          await fs.mkdirSync(tmpDirPath)
        }
        await fs.writeFileSync(tmpFile, content);
        resolve(vscode.Uri.file(tmpFile));
      } catch (ex) {
        console.error(ex);
        reject(ex);
      }
    });
  });
};