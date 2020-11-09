var arr = [],
  n = 9

for (var i = 1; i <= n; i++) {
  arr.push(i)
}

while (arr.length > 3) {
  for (var i = 0; i < arr.length; i++) {
    if ((i + 1) % 3 === 0) {
      arr[i] = -1
    }
  }
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === -1) {
      arr.splice(i, 1)
      i--
    }
  }
}

console.log(arr[2])
