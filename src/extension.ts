// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

/**
 * 插件被激活时触发，所有代码总入口
 * @param context 插件上下文
 */
export function activate(context: vscode.ExtensionContext) {
	console.log('扩展elfin vscode已激活!');

	// 注册命令
	const disposable = vscode.commands.registerCommand('elfin.wcn.retrofitJs', () => {
		if (vscode.window.activeTextEditor) {
			console.log(111)
			vscode.window.activeTextEditor.edit(editBuilder => {
				if (vscode.window.activeTextEditor) {
					console.log(222)
					// 从开始到结束，全量替换
					const end = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0);
					const text = '新替换的内容';
					editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), text);
				}
			});
		}
	});

	context.subscriptions.push(disposable);
}

/**
 * 插件被释放时触发
 */
export function deactivate() {
	console.log('您的扩展elfin vscode已被释放!')
}
