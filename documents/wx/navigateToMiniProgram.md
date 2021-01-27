```
wx.navigateToMiniProgram({
  appId: '',
  path: 'pages/index/index',
  // 传递给小程序的数据
  extraData: {},
  // develop 开发版 release 正式版 trial 体验版
  envVersion: config.isPro ? 'release' : 'develop',
  success() {},
  fail() {},
  complete() {},
});
```

[官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/miniprogram-navigate/wx.navigateToMiniProgram.html)