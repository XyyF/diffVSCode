const httpWords = ['ajax', 'get', 'post', 'init'];
const promiseWords = ['promise', 'deferred', 'defer'];
const hookWords = ['hookPage', 'firePageHook'];

const underscores = [
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
];

const levels = [
    { label: 'http', detail: 'http.js', words: ['http', ...httpWords] },
    { label: 'promise', detail: 'promise.js', words: promiseWords },
    { label: 'hookPage', detail: 'hook.js', words: hookWords },
    { label: 'wx', detail: 'native.js' },
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
];

module.exports = {
    httpWords,
    promiseWords,
    hookWords,
    underscores,
    levels,
};
