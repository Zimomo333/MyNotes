function formatDate() {
  var date = new Date()
  return `${date.getFullYear()}年${date.getMonth()}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

console.log(formatDate())
