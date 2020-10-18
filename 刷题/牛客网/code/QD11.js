function cssStyle2DomStyle(sName) {
    var re = /\w+/g;
    var arr = sName.match(re);
    var res = arr[0];
    for(var i=1;i<arr.length;i++){
        res += arr[i].slice(0,1).toUpperCase()+arr[i].slice(1);
    }
    return res;
}

console.log(cssStyle2DomStyle('-font'))