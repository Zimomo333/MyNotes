function debounce(func,delay){
    let timer;
    return function(){
        if(timer)
            clearTimeout(timer);
        timer = setTimeout(()=>{
            func.call(this,arguments);
        },delay);
    }
}

function print(){
    console.log('a');
}

var test = debounce(print,1000);

for(var i=0;i<1000000;i++){
    test();
}