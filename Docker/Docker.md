1. 根据Dockerfile生成镜像

   ```shell
   docker build -t nginx:test .
   //根据当前目录下的Dockerfile构建一个 nginx:test（镜像名称:镜像标签）
   ```

2. 查看列表

   ```shell
   docker ps			//正在运行容器
   docker ps -a		//包括已停止的容器
   docker container ls //容器列表
   docker image ls		//镜像列表
   ```

3. 删除指令

   ```shell
   docker container rm 容器id
   docker image rm 镜像id
   ```

4. 连接进入容器

   ```shell
   docker exec -it 容器id /bin/bash
   sudo docker exec -ti -u root 容器id bash	//root身份进入
   ```

5. 映射容器端口到主机端口

   ```shell
   docker run -d -p 8080:80 test
   //映射容器的8080端口到主机的80端口上
   ```

6. 配置容器DNS

   web应用需要访问域名接口，则容器内需要配置DNS

   在主机的 /etc/docker/daemon.json 文件中增加以下内容设置全局的 DNS

   ```
   {
     "dns" : [
       "114.114.114.114",
       "8.8.8.8"
     ]
   }
   ```

   ```shell
   systemctl docker restart	//重启docker服务
   
   //centos8 防火墙 需要开放 主机的虚拟网络接口docker0
   firewall-cmd --permanent --zone=trusted --add-interface=docker0
   firewall-cmd --reload
   ```

   查看容器内局部dns、host
   
   ```shell
   docker exec -it 容器id cat /etc/resolv.conf
   docker exec -it 容器id cat /etc/host
   ```
   
   

## docker-compose 基础命令

- 运行(-d 后台运行) > docker-compose up -d
- 停止 > docker-compose stop
- 移除容器 > docker-compose rm
- 停止+移除容器 > docker-compose down
- 构建 > docker-compose build
- 查看错误日志 > docker-compose logs -f





### 利用--network启动容器提供服务：

```
[root@docker ~]# docker run -itd --network=easy-mock_easy-mock ubuntu
```



### 查看容器运行的网络信息

```xml
 docker inspect mycentos3
```

```shell
docker network connect 网络名 容器id
docker network disconnect 网络名 容器id
```

