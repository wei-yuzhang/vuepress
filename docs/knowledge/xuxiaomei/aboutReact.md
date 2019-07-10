---
title: React
---
# React

## 简介
创建大型的，快速响应的网络应用

## 几个概念
1. 组件：核心概念-props,state
2. JSX：让 JS 支持嵌入 HTML
3. Virtual DOM：组件 DOM 结构就是映射到这个 Virtual DOM 上,React 在这个 Virtual DOM 上实现了一个 diff 算法，当要重新渲染组件的时候，会通过 diff 寻找到要变更的 DOM 节点，再把这个修改更新到浏览器实际的 DOM 节点上
4. Data Flow：“单向数据绑定”是 React 推崇的一种应用架构的方式。当应用足够复杂时才能体会到它的好处

## 开发环境配置
1. ES6支持（ES6编译工具Babel已经内置了对JSX的支持）
2. JSX支持

## JSX的使用
1. HTML 语言直接写在 JavaScript 语言之中，不加任何引号
2. 遇到 HTML 标签（以 < 开头），就用 HTML 规则解析
3. 遇到代码块（以 { 开头），就用 JavaScript 规则解析
4. JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员
5. class属性写成className，for属性写成htmlFor，class和for是javascript的保留字

## 组件
1. 生成一个组件类：React.createClass
2. 所有组件类都必须有自己的 render 方法，用于输出组件
3. 组件类的第一个字母必须大写，否则会报错
4. 组件类只能包含一个顶层标签，否则也会报错

## 元素渲染
1. “根” DOM 节点-div 中的所有内容都将由 React DOM 来管理
2. 要将React元素渲染到根DOM节点中，我们通过把它们都传递给 ReactDOM.render() 的方法来将其渲染到页面上
3. React 元素都是不可变的，更新界面的唯一办法是创建一个新的元素，然后将它传入 ReactDOM.render() 方法
4. React只会更新必要的部分，React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分

## 生命周期
<imageView imageTitle="React 生命周期" imageUrl="/images/xuxiaomei/1.png"/>
### 组件的生命周期分成三个状态
1. Mounting：已插入真实 DOM（componentWillMount()、componentDidMount()）
2. Updating：正在被重新渲染（componentWillUpdate()、componentDidUpdate）
3. Unmounting：已移出真实 DOM（componentWillUnmount()）
4. React 还提供两种特殊状态的处理函数（componentWillReceiveProps：已加载组件收到新的参数时调用、shouldComponentUpdate：组件判断是否重新渲染时调用）

## 单向数据流
<imageView imageTitle="Redux 概述" imageUrl="/images/xuxiaomei/2.png"/>
<imageView imageTitle="react-redux 框图" imageUrl="/images/xuxiaomei/3.png"/>

## 搭建项目
1. npm install -g create-react-app
2. create-react-app project-name
3. cd project-name
4. yarn start
5. 如果需要暴露webpack配置,执行命令npm run eject,此操作不可逆









