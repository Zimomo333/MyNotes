function throttle(func,delay){
    let timer=null;
    return function(){
        if(!timer){
            timer=setTimeout(()=>{
                func.call(this,...arguments);
                timer=null;
            },delay);
        }
    }
}

function print(){
    console.log('a');
}

setInterval(throttle(print,2000),10);