# diffVSCode
vscode for elfin

#### 本地打包
个人应用扩展，暂未发布应用市场

```js
npm i vsce -g

vsce package
```
从扩展的右上角选择Install from VSIX安装

### 功能列表

- [未成年] 文件适配wekf改造

1. Page文件中的 .js 文件
2. App文件中的 app.js 文件
<br/>
 <img src="https://rengar-1253859411.cos.ap-chengdu.myqcloud.com/img/20201113_112531.gif" width = "500" height = "500" alt="图片名称" style="margin: 0 auto;display: block;" />
<br/>

- [wekf] 属性补全提示
<br/>
 <img src="https://rengar-1253859411.cos.ap-chengdu.myqcloud.com/img/20201113_112858.gif" width = "600" height = "400" alt="图片名称" style="margin: 0 auto;display: block;" />
<br/>

- [wekf] 属性跳转定义文件
<br/>
 <img src="https://rengar-1253859411.cos.ap-chengdu.myqcloud.com/img/20201113_113227.gif" width = "600" height = "300" alt="图片名称" style="margin: 0 auto;display: block;" />
<br/>

- [小程序] navigation路径跳转，支持 .js、.wxml、.json 文件

```js
// 支持以下格式跳转
"/pages/index/demo"
"/pages/index/demo?query=" + 1
'/pages/index/demo'
'/pages/index/demo?query=' + 1
`/pages/index/demo`
`/pages/index/demo?query=` + 1
```
<br/>
 <img src="https://rengar-1253859411.cos.ap-chengdu.myqcloud.com/img/20201110_094616.gif" width = "600" height = "400" alt="图片名称" style="margin: 0 auto;display: block;" />
<br/>

- [小程序] 新建小程序Page、Component文件
<br/>
 <img src="https://rengar-1253859411.cos.ap-chengdu.myqcloud.com/img/20201113_113535.gif" width = "600" height = "400" alt="图片名称" style="margin: 0 auto;display: block;" />
<br/>

- [小程序] 添加当前页面编译条件至project.config.json
- [未成年] 对比远端最新的UI文件内容