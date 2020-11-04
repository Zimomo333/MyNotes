function shallowCopy(source) {
  var target = {}
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key]
    }
  }
  return target
}

var source = {
  a: 'a',
  b: {
    c: 'c',
  },
}

var newObject = shallowCopy(source)
source.b.c = 'd'
console.log(newObject)
