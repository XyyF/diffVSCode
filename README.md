# elfin VSCode
vscode plugin for elfin

## 初始化项目
```js
npm install elfincmd -g

npm run elfin.init
```

## 本地打包
个人应用扩展，暂未发布应用市场

```js
npm i vsce -g

vsce package // 打包

vsce publish // 发布
// https://juejin.cn/post/6844903909564088333
```
左侧功能按钮 -> 扩展 -> 右上角选择Install from VSIX安装

## 功能列表

1. [minipro] 文件适配wekf改造，适用于快速初始化Page.js文件

> 优势：专注于Page.js文件中，避免到处Copy文件内容，再删除逻辑的繁琐过程

操作:
- Page文件中的 .js 文件： 打开.js文件 -> 右键打开菜单 -> [minipro]格式化Page文件
- App文件中的 app.js 文件: 打开app.js文件 -> 右键打开菜单 -> [minipro]格式化App文件
<br/>
 <img src="https://rengar-1253859411.cos.ap-chengdu.myqcloud.com/img/20201113_112531.gif" width = "500" height = "500" alt="图片名称" style="margin: 0 auto;display: block;" />
<br/>

2. [minipro] 属性补全提示

> 优势：对于新同学熟悉上手wekf十分友好，在不确定某些属性方法是否存在是也可以快速定位，让注意力专注于业务中，免去切换工程反复查找的过程

操作: 输入wekf按下.的时候，将会展示属性提示
<br/>
 <img src="https://rengar-1253859411.cos.ap-chengdu.myqcloud.com/img/20201113_112858.gif" width = "600" height = "400" alt="图片名称" style="margin: 0 auto;display: block;" />
<br/>

3. [minipro] 属性跳转定义文件

> 优势：结合wekf的属性补全，可以快速查看wekf属性实现逻辑，让注意力专注于业务中，免去切换工程反复查找的过程

操作: 前提需要安装npm包 并且 该方法存在，使用【Ctrl + 左键】的方式跳转
<br/>
 <img src="https://rengar-1253859411.cos.ap-chengdu.myqcloud.com/img/20201113_113227.gif" width = "600" height = "300" alt="图片名称" style="margin: 0 auto;display: block;" />
<br/>

4. [minipro] navigation路径跳转，支持 .js、.wxml、.json 文件

> 优势1：某些时候想快速跳转到相应的文件 || 不太确实路径是否正确，可以免去在资源管理器中一步步对照文件路径的过程
> 特别是在 navigation方法、app.json文件路径、project.config.json预览路径
> 优势2: 支持多种格式，如果没有文件后缀名的话，那么默认是.js

操作: 前提该路径下文件存在，使用【Ctrl + 左键】的方式跳转
```js
// 支持以下格式跳转
"/pages/index/demo"
"/pages/index/demo?query=" + 1
'/pages/index/demo'
'/pages/index/demo?query=' + 1
`/pages/index/demo`
`/pages/index/demo?query=${xxx}`
// 可以不再前面加 /
"pages/index/demo"
// 可以支持自定义文件后缀 .wxml、.json、.wxss，默认为.js
"pages/index/demo.wxml"
...
```
<br/>
 <img src="https://rengar-1253859411.cos.ap-chengdu.myqcloud.com/img/20201110_094616.gif" width = "600" height = "400" alt="图片名称" style="margin: 0 auto;display: block;" />
<br/>

5. [minipro] 新建小程序Page、Component文件

> base on 微信开发者工具功能，快速新建Page、Component，新建的Page还会在app.json/pages中添加路径，并在其基础上进行扩展
> 优势：文件名格式支持: test、test/test2，允许在指定附带文件夹名称

操作: 在左侧资源管理器，文件夹 -> 右侧菜单 -> [minipro]创建Page页面
<br/>
 <img src="https://rengar-1253859411.cos.ap-chengdu.myqcloud.com/img/20201113_113535.gif" width = "600" height = "400" alt="图片名称" style="margin: 0 auto;display: block;" />
<br/>

6. [minipro] 添加当前页面编译条件至project.config.json

> 优势：快速的编译当前的Page，会自动修改 project.config.json 中的Page编辑内容，免去在json文件反复查找、添加编译条件 && 减少文件体积，减小冲突的可能性
> 优势2：支持预置 query列表，提供选择 || 自定义，快捷针对不同场景进行调试
> 格式: \// query?a=1&b=2

操作: .js文件中 -> 右键菜单 -> [minipro]编译Page文件
<br/>
 <img src="https://rengar-1253859411.cos.ap-chengdu.myqcloud.com/img/20201120_120411.gif" width = "1000" height = "500" alt="图片名称" style="margin: 0 auto;display: block;" />
<br/>

7. [minipro] 切换小程序研发环境

8. [minipro] 微信小程序API心得hover提示

### TODO
- [x] 补全Snippets
- [] 完善wxml语法高亮
- [] Hover展示Snippets内容