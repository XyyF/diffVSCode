/**
 * Created by rengar on 2020/6/17.
 */
const fs = require('fs');
const path = require('path');
const ShellAPI = require('./shellAPI');

module.exports = class Shell extends ShellAPI {
    constructor() {
        super();
    }

    loadFileFromElfinRoot(relativePath) {
        return this._loadFile(this._getRootPath(relativePath));
    }

    loadFlieFromScript(relativePath) {
        return this._loadFile(this._getCurrentPath(relativePath));
    }

    requireFileFromElfinRoot(relativePath) {
        return this._requireFile(this._getRootPath(relativePath));
    }

    requireFileFromScriptRoot(relativePath) {
        return this._requireFile(this._getCurrentPath(relativePath));
    }

    writeFlieFromScript(relativePath, template) {
        return this._writeFile(this._getCurrentPath(relativePath), template);
    }

    readDeepDir(dir) {
        const dirList = fs.readdirSync(dir);
        const ret = [];
        dirList.forEach((children) => {
            const stat = fs.statSync(path.join(dir, children));
            if (stat.isDirectory()) {
                ret.push(...this.readDeepDir(path.join(dir, children)));
            } else {
                ret.push(path.join(dir, children));
            }
        });
        return ret;
    }
};
