function insertSort(arr){
    for(var i=1;i<arr.length;i++){
        var inserted=arr[i];
        for(var j=i-1;j>=0 && inserted<arr[j];j--)
            arr[j+1]=arr[j]
        arr[j+1]=inserted
    }
    return arr
}

var arr=[8,7,6,5,4,3]

console.log(insertSort(arr))