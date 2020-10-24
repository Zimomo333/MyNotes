官方镜像：https://registry.hub.docker.com/_/mysql

```
docker pull mysql

docker run -p 3306:3306 --name my-mysql -e MYSQL_ROOT_PASSWORD=LzHlZh717809021 -d mysql:latest
```



开放外网访问

```
mysql -u root -p　　// 登录mysql
use mysql　　// 选择数据库  
update user set host='%' where user='root';　　// 设置外网连接  
```

