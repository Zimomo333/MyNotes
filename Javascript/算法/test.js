Object.prototype.mycreate= function(obj){
    var F = function(){}
    F.prototype = obj
    return new F()
}

var a = Object.mycreate({a:'1'})

console.log(a.a)
