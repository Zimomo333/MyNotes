## Vue2.0   Object.defineProperty

### Object.defineProperty实现双向绑定

```javascript
const obj = {};
Object.defineProperty(obj, 'text', {
  get: function() {
    console.log('get val');
  },
  set: function(newVal) {
    console.log('set val:' + newVal);
    document.getElementById('span').innerHTML = newVal;
  }
});

const input = document.getElementById('input');
input.addEventListener('keyup', function(e){
  obj.text = e.target.value;
})
```



### 缺陷一

​    无法监听数组变化。 然而[Vue的文档](https://link.jianshu.com?t=https%3A%2F%2Flink.juejin.im%2F%3Ftarget%3Dhttps%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Flist.html%23%25E6%2595%25B0%25E7%25BB%2584%25E6%259B%25B4%25E6%2596%25B0%25E6%25A3%2580%25E6%25B5%258B)提到了Vue是可以检测到数组变化的，但是只有以下八种方法,`vm.items[indexOfItem] = newValue`这种是无法检测的

```swift
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```

其实是作者把无法监听数组的情况hack掉了，以下是方法示例。

```jsx
const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayAugmentations = [];

aryMethods.forEach((method)=> {

    // 这里是原生Array的原型方法
    let original = Array.prototype[method];

   // 将push, pop等封装好的方法定义在对象arrayAugmentations的属性上
   // 注意：是属性而非原型属性
    arrayAugmentations[method] = function () {
        console.log('我被改变啦!');

        // 调用对应的原生方法并返回结果
        return original.apply(this, arguments);
    };

});

let list = ['a', 'b', 'c'];
// 将我们要监听的数组的原型指针指向上面定义的空数组对象
// 别忘了这个空数组的属性上定义了我们封装好的push等方法
list.__proto__ = arrayAugmentations;
list.push('d');  // 我被改变啦！ 4

// 这里的list2没有被重新定义原型指针，所以就正常输出
let list2 = ['a', 'b', 'c'];
list2.push('d');  // 4
```

由于只针对了八种方法进行了hack，所以其他数组的属性也是检测不到的。

### 缺陷二

我们应该注意到在上文中的实现里，我们多次用遍历方法遍历对象的属性，这就引出了`Object.defineProperty`的第二个缺陷，只能劫持对象的属性，因此我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历。

```javascript
// 遍历对象,对其属性值进行劫持
Object.keys(data).forEach(function(key) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('我劫持了get操作');
    },
    set: function(newVal) {
      // 当属性值发生变化时我们可以进行额外操作
      console.log('我劫持了set操作');
    },
  });
});
```





## Vue3.0   Proxy

ES6 Proxy 指南 https://es6.ruanyifeng.com/#docs/proxy

### Proxy实现双向绑定

```javascript
const input = document.getElementById('input');
const span = document.getElementById('span');
const obj = {};

const newObj = new Proxy(obj, {
  get: function(target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, value, receiver) {
    console.log(target, key, value, receiver);
    if (key === 'text') {
      span.innerHTML = value;
    }
    return Reflect.set(target, key, value, receiver);
  },
});

input.addEventListener('keyup', function(e) {
  newObj.text = e.target.value;
});
```

### 优势

Proxy不需要hack，就可以无压力监听数组的变化。

Proxy有多达13种拦截方法，不限于apply、ownKeys、deleteProperty、has等等是`Object.defineProperty`不具备的。

Proxy返回的是一个新对象，我们可以只操作新的对象达到目的，而`Object.defineProperty`只能遍历对象属性直接修改。

### 劣势

Proxy的劣势就是兼容性问题，而且无法用polyfill磨平，因此Vue的作者才声明需要等到下个大版本(3.0)才能用Proxy重写。