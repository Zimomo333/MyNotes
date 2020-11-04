function throttle(func, delay) {
  let timer
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, ...arguments)
        timer = null
      }, delay)
    }
  }
}

function print() {
  console.log('a')
}

setInterval(throttle(print, 2000), 10)
