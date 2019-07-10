---
title: 开发指南
---
<returnHeader />

# 开发指南

## 搭建项目
### 安装项目依赖
+ Vue-cli搭建一个空项目，安装项目所需依赖包。
### 编写自定义组件源码
+ 组件名称开头大写。组件样式文件(.scss)和源码文件(.vue)放在同级。
+ 编写自定义组件，将组件源码放入总src文件夹下。
+ 组件源码目录结构：   
  <br/>
    <imageView imageTitle="目录结构" imageUrl="/images/devGuide/menu.png"/>
  <br/>

### 注册功能组件
+ 每个组件有一个入口文件index.js，里面包含install注册函数。index.js放在组件src根目录下。   
```js{2}
  import PortLog from './src/PortLog.vue'
    PortLog.install = function (Vue) {
      Vue.component(PortLog.name, PortLog)
  }
  export default PortLog
```

## webpack配置
### 添加component.json文件
+ 添加component.json，放在项目package.json文件同级目录下。
+ 文件引入总的入口文件和各个组件的入口文件。   
```js
  {
    "port-log": "./src/components/portLog/index.js",
        ......
    "index": "./src/index.js"
  }
```
::: danger
注意：打包生成的命名方式使用中横线连接，每一个逻辑断点使用一个中横线，不能使用驼峰形式。
:::

### 修改webpack中打包配置
+ 修改项目config文件夹下index.js文件，可以修改打包完成后的文件名。
```js{6}
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths 修改打包完成文件名
    assetsRoot: path.resolve(__dirname, '../lib'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    ......
  }
```
+ 修改build问价夹下webpack.prod.conf.js文件，整理各个组件入口。   
该文件取消引入HtmlWebpackPlugin
```js
  const env = require('../config/prod.env')
  // 整理各个组件入口
  const components = require('../components.json')
  const entrys = {}
  Object.keys(components).forEach(item => {
    entrys[item] = components[item]
  })
```
+ 在build文件夹下添加webpack.prodAll.conf.js文件，然后在文件中添加组件的总入口。   
该文件取消引入HtmlWebpackPlugin
```js{4}
  const webpackConfig = merge(baseWebpackConfig, {
    entry: {
      // 设置打包组件的总入口文件
      'index': './src/index.js'
    },
    ......
  })
```

## 组件测试
+ 修改webpack.dev.conf.js配置文件，修改入口文件为main.js   
```js{4}
  const devWebpackConfig = merge(baseWebpackConfig, {
    entry: {
      // 设置测试项目的入口文件
      app: './src/main.js'
    },
    ......
  })
```
+ 在components同级文件夹devPage文件夹放测试页面   
+ router文件夹存放测试页面路径   
+ 使用npm run dev 命令运行测试项目   

## 组件打包
+ 使用 npm run build 打包组件。
+ 使用 npm run build_all 打包加入组件总入口。
+ 修改打包上传的配置文件（package.json）   
name: 组件库名称（不能与npm公网上名称重复，名称使用中横线连接，使用小写字母）   
version: 版本号。每更新一次版本，版本号不能重复。   
private: 修改为false。   
main: 打包后生成的入口文件。   
+ 组件上传。   
申请npm账号；   
npm login 登录账号；   
如果下载依赖包源地址是淘宝镜像地址，修改为npm源地址（`npm config set registry http://registry.npmjs.org`）；   
上传组件包（`npm publish --registry=http://registry.npmjs.org`）；   

## 组件库删除
+ npm login登录账号；   
+ 删除组件库（`npm unpublish 包名 --force`）

## 组件使用
安装组件 `npm install quick-share-ui`；   
+ 全部引入   
在引入组件库的项目中的main.js中导入全部组件，引入组件样式。
```js
import QuickShareUI from 'quick-share-ui'
import 'quick-share-ui/lib/theme/index.css'
Vue.use(QuickShareUI)

```
+ 按需引入   
在引入组件库的项目中的main.js中引入部分组件，引入组件样式。
```js
import {port-log} from 'quick-share-ui'
import 'quick-share-ui/lib/theme/index.css'
Vue.use(port-log)
```
按需引入组件，需要下载安装babel-plugin-component`npm install babel-plugin-component -D`   
修改.babelrc文件   
```js
  "plugins": ["transform-vue-jsx", "transform-runtime", ["component", {
    "libraryName": "quick-share-ui",
    "styleLibrary": {
      "name": "theme",
      "base": false
    }
  }]],
```
+ 使用组件，传入组件对应参数。   
```html
<port-log
  ...
  ...
></port-log>
```

## 组件版本控制
+ 组件库名称： quick-share-ui   
+ 内部组件命名：...-...   
+ 版本号：当前版本：1.0.1   
修改组件整体风格和框架结构 修改版本号2.0.1 依次类推   
新增组件 修改版本号1.1.1 依次类推   
修改组件bug和优化代码 修改版本号1.1.2 依次类推   
