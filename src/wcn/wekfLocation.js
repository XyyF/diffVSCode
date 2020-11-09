/**
 * 跳转到定义
 */
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

const underscoreWords = [
    // underscore.m.js
    'each', 'forEach', 'map', 'collect', 'reduce', 'foldl', 'inject', 'reduceRight', 'foldr',
    'transform', 'find', 'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any',
    'contains', 'includes', 'include', 'invoke', 'pluck', 'where', 'findWhere', 'max', 'min',
    'shuffle', 'sample', 'sortBy', 'groupBy', 'indexBy', 'countBy', 'toArray', 'size', 'partition',
    'first', 'head', 'take', 'initial', 'last', 'rest', 'tail', 'drop', 'compact', 'flatten', 'without',
    'uniq', 'unique', 'union', 'intersection', 'difference', 'zip', 'unzip', 'object', 'indexOf',
    'lastIndexOf', 'findIndex', 'sortedIndex', 'range', 'bind', 'partial', 'bindAll', 'memoize',
    'delay', 'defer', 'throttle', 'debounce', 'wrap', 'negate', 'compose', 'after', 'before', 'once',
    'keys', 'keysIn', 'values', 'pairs', 'invert', 'functions', 'methods', 'extend', 'assign', 'findKey',
    'pick', 'omit', 'defaults', 'create', 'clone', 'tap', 'isEqual', 'isEmpty', 'isElement', 'isArray',
    'isObject', 'isArguments', 'isFunction', 'isString', 'isNumber', 'isDate', 'isRegExp', 'isError',
    'isFinite', 'isNaN', 'isBoolean', 'isNull', 'isUndefined', 'has', 'noConflict', 'identity', 'constant',
    'noop', 'property', 'propertyOf', 'matches', 'comparator', 'times', 'random', 'now', 'escape', 'unescape',
    'result', 'uniqueId', 'templateSettings', 'template', 'chain', 'mixin',
]
const levelWords = [
    { label: 'http', detail: 'http.js', words: ['http', 'ajax', 'get', 'post', 'init'] },
    { label: 'promise', detail: 'promise.js', words: ['promise', 'deferred', 'defer'] },
    { label: 'hookPage', detail: 'hook.js', words: ['hookPage', 'firePageHook'] },
    { label: 'wx', detail: 'wx' },
    { label: 'createDecorator', detail: 'decorator.js' },
    { label: 'createService', detail: 'service.js' },
    { label: 'watch', detail: 'watcher.js' },
    { label: 'on', detail: 'watcher.js' },
    { label: 'unwatch', detail: 'watcher.js' },
    { label: 'off', detail: 'watcher.js' },
    { label: 'dispatch', detail: 'watcher.js' },
    { label: 'emit', detail: 'watcher.js' },
    { label: 'createWrapper', detail: 'apiwrapper.js' },
    { label: 'WrapperList', detail: 'apiwrapper.js' },
    { label: 'WeApp', detail: 'base.js' },
    { label: 'WePage', detail: 'base.js' },
    { label: 'createApp', detail: 'base.js' },
    { label: 'createPage', detail: 'base.js' },
    { label: 'mixinPage', detail: 'base.js' },
]

function getDestPathByWord(word, lineText) {
    if (underscoreWords.indexOf(word) > -1) {
        return 'underscore.m.js'
    }
    const levelWord = levelWords.find(e => {
        if (new RegExp(`wekf\.${e.label}`, 'g').test(lineText)) {
            if (e.words) {
                return e.words.indexOf(word) > -1;
            }
            return word === e.label;
        }
    })
    if (levelWord) {
        return levelWord.detail
    }
    return null
}

/**
 * 查找文件定义的provider，匹配到了就return一个location，否则不做处理
 * 最终效果是，当按住Ctrl键时，如果return了一个location，字符串就会变成一个可以点击的链接，否则无任何效果
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 */
function provideDefinition(document, position, token) {
    const word = document.getText(document.getWordRangeAtPosition(position));
    const line = document.lineAt(position);

    if (new RegExp('wekf\.', 'g').test(line.text)) {
        let destPath = `${vscode.workspace.rootPath}/node_modules/@tencent/kakashi-wekf/src/`;
        if (fs.existsSync(destPath)) {
            const file = getDestPathByWord(word, line.text);
            if (file) {
                destPath += file
                // new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
                return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
            }
        }
    }
}

module.exports = function (context) {
    // 注册如何实现跳转到定义，第一个参数表示仅对javascript文件生效
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(['javascript'], {
        provideDefinition
    }));
};