function count(str) {
    var obj={};
    for(var i=0;i<str.length;i++){
        if(str[i]==' ') {
            continue;
        } else {
            obj[str[i]] ? obj[str[i]]++ : obj[str[i]]=1;
        }
    }
    return obj;
}

console.log(count('hello world'))