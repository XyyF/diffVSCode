// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

/**
 * 插件被激活时触发，所有代码总入口
 * @param context 插件上下文
 */
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "diffvscode" is now active!');

	// 注册命令
	let disposable = vscode.commands.registerCommand('diffvscode.retrofitJs', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from diffVSCoddawde!');
	});

	context.subscriptions.push(disposable);
}

/**
 * 插件被释放时触发
 */
export function deactivate() {
	console.log('您的扩展已被释放！')
}
