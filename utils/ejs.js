const EjsAPI = require('./ejsAPI');

module.exports = class Ejs extends EjsAPI {
	constructor(options = {}) {
		super();
		this.fileName = options.fileName || '';
	}

	/**
	 * 渲染小程序页面
	 */
	renderMiniProPageJs() {
		return this._renderByTempalte('src/templates/minipro/page/js.ejs', {
			PageName: firstUpperCase(this.fileName),
		});
	}
	renderMiniProPageWxml() {
		return this._renderByTempalte('src/templates/minipro/page/wxml.ejs');
	}
	renderMiniProPageWxss() {
		return this._renderByTempalte('src/templates/minipro/page/wxss.ejs');
	}
	renderMiniProPageJson() {
		return this._renderByTempalte('src/templates/minipro/page/json.ejs');
	}
	renderWekfPageJs() {
		return this._renderByTempalte('src/templates/wekf/page/js.ejs', {
			PageName: firstUpperCase(this.fileName),
		});
	}
	renderWekfPageWxml() {
		return this._renderByTempalte('src/templates/wekf/page/wxml.ejs');
	}
	renderWekfPageWxss() {
		return this._renderByTempalte('src/templates/wekf/page/wxss.ejs');
	}
	renderWekfPageJson() {
		return this._renderByTempalte('src/templates/wekf/page/json.ejs');
	}

	/**
	 * 渲染小程序组件
	 */
	renderMiniProComponentJs() {
		return this._renderByTempalte('src/templates/minipro/component/js.ejs');
	}
	renderMiniProComponentWxml() {
		return this._renderByTempalte('src/templates/minipro/component/wxml.ejs');
	}
	renderMiniProComponentWxss() {
		return this._renderByTempalte('src/templates/minipro/component/wxss.ejs');
	}
	renderMiniProComponentJson() {
		return this._renderByTempalte('src/templates/minipro/component/json.ejs');
	}
	renderWekfComponentJs() {
		return this._renderByTempalte('src/templates/wekf/component/js.ejs');
	}
	renderWekfComponentWxml() {
		return this._renderByTempalte('src/templates/wekf/component/wxml.ejs');
	}
	renderWekfComponentWxss() {
		return this._renderByTempalte('src/templates/wekf/component/wxss.ejs');
	}
	renderWekfComponentJson() {
		return this._renderByTempalte('src/templates/wekf/component/json.ejs');
	}

	renderWcnApp() {
		return this._renderByTempalte('src/templates/wekf/app.ejs');
	}
};

function firstUpperCase(str) {
	return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}
