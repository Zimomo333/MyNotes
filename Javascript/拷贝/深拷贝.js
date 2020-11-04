function deepClone(source) {
  var target = {}
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object') {
        target[key] = deepClone(source[key])
      } else {
        target[key] = source[key]
      }
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

var newObject = deepClone(source)
source.b.c = 'd'
console.log(newObject)
