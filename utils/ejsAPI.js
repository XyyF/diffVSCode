const ejs = require('ejs');
const ShellUtil = require('./shell');

module.exports = class EjsAPI {
    constructor() { }

    /**
     * 根据模版渲染
     * @param {string?} templatePath 形如 "templates\\wcn\\page.ejs"
     */
    _renderByTempalte(templatePath, renderData = {}) {
        const shellUtil = new ShellUtil();
        // 读取模板内容
        const template = shellUtil.loadFileFromElfinRoot(templatePath);
        // 转化模板内容
        return ejs.render(template, renderData);
    }
};
