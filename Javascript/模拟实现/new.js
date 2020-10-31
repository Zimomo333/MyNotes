function create(){
    var obj = new Object();
    Con = [].shift.call(arguments);
    Object.setPrototypeOf(obj,Con.prototype);
    var ret = Con.apply(obj,arguments);
    return ret instanceof Object ? ret : obj;
}

function Foo(name){
    this.name = name;
}

Foo.prototype.start= function(){
    console.log(this.name);
}

var foo = create(Foo,'foo');
foo.name;
foo.start();