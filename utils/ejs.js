const EjsAPI = require('./ejsAPI');

module.exports = class Ejs extends EjsAPI {
	fileName = '';

	constructor(options = {}) {
		super();
		this.fileName = options.fileName;
	}

	renderWcnPageJs() {
		return this._renderByTempalte('templates/wcn/page/pageJs.ejs', {
			PageName: firstUpperCase(this.fileName),
		});
	}

	renderWcnPageWxml() {
		return this._renderByTempalte('templates/wcn/page/pageWxml.ejs', {
			PageName: firstUpperCase(this.fileName),
		});
	}

	renderWcnPageWxss() {
		return this._renderByTempalte('templates/wcn/page/pageWxss.ejs', {
			PageName: firstUpperCase(this.fileName),
		});
	}
	
	renderWcnPageJson() {
		return this._renderByTempalte('templates/wcn/page/pageJson.ejs', {
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
