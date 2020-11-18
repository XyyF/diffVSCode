const vscode = require('vscode');
const path = require('path');
const Ejs = require('../../utils/ejs');

// 改造 teenager页面js文件
module.exports = function retrofitPage(context) {
	// 注册命令
	const disposable = vscode.commands.registerTextEditorCommand('elfin.wcn.retrofitPage', () => {
		if (vscode.window.activeTextEditor) {
			vscode.window.activeTextEditor.edit(editBuilder => {
				if (vscode.window.activeTextEditor) {
					const fileInfo = path.parse(vscode.window.activeTextEditor.document.fileName)
					// 文件名获取
					let fileName = fileInfo.name;
					// 如果是index命名的话，使用目录名
					if (!fileName || fileName === 'index') {
						fileName = fileInfo.dir.split(path.sep).pop();
					}
					// 渲染模板数据
					const ejs = new Ejs({fileName});
					const text = ejs.renderWcnPageJs();
					// 从开始到结束，全量替换
					const end = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0);
					editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), text);
				}
			});
		}
	});

	context.subscriptions.push(disposable);
};