## 强缓存

用户发起了一个`http`请求后，浏览器发现先本地已有所请求资源的缓存，便开始检查缓存是否过期。有两个http头部字段控制缓存的有效期：`Expires`和`Cache-Control`，浏览器是根据以下两步来判定缓存是否过期的：

1. 查看缓存是否有`Cache-Control`的`s-maxage`或`max-age`指令，若有，则使用响应报文生成时间`Date + s-maxage/max-age`获得过期时间，再与当前时间进行对比（`s-maxage`适用于多用户使用的公共缓存服务器）；
2. 如果没有`Cache-Control`的`s-maxage`或`max-age`指令，则比较`Expires`中的过期时间与当前时间。`Expires`是一个绝对时间。

**注意**，在HTTP/1.1中，当首部字段`Cache-Control`有指定`s-maxage`或`max-age`指令，比起首部字段`Expires`，会优先处理`s-maxage`或`max-age`。

下面列几个`Cache-Control`的常用指令：

- `no-cache`：含义是不使用本地缓存，需要使用协商缓存，也就是先与服务器确认缓存是否可用。
- `no-store`：禁用缓存。
- `public`：表明其他用户也可使用缓存，适用于公共缓存服务器的情况。
- `private`：表明只有特定用户才能使用缓存，适用于公共缓存服务器的情况。

经过上述两步判断后，若缓存未过期，返回状态码为`200`，则直接从本地读取缓存，这就完成了整个强缓存过程；如果缓存过期，则进入协商缓存或服务器返回新资源过程。



## 协商缓存

当浏览器发现缓存过期后，缓存并不一定不能使用了，因为服务器端的资源可能仍然没有改变，所以需要与服务器协商，让服务器判断本地缓存是否还能使用。此时浏览器会判断缓存中是否有`ETag`或`Last-Modified`字段，如果没有，则发起一个http请求，服务器根据请求返回资源；如果有这两个字段，则在请求头中添加`If-None-Match`字段（有`ETag`字段的话添加）、`If-Modified-Since`字段（有`Last-Modified`字段的话添加）。**注意：**如果同时发送`If-None-Match` 、`If-Modified-Since`字段，服务器只要比较`If-None-Match`和`ETag`的内容是否一致即可；如果内容一致，服务器认为缓存仍然可用，则返回状态码`304`，浏览器直接读取本地缓存，这就完成了协商缓存的过程，也就是图中的蓝线；如果内容不一致，则视情况返回其他状态码，并返回所请求资源。下面详细解释下这个过程：

#### 1.`ETag`和`If-None-Match`

二者的值都是服务器为每份资源分配的唯一标识字符串。

- 浏览器请求资源，服务器会在响应报文头中加入`ETag`字段。资源更新时，服务器端的`ETag`值也随之更新；
- 浏览器再次请求资源时，会在请求报文头中添加`If-None-Match`字段，它的值就是上次响应报文中的`ETag`的值；
- 服务器会比对`ETag`与`If-None-Match`的值是否一致，如果不一致，服务器则接受请求，返回更新后的资源；如果一致，表明资源未更新，则返回状态码为`304`的响应，可继续使用本地缓存，要注意的是，此时响应头会加上`ETag`字段，即使它没有变化。

#### 2.`Last-Modified`和`If-Modified-Since`

二者的值都是GMT格式的时间字符串。

- 浏览器第一次向服务器请求资源后，服务器会在响应头中加上`Last-Modified`字段，表明该资源最后一次的修改时间；
- 浏览器再次请求该资源时，会在请求报文头中添加`If-Modified-Since`字段，它的值就是上次服务器响应报文中的`Last-Modified`的值；
- 服务器会比对`Last-Modified`与`If-Modified-Since`的值是否一致，如果不一致，服务器则接受请求，返回更新后的资源；如果一致，表明资源未更新，则返回状态码为`304`的响应，可继续使用本地缓存，与`ETag`不同的是：此时响应头中不会再添加`Last-Modified`字段。

#### 3.`ETag`较之`Last-Modified`的优势

以下内容引用于：[http协商缓存VS强缓存](https://www.cnblogs.com/wonyun/p/5524617.html)

你可能会觉得使用`Last-Modified`已经足以让浏览器知道本地的缓存副本是否足够新，为什么还需要`ETag`呢？`HTTP1.1`中`ETag`的出现主要是为了解决几个`Last-Modified`比较难解决的问题：

- 一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新`GET`；
- 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，`If-Modified-Since`能检查到的粒度是s级的，这种修改无法判断(或者说`UNIX`记录`MTIME`只能精确到秒)；
- 某些服务器不能精确的得到文件的最后修改时间。

这时，利用`ETag`能够更加准确的控制缓存，因为`ETag`是服务器自动生成的资源在服务器端的唯一标识符，资源每次变动，都会生成新的`ETag`值。`Last-Modified`与`ETag`是可以一起使用的，但服务器会优先验证`ETag`。

### 用户行为

最后附一张图说明用户行为对浏览器缓存的影响：
![clipboard.png](https://segmentfault.com/img/bVbfafi?w=748&h=185)