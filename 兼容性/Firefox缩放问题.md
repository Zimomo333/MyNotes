## Firefox缩放问题

问题：win10 125%文本大小设置下，Firefox缩放为100%，2px 的 border 会变成 1.6px

![](C:\zimomo\Notes\兼容性\picture\firefox_zoom.JPG)

原因：当缩放倍数未使 CSS pixel 达到整数时，Fifefox 会调整 CSS pixel 使其向下取整，尽量显示整数个 device pixel（显示器像素）

注意：Firefox计算缩放倍率时会乘上windows系统的缩放倍率

实际缩放倍率  =  Windows Text Size  *  Firefox zoom

例子：

1.  Windows Text Size 125%  *  Firefox zoom 100% = 1.25

   device pixel：2px * 1.25 = 2.5px，向下取整为2px

   调整 CSS pixel = 2 / 1.25 = 1.6px

   

2.  Windows Text Size 125%  *  Firefox zoom 110% = 1.375

   device pixel：2px * 1.375 = 2.75px，向下取整为2px

   调整 CSS pixel = 2 / 1.375 = 1.45px

   

3.  Windows Text Size 125%  *  Firefox zoom 120% = 1.5

   device pixel：2px * 1.5 = 3px，为整数

   无需调整 CSS pixel