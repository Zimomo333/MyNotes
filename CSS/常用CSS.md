# 字体加粗

### 1、<b></b>

### 2、<strong></strong>

### 3、font-weight

```css
/* Keyword values */
font-weight: normal;
font-weight: bold;	/* 粗体 */

/* Keyword values relative to the parent */
font-weight: lighter;
font-weight: bolder;
```





# 边框border

### border-width

```
/* 用法一：明确指定宽度值 */
/* 当给定一个宽度时，该宽度作用于选定元素的所有边框 */
border-width: 5px;
/* 当给定两个宽度时，该宽度分别依次作用于选定元素的横边与纵边 */
border-width: 2px 1.5em;
/* 当给定三个宽度时，该宽度分别依次作用于选定元素的上横边、纵边、下横边 */
border-width: 1px 2em 1.5cm;
/* 当给定四个宽度时，该宽度分别依次作用于选定元素的上横边、右纵边、下横边、左纵边 （即按顺时针依次作用） */
border-width: 1px 2em 0 4rem;

/* 用法二：使用全局关键字 */
/* 可以使用的全局关键字有：inherit(继承),initial（初始值）,unset（不设置） */
border-width: inherit;

/* 用法三：使用作用于 border-width 的关键字 */
border-width: thin;
border-width: medium;
border-width: thick;
```

### border-style 

| `none`   |      | 和关键字 `hidden` 类似，不显示边框。在这种情况下，如果没有设定背景图片，[`border-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width) 计算后的值将是 `0`，即使先前已经指定过它的值。在单元格边框重叠情况下，`none` 值优先级最低，意味着如果存在其他的重叠边框，则会显示为那个边框。 |
| -------- | ---- | ------------------------------------------------------------ |
| `hidden` |      | 和关键字 `none` 类似，不显示边框。在这种情况下，如果没有设定背景图片，[`border-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width) 计算后的值将是 `0`，即使先前已经指定过它的值。在单元格边框重叠情况下，`hidden` 值优先级最高，意味着如果存在其他的重叠边框，边框不会显示。 |
| `dotted` |      | 显示为一系列圆点。标准中没有定义两点之间的间隔大小，视不同实现而定。圆点半径是 [`border-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width) 计算值的一半。 |
| `dashed` |      | 显示为一系列短的方形虚线。标准中没有定义线段的长度和大小，视不同实现而定。 |
| `solid`  |      | 显示为一条实线。                                             |
| `double` |      | 显示为一条双实线，宽度是 [`border-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width) 。 |
| `groove` |      | 显示为有雕刻效果的边框，样式与 `ridge` 相反。                |
| `ridge`  |      | 显示为有浮雕效果的边框，样式与 `groove` 相反。               |
| `inset`  |      | 显示为有陷入效果的边框，样式与 `outset` 相反。当它指定到 [`border-collapse`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-collapse) 为 `collapsed` 的单元格时，会显示为 `groove` 的样式。 |
| `outset` |      | 显示为有突出效果的边框，样式与 `inset` 相反。当它指定到 [`border-collapse`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-collapse) 为 `collapsed` 的单元格时，会显示为 `ridge` 的样式。 |

### border-color 

[`<color>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value) 可以确定border的颜色。如果这个值没有设置，它的默认值是元素的[`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color)属性值（是文字颜色而非背景色）。 请看[`border-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-color).







# 边框阴影（box-shadow）

https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow

```css
/* x偏移量 | y偏移量 | 阴影颜色 */
box-shadow: 60px -16px teal;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

/* 插页(阴影向内) | x偏移量 | y偏移量 | 阴影颜色 */
box-shadow: inset 5em 1em gold;

/* 任意数量的阴影，以逗号分隔 */
box-shadow: 3px 3px red, -1em 0 0.4em olive;

/* 全局关键字 */
box-shadow: inherit;
box-shadow: initial;
box-shadow: unset;
```



# flex实现垂直居中

```css
div {
    display: flex;
    align-items:center;
    justify-content:center;
}
```

### flex布局常见属性：

### 1. flex-direction: （元素排列方向）

#### ※ flex-direction:row （横向从左到右排列==左对齐）

　　　　　　![img](https://images2017.cnblogs.com/blog/690946/201712/690946-20171222154442646-1645936211.png)

#### ※ flex-direction:row-reverse （与row 相反）

　　　　　　![img](https://images2017.cnblogs.com/blog/690946/201712/690946-20171222154428646-1572101727.png)

#### ※ flex-direction:column （从上往下排列==顶对齐）

　　　　　　![img](https://images2017.cnblogs.com/blog/690946/201712/690946-20171222154509803-723134460.png)

#### ※ flex-direction:column-reverse （与column 相反）

　　　　　　![img](https://images2017.cnblogs.com/blog/690946/201712/690946-20171222154532490-80704329.png)

 

### 2. flex-wrap: （内容一行容不下的时候才有效）

#### ※ flex-wrap:nowrap （超出不换行，很奇怪里面的宽度会变成100%）

#### 　　　　　　**![img](https://images2017.cnblogs.com/blog/690946/201712/690946-20171222160504162-1260065558.png)**

#### ※  flex-wrap:wrap （超出按父级的高度平分）

 　　　　　![img](https://images2017.cnblogs.com/blog/690946/201712/690946-20171222161015303-1198425231.png)

#### ※ flex-wrap:wrap-reverse（与wrap 相反）

　　　　　　　![img](https://images2017.cnblogs.com/blog/690946/201712/690946-20171222161201131-1931154622.png)

 

### 3. justify-content: （水平对齐方式）

#### ※ flex-start （水平左对齐）

　　　　　　　**![img](https://images2017.cnblogs.com/blog/690946/201712/690946-20171222161554912-1122076589.png)**

#### ※  justify-content:flex-end; （水平右对齐）

　　　　　　　　![img](https://images2017.cnblogs.com/blog/690946/201712/690946-20171222161647896-2061040516.png)

#### ※ justify-content:center; （水平居中对齐）

　　　　　　　　![img](https://images2017.cnblogs.com/blog/690946/201712/690946-20171222161725146-2119044238.png)

#### ※ justify-content:space-between; （两端对齐）

　　　　　　　　![img](https://images2017.cnblogs.com/blog/690946/201712/690946-20171222162010271-1442347356.png)

#### ※ justify-content:space-around; （两端间距对其）

　　　　　　　　![img](https://images2017.cnblogs.com/blog/690946/201712/690946-20171222162124881-733822373.png)

 

### 4. align-items: （垂直对齐方式）

#### ※ align-items:stretch; （默认）

　　　　　　　　**![img](https://images2017.cnblogs.com/blog/690946/201712/690946-20171222162624928-134575068.png)**

#### ※ align-items:flex-start; （上对齐，和默认差不多）

　　　　　　　　![img](https://images2017.cnblogs.com/blog/690946/201712/690946-20171222162715365-2134966559.png)

#### ※ align-items:flex-end; （下对齐）

　　　　　　　　![img](https://images2017.cnblogs.com/blog/690946/201712/690946-20171222162818396-1644420078.png)

#### ※  align-items:center;（居中对齐）

　　　　　　　　　![img](https://images2017.cnblogs.com/blog/690946/201712/690946-20171222162912021-675563470.png)

#### ※ align-items:baseline; （基线对齐）







# body消除四周白边

```css
body{
    margin: 0;
    padding: 0;
    border: 0;
}
```







# 定位（position）

### position:absolute

```
div{
    position: absolute;
    top:0;  //必须加，默认会被上方控件顶开
}
```

