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

/**
 * 插件被激活时触发，所有代码总入口
 * @param context 插件上下文
 */
function activate(context) {
	console.log('扩展elfin vscode已激活!');

	// 特定目录才触发
	if (/xiaochengxu-teenager|AppletNew/g.test(vscode.workspace.rootPath)) {
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
