# Hooks

解决痛点：

1. 函数组件内使用state，useState

2. 函数组件内使用context，顶层全局变量

3. 函数组件内使用副作用，useEffect

   （组件init和update时都会调用，相当于componentDidMount, componentDidUpdate

   且可返回一个清理函数，相当于componentWillUnmount）

4. 使用Hooks后组件仍是一个函数，可直接提取复用