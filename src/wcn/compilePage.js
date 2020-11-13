const vscode = require('vscode');
const path = require('path');
const { exec } = require('child_process')

// 改造 未成年页面js文件
module.exports = function compilePage(context) {
	// 注册命令
	const disposable = vscode.commands.registerTextEditorCommand('elfin.wcn.retrofitPage', () => {
		if (vscode.window.activeTextEditor) {
			const command = `"${path.join(
                path.dirname(__filename),
                '../bin/miniprogram-compile.exe',
              )}" {miniprogramProjectName="${miniprogramProjectName}";vscodeProjectName="${vscodeProjectName}"}`
          
              exec(command, (error, stdout, stderr) => {
                if (error) {
                  // 编译失败
                  vscode.window.showErrorMessage('编译失败！')
                  return
                }
          
                vscode.window.showInformationMessage(`已发送编译命令！`)
              })
		}
	});

	context.subscriptions.push(disposable);
};