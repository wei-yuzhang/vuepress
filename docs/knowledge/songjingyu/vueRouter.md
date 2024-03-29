---
title: vue-router
---
# 路由导航守卫
+ 提供的导航钩子主要用来拦截导航，让它完成跳转或取消。   
+ 有多种方式可以在路由导航发生时执行钩子：全局的、单个路由独享的、或者组件级的。   

## 全局路由钩子
+ 全局前置守卫   
```js
  router.beforeEach((to, from, next) => {
    // ...
  })
```
+ 全局解析守卫   
```js
  router.beforeResolve ((to, from, next) => {
    // ...
  })
```
+ 全局后置守卫   
```js
  router.afterEach((to, from) => {
    // ...
  })
```

## 某个路由独享钩子
+ 路由配置上直接定义beforeEnter守卫   
```js
  routes: [
    {
      path: '/foo',
      component: Foo,
      // 与全局前置守卫的方法参数一样
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
```

## 组件内钩子
```js
  const Foo = {
    template: `...`,
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不能获取组件实例 `this`
      // 因为当钩子执行前，组件实例还没被创建
      next(vm => {
        // 通过 `vm` 访问组件实例
      })
    },
    beforeRouteUpdate (to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
    }
  }
```

## 完整的导航解析流程
+ 导航被触发。   
+ 在失活的组件里调用离开守卫。   
+ 调用全局的 beforeEach 守卫。   
+ 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。   
+ 在路由配置里调用 beforeEnter。   
+ 解析异步路由组件。   
+ 在被激活的组件里调用 beforeRouteEnter。   
+ 调用全局的 beforeResolve 守卫 (2.5+)。（这和 router.beforeEach类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用）   
+ 导航被确认。   
+ 调用全局的 afterEach 钩子。   
+ 触发 DOM 更新。   
+ 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。   