# Promise

### 心得：

1. Promise里的值[[PromiseValue]]是无法return出来的，只能在then()里处理，因为现在永远无法获取未来的值。

2. Promise.all 等待多个异步请求异步执行，但是返回结果有序


### 特性：

1. **三种状态**：`pending`（进行中）、`fulfilled`（已成功）、`rejected`（已失败）
2. 对象的状态不受外界影响。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
3. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。

### 创建`Promise`实例

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



## Promise.prototype.then()

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then

### then 参数

```javascript
promise.then(function(value) {	// fulfillment value
  // fulfillment
}, function(reason) {	// `rejection reason`
  // rejection
});
```

- `onFulfilled` 可选

  当 Promise 变成接受状态（fulfilled）时调用的[`函数`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Function)。该函数有一个参数，即接受的最终结果（the fulfillment  value）。如果该参数不是函数，则会在内部被替换为 `(x) => x`，即原样返回 promise 最终结果的函数

- `onRejected` 可选

  当 Promise 变成拒绝状态（rejected）时调用的[`函数`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Function)。该函数有一个参数，即拒绝的原因（`rejection reason`）。 如果该参数不是函数，则会在内部被替换为一个 "Thrower" 函数 (it throws an error it received as argument)。

  

### then 返回值

**`then` 方法返回一个 `Promise` 对象， `Promise` 对象的状态视 then 中回调函数的返回值而定。**

当一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 完成（fulfilled）或者失败（rejected）时，返回函数（即then）将被异步调用（由当前的线程循环来调度完成）。具体的返回值依据以下规则返回。如果 `then` 中的回调函数：

- 返回了一个值，那么 `then` 返回的 Promise 将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。

- 没有返回任何值，那么 `then` 返回的 Promise 将会成为接受状态，并且该接受状态的回调函数的参数值为 `undefined`。

- 抛出一个错误，那么 `then` 返回的 Promise 将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。

- 返回一个已经是接受状态的 Promise，那么 `then` 返回的 Promise 也会成为接受状态，并且将那个 Promise 的接受状态的回调函数的参数值作为该被返回的Promise的接受状态回调函数的参数值。

- 返回一个已经是拒绝状态的 Promise，那么 `then` 返回的 Promise 也会成为拒绝状态，并且将那个 Promise 的拒绝状态的回调函数的参数值作为该被返回的Promise的拒绝状态回调函数的参数值。

- 返回一个未定状态（`pending`）的 Promise，那么 `then` 返回 Promise 的状态也是未定的，并且它的终态与那个 Promise 的终态相同；同时，它变为终态时调用的回调函数参数与那个 Promise 变为终态时的回调函数的参数是相同的。

  

### then 链式调用

```javascript
Promise.resolve("foo")
  // 1. 接收 "foo" 并与 "bar" 拼接，并将其结果做为下一个 resolve 返回。
  .then(function(string) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        string += 'bar';
        resolve(string);
      }, 1);
    });
  })
  // 2. 接收 "foobar", 放入一个异步函数中处理该字符串
  // 并将其打印到控制台中, 但是不将处理后的字符串返回到下一个。
  .then(function(string) {
    setTimeout(function() {
      string += 'baz';
      console.log(string);
    }, 1)
    return string;	// 此时返回的是上一层的foobar，因为上方的异步函数未执行
  })
  // 3. 打印本节中代码将如何运行的帮助消息，
  // 字符串实际上是由上一个回调函数之前的那块异步代码处理的。
  .then(function(string) {
    console.log("Last Then:  oops... didn't bother to instantiate and return " +
                "a promise in the prior then so the sequence may be a bit " +
                "surprising");

    // 注意 `string` 这时不会存在 'baz'。
    // 因为这是发生在我们通过setTimeout模拟的异步函数中。
    console.log(string);
  });

// logs, in order:
// Last Then: oops... didn't bother to instantiate and return a promise in the prior then so the sequence may be a bit surprising
// foobar
// foobarbaz
```



#### 在 then 回调函数中 return value 等于 Promise.resolve(value)

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





## Promise模拟实现

https://segmentfault.com/a/1190000016550260

https://github.com/xieranmaya/blog/issues/3

```javascript
function Promise(executor) {
  var self = this

  self.status = 'pending'
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(function () {
      // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value
        for (var i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    })
  }

  function reject(reason) {
    setTimeout(function () {
      // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}
```



## Promise.prototype.then() 模拟实现

```javascript
Promise.prototype.then = function (onResolved, onRejected) {
  var self = this
  var promise2

  // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
  onResolved = typeof onResolved === 'function' ? onResolved : function(v) {
    return v
  }
  onRejected = typeof onRejected === 'function' ? onRejected : function(r) {
    throw r
  }

  if (self.status === 'resolved') {
    // 如果promise1(此处即为this/self)的状态已经确定并且是resolved，我们调用onResolved
    // 因为考虑到有可能throw，所以我们将其包在try/catch块里
    return (promise2 = new Promise(function (resolve, reject) {
      // 异步执行onResolved
      setTimeout(function () {
        try {
          var x = onResolved(self.data)
          if (x instanceof Promise) {
            // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
            x.then(resolve, reject)
          }
          resolve(x) // 否则，以它的返回值做为promise2的结果
        } catch (e) {
          reject(e) // 如果出错，以捕获到的错误做为promise2的结果
        }
      })
    }))
  }

  // 此处与前一个if块的逻辑几乎相同，区别在于所调用的是onRejected函数，就不再做过多解释
  if (self.status === 'rejected') {
    return (promise2 = new Promise(function (resolve, reject) {
      // 异步执行onRejected
      setTimeout(function () {
        try {
          var x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    }))
  }

  if (self.status === 'pending') {
    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
    // 只能等到Promise的状态确定后，才能确实如何处理。
    // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
    // 逻辑本身跟第一个if块内的几乎一致，此处不做过多解释
    return (promise2 = new Promise(function (resolve, reject) {
      // 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，而resolve或reject函数里的内容已是异步执行，构造函数里的定义
      self.onResolvedCallback.push(function (value) {
        try {
          var x = onResolved(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })

      self.onRejectedCallback.push(function (reason) {
        try {
          var x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    }))
  }
}

```



## Promise.prototype.catch()

```javascript
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}
```

