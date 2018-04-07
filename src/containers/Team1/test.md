# 做了一年的react自己的感悟和总结

react确实是一个神奇而优雅的框架。在从事react项目之前，一直是在做angularjs的，angular是一个全面和庞大的框架，在起初设计的时候什么都有，复杂程度也很高，所以用angular做项目基本上不需要其他的辅助库来配合。但是react项目真的是不一样了，要是只会一个react的话，很难开发出需求的。因为react就只负责UI的渲染。

## 做react项目需要掌握什么

[react](https://github.com/facebook/react) 功能单一用于UI渲染，[redux](https://github.com/reactjs/redux) 用来管理数据，[react-router](https://github.com/ReactTraining/react-router) 用来管理路由，[webpack](https://doc.webpack-china.org/concepts/loaders/#-loader) 用来配置工程，[ES6](http://es6.ruanyifeng.com/) 让代码更加优雅，[redux-saga](https://github.com/redux-saga/redux-saga) 用来处理异步请求，[reselect](https://github.com/reactjs/reselect) 缓存机制用来减少state改变带来的渲染压力,还有一些为了交互衍生出来的中间件 [react-redux](https://github.com/reactjs/react-redux)、[react-router-redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux)、[react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) ，预处理器[](https://www.w3cplus.com/sassguide/syntax.html)或[Less](https://www.w3cschool.cn/less/) 尽量也掌握下。

## 从V-dom出发

react最难能可贵的就是虚拟dom的思想，这里有个贴切的比喻：把dom和JavaScript想象为各自的2个岛屿，中间有桥梁相连，但是桥上设有收费站，JavaScript去访问dom岛屿的次数越多，费用就越高。这就是一个js操作dom的过程，也许我们经常听到或者看到说尽量少的去操作dom，很耗性能。但是[DOM 操作成本到底高在哪儿？](http://mp.weixin.qq.com/s/MdnUDH3FwQ5Yv3LeHI3PMQ),这边小总结下：

从输入uri到页面加载好是一个很漫长的过程，我们就从html的解析开始说起。①解析HTML，开始构建DOM树；②解析CSS，生成CSS规则树；③合并DOM树和CSS规则树，生成render树；④布局render树（Layout/reflow），这时候负责元素尺寸大小，位置的计算，属于js中回流过程；⑤绘制render树（paint），绘制页面像素，属于重绘的过程；⑥浏览器会将各层的信息发送给GPU(图像处理器)，GPU将各层合成（composite），显示在屏幕上。这是初始化渲染的过程，通过js操作DOM后，会引起 [回流](http://www.css88.com/archives/4996) 和重绘，回流的成本很高，一个节点的回流会导致兄弟节点和子节点的回流，这样就一直在消耗GPU资源，所以才有了成本高的说法。

我们从操作dom的成本开始引入react，它创造了虚拟dom并且将它们储存起来，每当状态发生变化的时候就会创造新的虚拟节点和以前的进行对比，让变化的部分进行渲染。整个过程没有对dom进行获取和操作，只有等真正render时，才会去操作真实dom，从而引发页面的渲染。
