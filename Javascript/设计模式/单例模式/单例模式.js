function Manager(name) {
    this.name = name;
}

Manager.prototype.getName = function() {
    console.log(this.name);
};

var SingletonManager = (function() {
    var manager = null;
    return function(name) {
        if (!manager) {
            manager = new Manager(name);
        }
        return manager;
    }
})();

SingletonManager('a').getName(); // a
SingletonManager('b').getName(); // a