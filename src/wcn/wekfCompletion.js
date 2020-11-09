const vscode = require('vscode');

const underscoreMethods = [
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
const levelMethods = [
    { label: 'http', detail: 'http.js' },
    { label: 'promise', detail: 'promise.js' },
    { label: 'hookPage', detail: 'hook.js' },
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

const documents = Array.from([
    ...underscoreMethods.map(e => getCompletionItem(e, vscode.CompletionItemKind.Method, 'underscore.m.js')),
    ...levelMethods.map(e => getCompletionItem(e.label, vscode.CompletionItemKind.Method, e.detail)),
])

// http.js
const documentHttps = [
    'ajax', 'get', 'post', 'init',
].map(e => getCompletionItem(e, vscode.CompletionItemKind.Method, 'http.js'))
// promise.js
const documentPromises = [
    'promise', 'deferred', 'defer',
].map(e => getCompletionItem(e, vscode.CompletionItemKind.Method, 'promise.js'))
// hook.js
const documentHooks = [
    'hookPage', 'firePageHook',
].map(e => getCompletionItem(e, vscode.CompletionItemKind.Method, 'hook.js'))


function getCompletionItem(text, kind, detail) {
    const completionItem = new vscode.CompletionItem(text, kind);
    completionItem.detail = detail;
    return completionItem;
}

/**
 * 自动提示实现
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 * @param {*} context 
 */
function provideCompletionItems(document, position, token, context) {
    const line = document.lineAt(position);
    // 只截取到光标位置为止，防止一些特殊情况
    const lineText = line.text.substring(0, position.character);
    // 匹配 `wekf.hookPage`
    if (/wekf\.hookPage\.$/g.test(lineText)) {
        return documentHooks;
    }
    // 匹配 `wekf.promise`
    if (/wekf\.promise\.$/g.test(lineText)) {
        return documentPromises;
    }
    // 匹配 `wekf.http`
    if (/wekf\.http\.$/g.test(lineText)) {
        return documentHttps;
    }
    // 匹配 `wekf.`
    if (/wekf\.$/g.test(lineText)) {
        return documents;
    }
}

/**
 * 光标选中当前自动补全item时触发动作，一般情况下无需处理
 * @param {*} item 
 * @param {*} token 
 */
function resolveCompletionItem(item, token) {
    return null;
}

module.exports = function (context) {
    // 注册代码建议提示，只有当按下“.”时才触发
    console.log('register')
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems,
        resolveCompletionItem
    }, '.'));
};