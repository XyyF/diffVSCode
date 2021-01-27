const EjsAPI = require('./ejsAPI');

module.exports = class Ejs extends EjsAPI {
	constructor(options = {}) {
		super();
		this.fileName = options.fileName || '';
	}

	/**
	 * 渲染小程序页面
	 */
	renderWcnPageJs() {
		return this._renderByTempalte('templates/wekf/page/js.ejs', {
			PageName: firstUpperCase(this.fileName),
		});
	}
	renderWcnPageWxml() {
		return this._renderByTempalte('templates/wekf/page/wxml.ejs');
	}
	renderWcnPageWxss() {
		return this._renderByTempalte('templates/wekf/page/wxss.ejs');
	}
	renderWcnPageJson() {
		return this._renderByTempalte('templates/wekf/page/json.ejs');
	}

	/**
	 * 渲染小程序组件
	 */
	renderWcnComponentJs() {
		return this._renderByTempalte('templates/wekf/compnent/js.ejs');
	}
	renderWcnComponentWxml() {
		return this._renderByTempalte('templates/wekf/compnent/wxml.ejs');
	}
	renderWcnComponentWxss() {
		return this._renderByTempalte('templates/wekf/compnent/wxss.ejs');
	}
	renderWcnComponentJson() {
		return this._renderByTempalte('templates/wekf/compnent/json.ejs');
	}

	renderWcnApp() {
		return this._renderByTempalte('templates/wekf/app.ejs');
	}
};

function firstUpperCase(str) {
	return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}
