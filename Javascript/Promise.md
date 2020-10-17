# Promise

### 心得：

1. Promise里的值[[PromiseValue]]是无法return出来的，只能在then()里处理，因为现在永远无法获取未来的值。

2. 多个异步请求需要顺序执行

   

### 特性：

1. **三种状态**：`pending`（进行中）、`fulfilled`（已成功）、`rejected`（已失败）
2. 对象的状态不受外界影响。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
3. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。



#### 创建`Promise`实例

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code 异步操作中

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

#### `then`指定回调函数

```javascript
promise.then(function(value) {	//接收回调参数value
  // success
}, function(error) {	//第二个函数可选
  // failure
});
```

#### `then chain`处理链

https://sunxiunan.com/archives/4249

```javascript
promise
    .then(value => value+1)						//return val
    .then(value => Promise.resolve(value+1))	//return Promise.resolve(val)
    .then(value => console.log(value));			//两种写法等效，但必须在then中return
```

#### `Promise`作为另一个`Promise`的回调参数

```javascript
const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
```

`p2`的`resolve`方法将`p1`作为参数，即一个异步操作的结果是返回另一个异步操作。`p1`的状态决定了`p2`的状态。如果`p1`的状态是`pending`，那么`p2`的回调函数就会等待`p1`的状态改变；如果`p1`的状态已经是`resolved`或者`rejected`，那么`p2`的回调函数将会立刻执行。

#### 实例：

```javascript
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
```

`p1`3 秒之后变为`rejected`。`p2`的状态在 1 秒之后改变。由于`p2`返回的是另一个 Promise，导致`p2`自己的状态无效了，由`p1`的状态决定`p2`的状态。所以，后面的`then`语句都变成针对后者（`p1`）。又过了 2 秒，`p1`变为`rejected`，触发`p2`catch方法指定的回调函数。





## 注意

##### Promise 新建后立即执行。然后，`then`方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行。

```javascript
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve('resolved');
});

promise.then(function(value) {
  console.log(value);
});

console.log('Hi!');
// Promise
// Hi!
// resolved
```



##### 调用`resolve`或`reject`并不会终结 Promise 的参数函数的执行。

```javascript
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```

resolve() 总是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。后继操作应该放到`then`方法里面，而不应该直接写在`resolve`或`reject`的后面。所以，最好在它们前面加上`return`语句。

```javascript
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```





### 回调地狱

https://www.zhihu.com/question/49718514

