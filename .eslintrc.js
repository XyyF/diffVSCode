module.exports = {
	env: {
		browser: false,
		commonjs: true,
		es6: true,
		node: true,
		mocha: true
	},
	parserOptions: {
		ecmaVersion: 2018,
		ecmaFeatures: {
			jsx: true
		},
		sourceType: 'module'
	},
	parser: 'babel-eslint',
	rules: {
		/**
		 * 要求打开的块标志和同一行上的标志拥有一致的间距。此规则还会在同一行关闭的块标记和前边的标记强制实施一致的间距。
		 */
		'block-spacing': 'error',
		/**
		 * 强制在代码块中使用一致的大括号风格
		 */
		'brace-style': 'error',
		/**
		 * 使用驼峰命名法（camelCase）命名对象、函数和实例。
		 */
		camelcase: ['error', {
			ignoreDestructuring: true,
			properties: 'never'
		}],
		/**
		 * 强制在逗号前后使用一致的空格
		 */
		'comma-spacing': ['error', { before: false, after: true }],
		/**
		 * 强制使用一致的逗号风格
		 */
		'comma-style': ['error', 'last'],
		/**
		 * 要求或禁止文件末尾存在空行
		 */
		'eol-last': ['error', 'always'],
		/**
		 * 要求或禁止在函数标识符和其调用之间有空格
		 */
		'func-call-spacing': ['error', 'never'],
		/**
		 * 强制在对象字面量的属性中键和值之间使用一致的间距
		 */
		'key-spacing': 'error',
		/**
		 * 强制在关键字前后使用一致的空格
		 */
		'keyword-spacing': [
			'error',
			{
				overrides: {
					if: { after: true },
					for: { after: true },
					while: { after: true },
					else: { after: true }
				}
			}
		],
    /**
     * 强制一行的最大长度，限制单行不能超过100个字符，字符串和正则表达式除外。
     */
    'max-len': [
      'error',
      {
        code: 120,
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
      }
    ],
    /**
     * 只有在命名构造器或者类的时候，才用帕斯卡拼命名法（PascalCase），即首字母大写。
     */
    'new-cap': [
      'error',
      {
        newIsCap: true,
        newIsCapExceptions: [],
        capIsNew: false,
        capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
        properties: false,
      }
    ],
    /**
     * 使用字面量语法创建数组。
     */
    'no-array-constructor': ['error'],
    /**
     * 在 case 和 default 的子句中，如果存在声明 (例如. let, const, function, 和 class)，使用大括号来创建块级作用域。
     */
    'no-case-declarations': 'error',
    /**
     * 禁止对使用 const 定义的常量重新赋值
     */
    'no-const-assign': 'error',
    /**
     * 禁止重复定义类的成员
     */
    'no-dupe-class-members': 'error',
    /**
     * 禁止使用 eval
     */
    'no-eval': 'error',
    /**
     * 禁止在循环内的函数内部出现循环体条件语句中定义的变量
     */
    'no-loop-func': 'error',
    /**
     * 禁止混合使用不同的操作符:
     * - 禁止 `%`, `**` 之间混用
     * - 禁止 `%` 与其它运算符之间混用
     * - 禁止乘除运算符之间混用
     * - 禁止位运算符之间的任何混用
     * - 禁止比较运算符之间混用
     * - 禁止 `&&`, `||` 之间混用
     */
    'no-mixed-operators': ['error', {
      groups: [
        ['%', '**'],
        ['%', '+'],
        ['%', '-'],
        ['%', '*'],
        ['%', '/'],
        ['&', '|', '<<', '>>', '>>>'],
        ['==', '!=', '===', '!=='],
        ['&&', '||'],
      ],
      allowSamePrecedence: false
    }],
    /**
     * 禁止连续赋值，比如 foo = bar = 1
     */
    'no-multi-assign': 'error',
    /**
     * 不要使用多个空行填充代码。
     */
    'no-multiple-empty-lines': 'error',
    /**
     * 禁止直接 new Object
     */
    'no-new-object': 'error',
    /**
     * 避免在行尾添加空格。
     */
    'no-trailing-spaces': 'error',
    /**
     * 已定义的变量必须使用
     * 但不检查最后一个使用的参数之前的参数
     * 也不检查 rest 属性的兄弟属性
     */
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        ignoreRestSiblings: true
      }
    ],
    /**
     * 禁止出现没必要的转义
     */
    'no-useless-escape': 'error',
    /**
     * 禁止使用 var
     */
    'no-var': 'error',
    /**
     * 强制单个语句的位置
     */
    'nonblock-statement-body-position': ['error', 'beside'],
    /**
     * 避免在赋值语句 = 前后换行。如果你的代码单行长度超过了 max-len 定义的长度而不得不换行，那么使用括号包裹。
     */
    'operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],
    /**
     * 要求或禁止块内填充
     */
    'padded-blocks': ['error', 'never'],
    /**
     * 申明后不再被修改的变量必须使用 const 来申明
     */
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ],
    /**
     * 必须使用模版字符串而不是字符串连接
     */
    'prefer-template': 'error',
    /**
     * 要求对象字面量属性名称用引号括起来
     */
    'quote-props': ['error', 'as-needed', { keywords: false }],
    /**
     * 要加分号
     */
    semi: ['error', 'always'],
    /**
     * 强制在块之前使用一致的空格
     */
    'space-before-blocks': 'error',
    /**
     * 强制在圆括号内使用一致的空格
     */
    'space-in-parens': ['error', 'never'],
    /**
     * 要求操作符周围有空格
     */
    'space-infix-ops': 'error',
    /**
     * 注释的斜线或 * 后必须有空格
     */
    'spaced-comment': ['error', 'always'],
    /**
     * 要求或禁止模板字符串中的嵌入表达式周围空格的使用
     */
    'template-curly-spacing': ['error', 'never'],
    /**
     * 要求立即执行的函数使用括号括起来
     */
    'wrap-iife': ['error', 'outside'],
	}
};
