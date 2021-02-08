可滚动视图区域。使用竖向滚动时，需要给scroll-view一个固定高度，通过 WXSS 设置 height。组件属性的长度单位默认为px，2.4.0起支持传入单位(rpx/px)。

| 属性 | 类型 | 默认值  | 必填 | 说明 | 最低版本 |
|-------------------------|---------------|---------|--------|-------------------------------------------------------------------------------------|--------|
| scroll-x                | boolean       | false   | 否  | 允许横向滚动                                                                                  | 1.0.0  |
| scroll-y                | boolean       | false   | 否  | 允许纵向滚动                                                                                  | 1.0.0  |
| upper-threshold         | number/string | 50      | 否  | 距顶部/左边多远时，触发 scrolltoupper 事件                                                           | 1.0.0  |
| lower-threshold         | number/string | 50      | 否  | 距底部/右边多远时，触发 scrolltolower 事件                                                           | 1.0.0  |
| scroll-top              | number/string |         | 否  | 设置竖向滚动条位置                                                                               | 1.0.0  |
| scroll-left             | number/string |         | 否  | 设置横向滚动条位置                                                                               | 1.0.0  |
| scroll-into-view        | string        |         | 否  | 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素                                             | 1.0.0  |
| scroll-with-animation   | boolean       | false   | 否  | 在设置滚动条位置时使用动画过渡                                                                         | 1.0.0  |
| enable-back-to-top      | boolean       | false   | 否  | iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向                                                       | 1.0.0  |
| enable-flex             | boolean       | false   | 否  | 启用 flexbox 布局。开启后，当前节点声明了 display: flex 就会成为 flex container，并作用于其孩子节点。                  | 2.7.3  |
| scroll-anchoring        | boolean       | false   | 否  | 开启 scroll anchoring 特性，即控制滚动位置不随内容变化而抖动，仅在 iOS 下生效，安卓下可参考 CSS overflow-anchor 属性。       | 2.8.2  |
| refresher-enabled       | boolean       | false   | 否  | 开启自定义下拉刷新                                                                               | 2.10.1 |
| refresher-threshold     | number        | 45      | 否  | 设置自定义下拉刷新阈值                                                                             | 2.10.1 |
| refresher-default-style | string        | "black" | 否  | 设置自定义下拉刷新默认样式，支持设置 black | white | none， none 表示不使用默认样式                                 | 2.10.1 |
| refresher-background    | string        | "#FFF"  | 否  | 设置自定义下拉刷新区域背景颜色                                                                         | 2.10.1 |
| refresher-triggered     | boolean       | false   | 否  | 设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发                                            | 2.10.1 |
| enhanced                | boolean       | false   | 否  | 启用 scroll-view 增强特性                                                                     | 2.12.0 |
| bounces                 | boolean       | true    | 否  | iOS 下 scroll-view 边界弹性控制 (同时开启 enhanced 属性后生效)                                          | 2.12.0 |
| show-scrollbar          | boolean       | true    | 否  | 滚动条显隐控制 (同时开启 enhanced 属性后生效)                                                           | 2.12.0 |
| paging-enabled          | boolean       | false   | 否  | 分页滑动效果 (同时开启 enhanced 属性后生效)                                                            | 2.12.0 |
| fast-deceleration       | boolean       | false   | 否  | 滑动减速速率控制 (同时开启 enhanced 属性后生效)                                                          | 2.12.0 |
| binddragstart           | eventhandle   |         | 否  | 滑动开始事件 (同时开启 enhanced 属性后生效) detail { scrollTop, scrollLeft }                           | 2.12.0 |
| binddragging            | eventhandle   |         | 否  | 滑动事件 (同时开启 enhanced 属性后生效) detail { scrollTop, scrollLeft }                             | 2.12.0 |
| binddragend             | eventhandle   |         | 否  | 滑动结束事件 (同时开启 enhanced 属性后生效) detail { scrollTop, scrollLeft, velocity }                 | 2.12.0 |
| bindscrolltoupper       | eventhandle   |         | 否  | 滚动到顶部/左边时触发                                                                             | 1.0.0  |
| bindscrolltolower       | eventhandle   |         | 否  | 滚动到底部/右边时触发                                                                             | 1.0.0  |
| bindscroll              | eventhandle   |         | 否  | 滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY} | 1.0.0  |
| bindrefresherpulling    | eventhandle   |         | 否  | 自定义下拉刷新控件被下拉                                                                            | 2.10.1 |
| bindrefresherrefresh    | eventhandle   |         | 否  | 自定义下拉刷新被触发                                                                              | 2.10.1 |
| bindrefresherrestore    | eventhandle   |         | 否  | 自定义下拉刷新被复位                                                                              | 2.10.1 |
| bindrefresherabort      | eventhandle   |         | 否  | 自定义下拉刷新被中止                                                                              | 2.10.1 |


[官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html)