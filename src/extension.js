const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
const registerRetrofitPage = require('./wcn/retrofitPage');
const registerRetrofitApp = require('./wcn/retrofitApp');
const registerWekfCompletion = require('./wcn/wekfCompletion');
const registerWekfLocation = require('./wcn/wekfLocation');
const registerOpenPath = require('./wcn/openPath');
const registerCreatePage = require('./wcn/createPage');
const registerCreateComponent = require('./wcn/createComponent');
const registerCompilePage = require('./wcn/compilePage');
const registerComparePage = require('./wcn/comparePage');
const registerSwitchMode = require('./wcn/switchMode');

/**
 * 插件被激活时触发，所有代码总入口
 * @param context 插件上下文
 */
function activate(context) {
	console.log('扩展elfin vscode已激活!');

	// 小程序项目目录才触发
	const rootPath = vscode.workspace.rootPath;
	const necessaryFiles = [
		`${rootPath}${path.sep}project.config.json`,
		`${rootPath}${path.sep}app.json`,
		`${rootPath}${path.sep}app.js`,
	];
	if (necessaryFiles.every(file => fs.existsSync(file))) {
		console.log('扩展elfin.minipro已激活!');
    vscode.commands.executeCommand('setContext', 'elfin.minipro.show', true);
		// 改造Page.js文件
		registerRetrofitPage(context);
		// 改造app.js文件
		registerRetrofitApp(context);
		// wekf属性补全提示
		registerWekfCompletion(context);
		// wekf属性跳转
		registerWekfLocation(context);
		// 形如 pages/xxx?query=xxx 路径跳转
		registerOpenPath(context);
		// 创建小程序Page
		registerCreatePage(context);
		// 创建小程序Component
		registerCreateComponent(context);
		// 添加Page编译条件
		registerCompilePage(context);
		// 对比UI远端文件
		registerComparePage(context);
		// 切换环境
		registerSwitchMode(context);
	} else {
    vscode.commands.executeCommand('setContext', 'elfin.minipro.show', false);
	}
}
exports.activate = activate;

/**
 * 插件被释放时触发
 */
function deactivate() {
	console.log('您的扩展elfin vscode已被释放!');
}
exports.deactivate = deactivate;
