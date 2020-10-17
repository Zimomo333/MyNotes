# 生命周期

![](C:\zimomo\File\Notes\React\React官方指南笔记\picture\lifecycle.PNG)



## 挂载

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

- [**`constructor()`**](https://react.docschina.org/docs/react-component.html#constructor)
- [`static getDerivedStateFromProps()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)
- [**`render()`**](https://react.docschina.org/docs/react-component.html#render)
- [**`componentDidMount()`**](https://react.docschina.org/docs/react-component.html#componentdidmount)

> 注意:
>
> 下述生命周期方法即将过时，在新代码中应该[避免使用它们](https://react.docschina.org/blog/2018/03/27/update-on-async-rendering.html)：
>
> - [`UNSAFE_componentWillMount()`](https://react.docschina.org/docs/react-component.html#unsafe_componentwillmount)



### `constructor()`

React中，构造函数仅用于以下两种情况：

- 通过给 `this.state` 赋值对象来初始化[内部 state](https://react.docschina.org/docs/state-and-lifecycle.html)。

  （可在该阶段将 需要异步请求的数据状态设为loading）

- 为[事件处理函数](https://react.docschina.org/docs/handling-events.html)绑定实例

> 注意:
>
> 在 `constructor()` 函数中**不要调用 `setState()` 方法**。



### `componentDidMount()`阶段 异步请求

`componentDidMount()` 会在组件挂载后（插入 DOM 树中）立即调用。

依赖于 DOM 节点的初始化应该放在这里，如Ajax异步请求获取数据。

异步请求完成后，引发一次更新过程，总共要经历装载和更新过程，至少渲染两次。





## 更新

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

- [`static getDerivedStateFromProps()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)
- [**`render()`**](https://react.docschina.org/docs/react-component.html#render)
- [`getSnapshotBeforeUpdate()`](https://react.docschina.org/docs/react-component.html#getsnapshotbeforeupdate)
- [**`componentDidUpdate()`**](https://react.docschina.org/docs/react-component.html#componentdidupdate)

> 注意:
>
> 下述方法即将过时，在新代码中应该[避免使用它们](https://react.docschina.org/blog/2018/03/27/update-on-async-rendering.html)：
>
> - [`UNSAFE_componentWillUpdate()`](https://react.docschina.org/docs/react-component.html#unsafe_componentwillupdate)
> - [`UNSAFE_componentWillReceiveProps()`](https://react.docschina.org/docs/react-component.html#unsafe_componentwillreceiveprops)





## 卸载

当组件从 DOM 中移除时会调用如下方法：

- [**`componentWillUnmount()`**](https://react.docschina.org/docs/react-component.html#componentwillunmount)





## 错误处理

当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

- [`static getDerivedStateFromError()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromerror)
- [`componentDidCatch()`](https://react.docschina.org/docs/react-component.html#componentdidcatch)





# 函数组件与 class 组件

### 函数组件

接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### class 组件

使用 [ES6 的 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) 来定义组件

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```


> **注意：** 组件名称必须以大写字母开头。
>
> React 会将以小写字母开头的组件视为原生 DOM 标签。例如，`<div />` 代表 HTML 的 div 标签，而 `<Welcome />` 则代表一个组件，并且需在作用域内使用 `Welcome`。
>





# 单向数据流

### 父传子

单向数据流，所有 React 组件绝不能修改从父组件传来的props，必须为纯函数。



### 子传父

两种方法：

1. 子组件调用通过props传来的父组件方法
2. 子组件中dispatch一个action来修改全局状态，全局状态再通过props分发给子组件