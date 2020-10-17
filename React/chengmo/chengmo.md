# MVC框架

### 理想化 单一数据流 关系：

1. Model（模型）负责管理数据，大部分业务逻辑也应该放在 Model 中；
2. View（视图）负责渲染用户界面，应该避免在 View 中涉及业务逻辑；
3. Controller （控制器）负责接受用户输入，根据用户输入调用对应的 Model 部分逻辑，把产生的数据结果交给 View 部分，让 View 渲染出必要的输出；

<img src="C:\zimomo\File\Notes\React\chengmo\picture\mvc1.PNG" style="zoom:80%;" />



### 实际应用缺陷：

在实际框架实现中，总是允许 View 和 Model 可以直接通信，复杂混乱

<img src="C:\zimomo\File\Notes\React\chengmo\picture\mvc2.PNG" style="zoom:80%;" />

#### 服务端MVC：

​		每个请求只在 Controller-Model-View 三者之间走一圈，然后就返回给浏览器去渲染，接着这个请求生命周期就可以回收销毁了，这是一个严格意义的单向数据流；

#### 浏览器MVC：

​		存在用户的交互处理，界面渲染出来之后，Model View 依然存在于浏览器中，这时候就会诱惑开发者为了简便，让现存的 Model View 直接对话。

​		