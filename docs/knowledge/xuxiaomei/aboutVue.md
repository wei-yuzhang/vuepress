---
title: Vue响应式原理
---
# vue响应式原理
## 什么是响应式
Vue.js是一款MVVM框架，M->Model(数据模型层)，V->View(视图层)，VM->ViewModel(视图模型层)，响应式指当数据改变后，Vue 会通知到使用该数据的代码。例如，视图渲染中使用了数据，数据改变后，视图也会自动更新

## 如何实现响应式
### 发布订阅者模式
多个订阅者可以向同一个发布者订阅一个事件，当事件发生的时候，发布者通知所有订阅该事件的订阅者
### Object.defineProperty
Object.defineProperty给data的每个属性添加getter和setter方法。当data的某个属性被访问时，则会调用getter方法；当改变data的某个属性时，就会调用setter方法。
<imageView imageTitle="原理" imageUrl="/images/xuxiaomei/4.png"/>

### 源码解读
```js
// 响应式化入口
function initState (vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) { initProps(vm, opts.props); } // 初始化props
    if (opts.methods) { initMethods(vm, opts.methods); } // 初始化methods
    if (opts.data) {
      initData(vm); // 初始化data
    } else {
      observe(vm._data = {}, true /* asRootData */);
    }
    // 初始化computed
    if (opts.computed) { initComputed(vm, opts.computed); } 
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch); // 初始化watch
    }
  }
  ```
  ```js
// 初始化data中的数据，将data中的数据代理到vm上并且将数据进行Observe，监听数据的变化
 function initData (vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function'
      ? getData(data, vm)
      : data || {};
    if (!isPlainObject(data)) {
      data = {};
      warn(
        'data functions should return an object:\n' +
        'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      );
    }
    // proxy data on instance
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
      var key = keys[i];
      {
        if (methods && hasOwn(methods, key)) {
          warn(
            ("Method \"" + key + "\" has already been defined as a data property."),
            vm
          );
        }
      }
      if (props && hasOwn(props, key)) {
        warn(
          "The data property \"" + key + "\" is already declared as a prop. " +
          "Use prop default value instead.",
          vm
        );
      } else if (!isReserved(key)) {
        // 遍历 data 的 key，把 data 上的属性代理到 vm 实例上
        proxy(vm, "_data", key);
      }
    }
    // observe data
    observe(data, true /* asRootData */); // 数据劫持
  }  
  ```
  ```js
  // 将data中的数据代理到vm上 开始
  var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
  };

  function proxy (target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }
  // 将data中的数据代理到vm上 结束

  // Observer 对象的实例 将数据进行Observe，监听数据的变化开始
  function observe (value, asRootData) {
    if (!isObject(value) || value instanceof VNode) {
      return
    }
    var ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else if (
      shouldObserve &&
      !isServerRendering() &&
      (Array.isArray(value) || isPlainObject(value)) &&
      Object.isExtensible(value) &&
      !value._isVue
    ) {
      ob = new Observer(value);
    }
    if (asRootData && ob) {
      ob.vmCount++;
    }
    return ob
  }
  // Observer 对象的实例 将数据进行Observe，监听数据的变化结束
  ```
  ```js
  // Observer类 主要给响应式对象的属性添加getter/setter 用于依赖收集与派发更新 开始
    var Observer = function Observer (value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) { // 判断是否是数组
      if (hasProto) {
        protoAugment(value, arrayMethods);
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }
      this.observeArray(value); // 劫持数组成员
    } else {
      this.walk(value);
    }
  };
  
  // 给对象的每个属性添加getter/setter
   Observer.prototype.walk = function walk (obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      defineReactive$$1(obj, keys[i]);
    }
  };

  /**
   * 将数组变为可观测
   */
  Observer.prototype.observeArray = function observeArray (items) {
    for (var i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  };
  // 
  function defineReactive$$1 (
    obj,
    key,
    val,
    customSetter,
    shallow
  ) {
    var dep = new Dep();

    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return
    }

    // cater for pre-defined getter/setters
    var getter = property && property.get;
    var setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
      val = obj[key];
    }

    var childOb = !shallow && observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter () {
        var value = getter ? getter.call(obj) : val;
        if (Dep.target) {
          dep.depend(); // 依赖收集
          if (childOb) {
            childOb.dep.depend();
            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }
        return value
      },
      set: function reactiveSetter (newVal) {
        var value = getter ? getter.call(obj) : val;
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal && value !== value)) {
          return
        }
        /* eslint-enable no-self-compare */
        if (customSetter) {
          customSetter();
        }
        // #7981: for accessor properties without setter
        if (getter && !setter) { return }
        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        childOb = !shallow && observe(newVal);
        dep.notify(); // 发布更新
      }
    });
  }
  ```
### 举例
```js
<div id="main">
  <h1>count: {{times}}</h1>
</div>
<script src="vue.js"></script>
<script>
  var vm = new Vue({
    el: '#main',
    data: function () {
      return {
        times: 1
      };
    },
    created: function () {
      var me = this;
      setInterval(function () {
        me.times++;
      }, 1000);
    }
  });
</script>
```
<imageView imageTitle="总体效果" imageUrl="/images/xuxiaomei/5.png"/>

