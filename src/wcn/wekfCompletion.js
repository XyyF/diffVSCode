const vscode = require('vscode');
const { underscores, levels, httpWords, promiseWords, hookWords } = require('./__config');

const documents = Array.from([
    ...underscores.map(e => getCompletionItem(e, vscode.CompletionItemKind.Method, 'underscore.m.js')),
    ...levels.map(e => getCompletionItem(e.label, vscode.CompletionItemKind.Method, e.detail)),
])

// http.js
const documentHttps = httpWords.map(e => getCompletionItem(e, vscode.CompletionItemKind.Method, 'http.js'))
// promise.js
const documentPromises = promiseWords.map(e => getCompletionItem(e, vscode.CompletionItemKind.Method, 'promise.js'))
// hook.js
const documentHooks = hookWords.map(e => getCompletionItem(e, vscode.CompletionItemKind.Method, 'hook.js'))


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