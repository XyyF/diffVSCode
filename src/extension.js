const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
// wekf系列
const registerRetrofitPage = require('./wekf/retrofitPage');
const registerRetrofitApp = require('./wekf/retrofitApp');
const registerWekfCompletion = require('./wekf/wekfCompletion');
const registerWekfLocation = require('./wekf/wekfLocation');
// const registerComparePage = require('./wekf/comparePage');

// minipro系列
const registerOpenPath = require('./minipro/openPath');
const registerCreatePage = require('./minipro/createPage');
const registerCreateComponent = require('./minipro/createComponent');
const registerSwitchMode = require('./minipro/switchMode');
const registerWxApiHover = require('./minipro/wxApiHover');
const registerCompilePage = require('./minipro/compilePage');

// pixui系列
const registerPixuiSwitchMode = require('./pixui/switch_mode');

/**
 * 插件被激活时触发，所有代码总入口
 * @param context 插件上下文
 */
function activate(context) {
	console.log('扩展elfin vscode已激活!');

	const rootPath = vscode.workspace.rootPath;
	const miniproNecessaryFiles = [
		`${rootPath}${path.sep}project.config.json`,
		`${rootPath}${path.sep}app.json`,
		`${rootPath}${path.sep}app.js`,
		`${rootPath}${path.sep}package.json`,
	];
	// 小程序项目目录才触发
	if (miniproNecessaryFiles.every(file => fs.existsSync(file))) {
		/**
		 * elfin.wekf 扩展
		 */
		const wekfDependencies = [
			'@tencent/kakashi-wekf',
			'@tencent/kakashi-raiton',
		];
		const packageJson = fs.readFileSync(`${rootPath}${path.sep}package.json`, 'utf-8');
		const parsePackage = JSON.parse(packageJson.toString());
		// 存在依赖引用
		let isWekf = false;
		try {
			isWekf = wekfDependencies.some(depen => !!parsePackage.dependencies[depen]);
		} catch (error) {
			isWekf = false;
		}
		if (isWekf) {
			console.log('扩展elfin.wekf已激活!');
			vscode.commands.executeCommand('setContext', 'elfin.wekf.show', true);
			// wekf属性补全提示
			registerWekfCompletion(context);
			// wekf属性跳转
			registerWekfLocation(context);
			// 改造Page.js文件
			registerRetrofitPage(context);
			// 改造app.js文件
			registerRetrofitApp(context);
		}


		/**
		 * elfin.minipro 扩展
		 */
		 console.log('扩展elfin.minipro已激活!');
		 vscode.commands.executeCommand('setContext', 'elfin.minipro.show', true);
		 // 形如 pages/xxx?query=xxx 路径跳转
		 registerOpenPath(context);
		 // 创建小程序Page
		 registerCreatePage(context, isWekf);
		 // 创建小程序Component
		 registerCreateComponent(context, isWekf);
		 // 添加Page编译条件
		 registerCompilePage(context);
		 // 对比UI远端文件
		 // registerComparePage(context);
		 // 切换环境
		 registerSwitchMode(context);
		 // wxApi提示
		 registerWxApiHover(context);
	} else {
    vscode.commands.executeCommand('setContext', 'elfin.minipro.show', false);
    vscode.commands.executeCommand('setContext', 'elfin.wekf.show', false);
	}
	const pixuiNecessaryFiles = [
		`${rootPath}${path.sep}pixide-system-config/apps.json`,
		`${rootPath}${path.sep}package.json`,
	];
	if (pixuiNecessaryFiles.every(file => fs.existsSync(file))) {
		console.log('扩展elfin.pixui已激活!');
    // vscode.commands.executeCommand('setContext', 'elfin.pixui.show', true);
		// 切换build游戏
		registerPixuiSwitchMode(context);
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
