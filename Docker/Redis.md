## 以配置文件方式创建 Redis Docker容器

1. 创建配置文件目录存放redis.conf，文件从[官网下载](http://download.redis.io/redis-stable/redis.conf)。

2. 创建文件夹,新建配置文件贴入从官网下载的配置文件并修改

   mkdir /usr/local/docker

   vi /usr/local/docker/redis.conf

3. 修改配置，开放外网访问

   ```
   # bind 127.0.0.1	// 注释掉这部分，这是限制redis只能本地访问
   protected-mode no 	// 默认yes，开启保护模式，限制为本地访问
   appendonly yes		// redis持久化（可选）
   ```

4. 创建并启动容器

   ```
   docker run -p 6379:6379 --name myredis -v /usr/local/docker/redis.conf:/etc/redis/redis.conf -v /usr/local/docker/data:/data -d redis redis-server /etc/redis/redis.conf
   ```

   命令解释说明：

   `-v` 挂载目录，规则与端口映射相同。

   ***redis-server /etc/redis/redis.conf*** 以配置文件启动redis，加载容器内的conf文件，最终找到的是挂载的目录/usr/local/docker/redis.conf