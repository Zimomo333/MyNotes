# replace()

​		返回一个由替换值（`replacement`）替换部分或所有的模式（`pattern`）匹配项后的新字符串。模式可以是一个字符串或者一个[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/RegExp)，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。如果`pattern`是字符串，则仅替换第一个匹配项。

## 语法

```
str.replace(regexp|substr, newSubStr|function)
```

### 参数

- `regexp `(pattern)

  一个[`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/RegExp) 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。

- `substr `(pattern)

  一个将被 `newSubStr` 替换的 [`字符串`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String)。其被视为一整个字符串，而不是一个正则表达式。仅第一个匹配项会被替换。

- `newSubStr` (replacement)

  用于替换掉第一个参数在原字符串中的匹配部分的[`字符串`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String)。该字符串中可以内插一些特殊的变量名。参考下面的[使用字符串作为参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace#使用字符串作为参数)。

- `function` (replacement)

  一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。参考下面的[指定一个函数作为参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace#指定一个函数作为参数)。

  该函数的参数：

  | 变量名            | 代表的值                                                     |
  | ----------------- | ------------------------------------------------------------ |
  | `match`           | 匹配的子串。（对应于上述的$&。）                             |
  | `p1,p2, ...`      | 假如replace()方法的第一个参数是一个[`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/RegExp) 对象，则代表第n个括号匹配的字符串。（对应于上述的$1，$2等。）例如，如果是用 `/(\a+)(\b+)/` 这个来匹配，`p1` 就是匹配的 `\a+`，`p2` 就是匹配的 `\b+`。 |
  | `offset`          | 匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是 `'abcd'`，匹配到的子字符串是 `'bc'`，那么这个参数将会是 1） |
  | `string`          | 被匹配的原字符串。                                           |
  | NamedCaptureGroup | 命名捕获组匹配的对象                                         |











# Array.push()

### 返回值

注意：返回结果是新数组长度，而不是新数组。

# splice()

### 返回值

注意：返回的是被删除元素所组成的数组。



### 向数组添加新项：

#### 实例

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 0, "Lemon", "Kiwi");
//[Banana,Orange,Lemon,Kiwi,Apple,Mango]
```

第一个参数（2）定义了应添加新元素的位置（拼接）。

第二个参数（0）定义应删除多少元素。



### 添加新项同时删除：

#### 实例

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 2, "Lemon", "Kiwi");
//[Banana,Orange,Lemon,Kiwi]
```



### 移除数组元素且不留“空洞”：

#### 实例

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(0, 1);        // 删除 fruits 中的第一个元素
```

第一个参数（0）定义新元素应该被*添加*（接入）的位置。

第二个参数（1）定义应该*删除多个*元素。

其余参数被省略。没有新元素将被添加。







# slice() 

##### 从已有的数组中返回包含选定元素的新数组。

### 语法

```
arrayObject.slice(start,end)
```

| 参数  | 描述                                                         |
| :---- | :----------------------------------------------------------- |
| start | 必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。 |
| end   | 可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。 |

### 返回值

返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。

### 说明

请注意，该方法并不会修改数组，而是返回一个子数组。



# forEach

## 语法

```
array.forEach(function(currentValue, index, arr), thisValue)
```

## 参数

| 参数                                 | 描述                                                         |
| :----------------------------------- | :----------------------------------------------------------- |
| *function(currentValue, index, arr)* | 必需。 数组中每个元素需要调用的函数。                        |
| *currentValue*                       | 必需。当前元素                                               |
| *index*                              | 可选。当前元素的索引值。                                     |
| *arr*                                | 可选。当前元素所属的数组对象。                               |
| *thisValue*                          | 可选。传递给函数的值一般用 "this" 值。如果这个参数为空， "undefined" 会传递给 "this" 值 |

#### callback function相当于闭包，currentValue为封闭的外部变量，且无需立即执行函数传值了。

### 陷阱：

1. 涉及数组元素增删操作时，避免使用forEach，会造成索引偏移。

2. callback function内 return 值 不会跳出循环

   ```javascript
   var str='abc123';
   function test(str) {
       str = Array.prototype.slice.call(str, 0);
       str.forEach(
           e => {
               if (!isNaN(e)) return true;
           }
       );
       return false;
   }
   console.log(test(str));		//print: false
   ```






# map()

map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。

## 语法

```
array.map(function(currentValue,index,arr), thisValue)
```

## 参数

| 参数                                 | 描述                                                         |
| :----------------------------------- | :----------------------------------------------------------- |
| *function(currentValue, index, arr)* | 必需。 数组中每个元素需要调用的函数。                        |
| *currentValue*                       | 必需。当前元素                                               |
| *index*                              | 可选。当前元素的索引值。                                     |
| *arr*                                | 可选。当前元素所属的数组对象。                               |
| *thisValue*                          | 可选。传递给函数的值一般用 "this" 值。如果这个参数为空， 回调函数的 this 为全局对象。 |



# indexOf() 

##### 可返回某个指定的字符串值在字符串中首次出现的位置。

### 语法

```
stringObject.indexOf(searchvalue,fromindex)
```

| 参数        | 描述                                                         |
| :---------- | :----------------------------------------------------------- |
| searchvalue | 必需。规定需检索的字符串值。                                 |
| fromindex   | 可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。 |

## 提示和注释

**注释：**indexOf() 方法对大小写敏感！

**注释：**如果要检索的字符串值没有出现，则该方法返回 -1。







# parseInt() 

## 定义和用法

parseInt() 函数可解析一个字符串，并返回一个整数。

### 语法

```
parseInt(string, radix)
```

| 参数   | 描述                                                         |
| :----- | :----------------------------------------------------------- |
| string | 必需。要被解析的字符串。                                     |
| radix  | 可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。如果省略该参数或其值为 0，则数字将以 10 为基础来解析，如果它以 “0x” 或 “0X” 开头，将以 16 为基数。如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。 |

### 返回值

返回解析后的数字。

### 说明

当参数 *radix* 的值为 0，或没有设置该参数时，parseInt() 会根据 *string* 来判断数字的基数。

举例，如果 *string* 以 "0x" 开头，parseInt() 会把 *string* 的其余部分解析为十六进制的整数。如果 *string* 以 0 开头，那么 ECMAScript v3 允许 parseInt() 的一个实现把其后的字符解析为八进制或十六进制的数字。如果 *string* 以 1 ~ 9 的数字开头，parseInt() 将把它解析为十进制的整数。

## 提示和注释

**注释：**只有字符串中的第一个数字会被返回。

**注释：**开头和结尾的空格是允许的。

**提示：**如果字符串的第一个字符不能被转换为数字，那么 parseFloat() 会返回 NaN。







# 判断相等

一般使用双等来判断（==），如果还需要类型相同那么就用三等（===）。
说一下这两个的区别：
== equality 等同，=== identity 恒等。
==， 两边值类型不同的时候，要先进行类型转换，再比较。 
==，不做类型转换，类型不同的一定不等。 
下面分别说明： 
先说 ===，这个比较简单。下面的规则用来判断两个值是否===相等： 
1、如果类型不同，就[不相等] 
2、如果两个都是数值，并且是同一个值，那么[相等]。
3、如果两个都是字符串，每个位置的字符都一样，那么[相等]；否则[不相等]。 
4、如果两个值都是true，或者都是false，那么[相等]。 
5、如果两个值都引用同一个对象或函数，那么[相等]；否则[不相等]。 
6、如果两个值都是null，或者都是undefined，那么[相等]。 
再说 ==，根据以下规则： 
1、如果两个值类型相同，进行 === 比较。 
2、如果两个值类型不同，他们可能相等。根据下面规则进行类型转换再比较： 
a、如果一个是null、一个是undefined，那么[相等]。 
b、如果一个是字符串，一个是数值，把字符串转换成数值再进行比较。 
c、如果任一值是 true，把它转换成 1 再比较；如果任一值是 false，把它转换成 0 再比较。 
d、任何其他组合，都[不相等]。







# isNaN()

**作用：**检查其参数是否为非数字值。

`NaN` 是一个*全局对象*的属性，表示非数字值。通过 `==` 、 `!=` 、 `===` 、以及 `!==`与其他任何值比较都将不相等——包括与其他 `NaN`值进行比较。必须使用 [`Number.isNaN()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) 或 [`isNaN()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN) 函数。

#### isNaN()

​		如果`isNaN`函数的参数不是`Number`类型， `isNaN`函数会首先尝试将这个参数转换为数值，然后才会对转换后的结果是否是[`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)进行判断。

