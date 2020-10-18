function isAvailableEmail(sEmail) {
    var reg=/^([\w.])+@\w+(\.\w+)+$/;
    return reg.test(sEmail);
}

console.log(isAvailableEmail('123321@163.com.cn'))