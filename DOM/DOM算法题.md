### 查找两个节点的最近的一个共同父节点，可以包括节点自身

```javascript
function commonParentNode(oNode1, oNode2) {
    for(;oNode1;oNode1=oNode1.parentNode){
        if(oNode1.contains(oNode2)){
            return oNode1;
        }
    }
}
```

#### 解析：

[`Node.parentNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/parentNode) 只读

返回一个当前节点 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)的父节点 。如果没有这样的节点，比如说像这个节点是树结构的顶端或者没有插入一棵树中， 这个属性返回null。

[`Node.contains()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains)

返回一个 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean) 布尔值，来表示传入的节点是否为该节点的后代节点。







