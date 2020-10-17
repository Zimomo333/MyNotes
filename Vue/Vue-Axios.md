应等待axios请求完毕后执行函数，否则数据未拉取就操作

```javascript
this.$axios
    .get('http://localhost:8080/getData')
    .then(response => (this.covidData=response.data))	//箭头表达式正常存储数据
    .catch(function (error) {
    console.log(error);
    });
```

```javascript
this.$axios
    .get('http://localhost:8080/getData')
    .then(function (response) {
    this.covidData=response.data;	//不能读取数据，提示covidData未定义
    })
    .catch(function (error) {
    console.log(error);
    });
```

错误原因：

axios回调函数的内部的this并非指向当前的vue实例;

https://www.cnblogs.com/stella1024/p/7598541.html

解决方法一：用在外部函数定义的变量存储的this

```javascript
var _this=this;
this.$axios
    .get('http://localhost:8080/getData')
    .then(function (response) {
    _this.covidData=response.data;
    })
    .catch(function (error) {
    console.log(error);
    });
```

解决方法二：用箭头函数

箭头函数内部的this是词法作用域，由上下文确定，指向的函数内部的this已经绑定了外部的vue实例

```javascript
this.$axios
    .get('http://localhost:8080/getData')
    .then( response => {
    this.covidData=response.data;
    })     //箭头函数{}即可
    .catch(function (error) {
    console.log(error);
    });
```

