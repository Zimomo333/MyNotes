function reverseMatrix(sourceArr) {
  var reversedArr = []
  for (var i = 0; i < sourceArr[0].length; i++) {
    reversedArr[n] = []
    for (var j = 0; j < sourceArr.length; j++) {
      reversedArr[j][i] = sourceArr[i][j]
    }
  }
  return reversedArr
}
