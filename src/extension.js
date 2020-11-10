const vscode = require('vscode');
const registerRetrofitJs = require('./wcn/retrofitJs');
const registerWekfCompletion = require('./wcn/wekfCompletion');
const registerWekfLocation = require('./wcn/wekfLocation');
const registerOpenPath = require('./wcn/openPath');

/**
 * 插件被激活时触发，所有代码总入口
 * @param context 插件上下文
 */
function activate(context) {
	console.log('扩展elfin vscode已激活!');
	
    // 特定目录才触发
    if (/xiaochengxu-teenager/g.test(vscode.workspace.rootPath)) {
		registerRetrofitJs(context);
		registerWekfCompletion(context);
		registerWekfLocation(context);
		registerOpenPath(context);
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
