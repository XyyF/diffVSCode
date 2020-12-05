const vscode = require('vscode');
const path = require('path');
const Ejs = require('../../utils/ejs');

// 改造 teenager页面js文件
module.exports = function retrofitApp(context) {
	// 注册命令
	const disposable = vscode.commands.registerTextEditorCommand('elfin.minipro.retrofitApp', () => {
		if (vscode.window.activeTextEditor) {
			vscode.window.activeTextEditor.edit(editBuilder => {
				if (vscode.window.activeTextEditor) {
					const fileInfo = path.parse(vscode.window.activeTextEditor.document.fileName);
					// 文件名获取
					const fileName = fileInfo.name;
					// app.js
					if (fileName === 'app') {
						// 渲染模板数据
						const ejs = new Ejs();
						const text = ejs.renderWcnApp();
						// 从开始到结束，全量替换
						const end = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0);
						editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), text);
					}
				}
			});
		}
	});

	context.subscriptions.push(disposable);
};
