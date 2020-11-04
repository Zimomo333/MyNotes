function create() {
  var consturctor = [].shift.call(arguments)
  var obj = Object.create(consturctor.prototype)
  var ret = consturctor.apply(obj, arguments)
  return ret instanceof Object ? ret : obj
}

function Foo(name) {
  this.name = name
}

Foo.prototype.start = function () {
  console.log(this.name)
}

var foo = create(Foo, 'foo')
foo.name
foo.start()
