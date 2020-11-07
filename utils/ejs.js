const EjsAPI = require('./ejsAPI')

module.exports = class Ejs extends EjsAPI {
	fileName = '';

	constructor(options = {}) {
		super();
		this.fileName = options.fileName;
	}

	renderWcnPage() {
		return this._renderByTempalte('templates/wcn/page.ejs', {
			PageName: firstUpperCase(this.fileName),
			__outName: `${this.fileName}.js`,
		});
	}
}

function firstUpperCase(str) {
	return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}
