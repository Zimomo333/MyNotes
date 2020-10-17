# Transform

## 说明:

- transform 属性向元素应用 2D 或 3D 转换。该属性允许我们对元素进行移动(translate)、旋转(rotate)、缩放(scale)或倾斜(skew)
- transition属性用于对css属性定义动画效果；

## 使用:

### 1. translate(x轴位移，y轴位移) - 元素沿X轴、Y轴进行平移; 正值-右下方移动，负值-左上方移动

```
div
{
margin:30px;
width:200px;
height:100px;
background: red;
transform:translate(80px, 80px)
}
```

### 平移前后对比

<img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105211921430-74573876.png" alt="img" style="zoom: 33%;" /> => <img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105211931806-2123198607.png" alt="img" style="zoom: 33%;" />

### 2. translateX(x轴位移) - 元素沿X轴进行平移；正值-右方移动，负值-左方移动

```
div
{
margin:30px;
width:200px;
height:100px;
background: red;
transform:translateX(80px)
}
```

### 平移前后对比

<img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212014106-696227267.png" alt="img" style="zoom:33%;" /> => <img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212026098-624746475.png" alt="img" style="zoom:33%;" />

### 3. translateY(y轴位移) - 元素沿Y轴进行平移；正值-下方移动，负值-上方移动

```
div
{
margin:30px;
width:200px;
height:100px;
background: red;
transform:translateY(80px)
}
```

### 平移前后对比

<img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212038878-34312591.png" alt="img" style="zoom:33%;" /> => <img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212053799-1046214653.png" alt="img" style="zoom:33%;" />

### 4. rotate(旋转角度) - 元素以图形中心点为旋转中心，正值-顺时针旋转；负值-逆时针旋转；

```
div
{
margin:30px;
width:200px;
height:100px;
background: red;
transform:rotate(15deg)
}
```

### 旋转前后对比

<img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212106411-1077681861.png" alt="img" style="zoom:33%;" /> => <img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212124356-357694751.png" alt="img" style="zoom:33%;" />

### 5. scale(X轴缩放倍数，Y轴缩放倍数) - 基于原来的位置进行伸缩变换，其中x代表沿X轴的伸缩倍数，y代表沿Y轴的伸缩倍数；0~1: 缩小；> 1：放大；

```
{
margin:30px;
width:200px;
height:100px;
background: red;
transform:scale(1.2,1.6)
}
```

### 缩放前后对比

<img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212139414-185668736.png" alt="img" style="zoom:33%;" /> => <img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212154288-140117184.png" alt="img" style="zoom:33%;" />

### 6. scaleX(X轴缩放倍数) - 基于原来的位置对X轴进行伸缩变换，Y轴不变；

```
{
margin:30px;
width:200px;
height:100px;
background: red;
transform:scaleX(1.4)
}
```

### 缩放前后对比

<img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212208572-1857506075.png" alt="img" style="zoom:33%;" /> => <img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212228768-16066359.png" alt="img" style="zoom:33%;" />

### 7. scaleY(Y轴缩放倍数) - 基于原来的位置对Y轴进行伸缩变换，X轴不变；

```
{
margin:30px;
width:200px;
height:100px;
background: red;
transform:scaleY(1.4)
}
```

### 缩放前后对比

<img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212239148-1591302032.png" alt="img" style="zoom:33%;" /> => <img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212254179-1129070290.png" alt="img" style="zoom:33%;" />

### 8. skew(X轴扭曲角度，Y轴扭曲角度) - 沿着X轴和Y轴进行2D倾斜；

```
{
margin:30px;
width:200px;
height:100px;
background: red;
transform: skew(30deg, 10deg)
}
```

### 缩放前后对比

<img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212321666-502596974.png" alt="img" style="zoom:33%;" /> => <img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212332883-295901366.png" alt="img" style="zoom:33%;" />

### 9. skewX(X轴扭曲角度) - 沿着X轴进行2D倾斜,Y轴不倾斜；

```
{
margin:30px;
width:200px;
height:100px;
background: red;
transform: skewX(30deg)
}
```

### 缩放前后对比

<img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212344649-469833291.png" alt="img" style="zoom:33%;" /> => <img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212400386-1445826401.png" alt="img" style="zoom:33%;" />

### 10. skewY(Y轴扭曲角度) - 沿着Y轴进行2D倾斜,X轴不倾斜；

```
{
margin:30px;
width:200px;
height:100px;
background: red;
transform: skewY(10deg)
}
```

### 缩放前后对比

<img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212428582-1569310140.png" alt="img" style="zoom:33%;" /> => <img src="https://img2018.cnblogs.com/blog/1516266/201811/1516266-20181105212443539-659807583.png" alt="img" style="zoom:33%;" />

### 11. transition(css属性 动画时间 过渡方式 延时时长) - 延长固定时长之后，将元素的css属性以某种过渡的方式执行动画，在动画时间内；

```
div

{
transition: width 2s, height 2s, transform 2s linear 2s;
}

// 表示同时过度宽度 高度 和 transform 过渡时间为2秒 过度方式为匀速 延时2秒开始过渡。
```