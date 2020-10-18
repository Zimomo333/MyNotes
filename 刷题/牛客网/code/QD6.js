function fibonacci(n) {
    var num1=1;
    var num2=1;
    for(var i=2;i<n;i++){
        [num1,num2] = [num2,num1+num2];
    }
    return num2;
}

console.log(fibonacci(5))