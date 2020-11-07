const path = require('path')
const fs = require('fs')

module.exports = class ShellAPI {
    constructor() {}

    /**
     * 获取相对elfin root目录的绝对路径
     * @param {string} relativePath 
     */
    _getRootPath(relativePath) {
        return path.resolve(__dirname, `../${relativePath}`)
    }

    /**
     * 获取相对 脚本命令执行时目录 的绝对路径
     * @param {string}} relativePath 
     */
    _getCurrentPath(relativePath) {
        return path.resolve(process.cwd(), relativePath)
    }

    /**
     * 加载文件完整的内容
     * @param {string} filePath 
     */
    _loadFile(filePath) {
        try {
            return fs.readFileSync(filePath, 'utf-8').trim();
        } catch (e) {
            console.log('e', e)
            throw e;
        }
    }

    /**
     * 引入文件输出的内容
     * @param {string} filePath 
     */
    _requireFile(filePath) {
        try {
            return require(filePath);
        } catch (e) {
            throw e;
        }
    }

    /**
     * 写文件
     * @param {string} filePath 
     * @param {*} template 
     */
    _writeFile(filePath, template) {
        try {
            return fs.writeFileSync(filePath, template);
        } catch (e) {
            throw e;
        }
    }
}