var promise = new Promise(function (resolve, reject) {
  var temp = 1
  setTimeout(() => {
    console.log('step ' + temp)
    resolve(++temp)
  }, 3000)
})
  .then((temp) => {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        console.log('step ' + temp)
        resolve(++temp)
      }, 3000)
    })
  })
  .then((temp) => {
    console.log('step ' + temp + ', finished')
  })
