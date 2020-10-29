var bbb = {
    i: 10,
    toString: function () {
        console.log('toString');
        return this.i;
    },
    valueOf: function () {
        console.log('valueOf');
        return this.i;
    }
}
alert(bbb);// 10 toString
alert(+bbb); // 10 valueOf
alert('' + bbb); // 10 valueOf
alert(String(bbb)); // 10 toString
alert(Number(bbb)); // 10 valueOf
alert(bbb == '10'); // true valueOf
