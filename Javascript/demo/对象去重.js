var arr = [
    {id: 1, name: 'zimomo'},
    {id: 1, name: 'zimomo2'},
    {id: 2, name: 'momo'},
    {id: 2, name: 'momo2'}
]

function de_duplication(arr,key){
    var obj = {}
    var result = []
    for(i of arr){
        obj[i[key]] ? '' : obj[i[key]] = result.push(i)
    }
    return result
}

console.log(de_duplication(arr,'id'))