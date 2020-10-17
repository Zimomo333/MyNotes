# Centos8 搭建easy-mock服务器

https://github.com/easy-mock/easy-mock

#### 环境需求

[Node.js](https://nodejs.org/) (**8.4.0**) & [MongoDB](https://www.mongodb.com/) (**>= v3.4.1**) & [Redis](https://redis.io/)（**>= v4.0**）.

MongoDB和Redis安装启动即可，无需配置登录权限



## MongoDB

### 安装

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/



1. Create a `/etc/yum.repos.d/mongodb-org-4.4.repo` file

```
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
```

2. Install the MongoDB packages.

```shell
sudo yum install -y mongodb-org
```

3. 启动

```shell
sudo systemctl start mongod
sudo systemctl status mongod
```



## Redis

### 安装

```shell
yum install redis
```

### 启动

```shell
sudo systemctl start redis
```



## Node.js（8.4.0）

### 安装

```shell
yum install nodejs
```



```shell
wget http://cdn.npm.taobao.org/dist/node/v8.4.0/node-v8.4.0-linux-x64.tar.gz
tar -xzvf node-v8.4.0-linux-x64.tar.gz
ln -s /home/zimomo/node-v8.4.0-linux-x64/bin/node /usr/local/bin/node
ln -s /home/zimomo/node-v8.4.0-linux-x64/bin/npm /usr/bin/npm
```



# Centos开放7300端口

```shell
查看防火墙某个端口是否开放
firewall-cmd --query-port=7300/tcp

开放防火墙端口7300（记得重启防火墙）
firewall-cmd --zone=public --add-port=7300/tcp --permanent

重启防火墙
firewall-cmd --reload
```



## PM2后台运行服务器

1. Install PM2 Globally

```shell
npm install pm2 -g
```

报错：

```shell
Unexpected end of input at 1:653

解决方法:
npm cache clean --force
```



2. 全局LINK

```
ln -s /home/zimomo/node-v8.4.0-linux-x64/bin/pm2 /usr/local/bin/
```



3. Launch via PM2

> You should run `build` before this step.

```
NODE_ENV=production pm2 start app.js

pm2 ls
```