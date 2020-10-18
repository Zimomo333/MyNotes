function rgb2hex(sRGB) {
    return sRGB.replace(/^rgb\((\d+)\s*\,\s*(\d+)\s*\,\s*(\d+)\)$/g, function(a, r, g, b){
        return '#' + hex(r) + hex(g) + hex(b);
    }); 
 }
 function hex(n){
    return n < 16 ? '0' + (+n).toString(16) : (+n).toString(16);
    // return ('0'+(+n).toString(16)).slice(-2);
 }

console.log(rgb2hex('rgb(3, 255, 255)'))