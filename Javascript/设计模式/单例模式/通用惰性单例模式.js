function Manager(name) {
    this.name = name;
}

Manager.prototype.getName = function () {
    console.log(this.name);
};

// 抽取通用单例逻辑
function Singleton(fn) {
    var instance;
    return function () {
        return instance || (instance = fn.apply(this, arguments))
    }
}

var SingletonManager = Singleton(function (name) {
    var manager = new Manager(name);
    return manager;
});

// 惰性体现在需要时才调用 SingletonManager() 来创建 Manager
SingletonManager('a').getName(); // a
SingletonManager('b').getName(); // a