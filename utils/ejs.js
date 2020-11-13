const EjsAPI = require('./ejsAPI');

module.exports = class Ejs extends EjsAPI {
	fileName = '';

	constructor(options = {}) {
		super();
		this.fileName = options.fileName;
	}

	/**
	 * 渲染小程序页面
	 */
	renderWcnPageJs() {
		return this._renderByTempalte('templates/wcn/page/js.ejs', {
			PageName: firstUpperCase(this.fileName),
		});
	}
	renderWcnPageWxml() {
		return this._renderByTempalte('templates/wcn/page/wxml.ejs', {
			PageName: firstUpperCase(this.fileName),
		});
	}
	renderWcnPageWxss() {
		return this._renderByTempalte('templates/wcn/page/wxss.ejs', {
			PageName: firstUpperCase(this.fileName),
		});
	}
	renderWcnPageJson() {
		return this._renderByTempalte('templates/wcn/page/json.ejs', {
			PageName: firstUpperCase(this.fileName),
		});
	}

	/**
	 * 渲染小程序组件
	 */
	renderWcnComponentJs() {
		return this._renderByTempalte('templates/wcn/compnent/js.ejs', {
			PageName: firstUpperCase(this.fileName),
		});
	}
	renderWcnComponentWxml() {
		return this._renderByTempalte('templates/wcn/compnent/wxml.ejs', {
			PageName: firstUpperCase(this.fileName),
		});
	}
	renderWcnComponentWxss() {
		return this._renderByTempalte('templates/wcn/compnent/wxss.ejs', {
			PageName: firstUpperCase(this.fileName),
		});
	}
	renderWcnComponentJson() {
		return this._renderByTempalte('templates/wcn/compnent/json.ejs', {
			PageName: firstUpperCase(this.fileName),
		});
	}

	renderWcnApp() {
		return this._renderByTempalte('templates/wcn/app.ejs', {});
	}
}

function firstUpperCase(str) {
	return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}