#### Number.isNaN()

​		`Number.isNaN()` 不会自行将参数转换成数字，只有在参数是值为 `NaN` 的数字时，才会返回 `true`。







# 函数调用

多种方式如下：

```javascript
func.call(obj, arg1, arg2, ...);	//参数列表
func.bind(obj, arg1, arg2, ...)();	//参数列表
func.apply(obj, [argsArray]);		//参数数组
obj.func(...args);					//ES6解构
```

call()、apply() 、bind()可指定使用方法的对象。







# arguments接收传参

arguments并**非真正的数组**

转换成数组方法：

1. 使用slice方法：var args = Array . prototype . slice . call ( arguments , 0 )
2. 循环遍历逐一填入新数组。







# reduce()

对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。

## 语法

```javascript
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

### 参数

- **`callback`**

  执行数组中每个值的函数，包含四个参数：

  **`accumulator`**累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或`initialValue`（见于下方）。

  **`currentValue`**数组中正在处理的元素。

  **`index` **（可选）数组中正在处理的当前元素的索引。 如果提供了`initialValue`，则起始索引号为0，否则从索引1起始。

  **`array`**（可选）调用`reduce()`的数组

- **`initialValue`**（可选）

  作为第一次调用 `callback`函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

### 返回值

函数累计处理的结果







# toFixed() 

把 Number 四舍五入为指定小数位数的数字。

#### 语法

```
NumberObject.toFixed(num)
```

| 参数 | 描述                                                         |
| :--- | :----------------------------------------------------------- |
| num  | 必需。规定小数的位数，是 0 ~ 20 之间的值，包括 0 和 20，有些实现可以支持更大的数值范围。如果省略了该参数，将用 0 代替。 |

#### 返回值

返回 NumberObject 的字符串表示，不采用指数计数法，小数点后有固定的 num 位数字。如果必要，该数字会被舍入，也可以用 0 补足，以便它达到指定的长度。如果 num 大于 le+21，则该方法只调用 NumberObject.toString()，返回采用指数计数法表示的字符串。

#### 实例：

```javascript
var a=3;
var b=0.0001;
console.log(a*b);	//print: 0.00030000000000000003
multiply(a,b);		//result: 0.0003

function multiply(a, b) {
    var aDec = a.toString().split('.')[1] || '';
    var bDec = b.toString().split('.')[1] || '';
    var fix = aDec.length  + bDec.length;
    return (a * b).toFixed(fix);
}
```







# 大小写转换

### toUpperCase()

返回一个字符串，该字符串中的所有字母都被转化为大写字母

### toLowerCase()

返回一个字符串，该字符串中的字母被转换为小写字母