const vscode = require('vscode');
const path = require('path');
const Ejs = require('../../utils/ejs');

// 改造 未成年页面js文件
module.exports = function retrofitJs(context) {
	// 注册命令
	const disposable = vscode.commands.registerCommand('elfin.wcn.retrofitJs', () => {
		if (vscode.window.activeTextEditor) {
			vscode.window.activeTextEditor.edit(editBuilder => {
				if (vscode.window.activeTextEditor) {
					// 文件名获取
					const fileName = path.basename(vscode.window.activeTextEditor.document.fileName, '.js');
					// 渲染模板数据
					const ejs = new Ejs({fileName});
					const text = ejs.renderWcnPage();
					// 从开始到结束，全量替换
					const end = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0);
					editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), text);
				}
			});
		}
	});

	context.subscriptions.push(disposable);
};