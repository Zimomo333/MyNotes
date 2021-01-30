## 克隆项目

git clone项目后，进入项目文件内创建Dockerfile



## Dockerfile创建镜像

先Copy package.json ，再install，最后Copy 项目代码，可复用缓存

http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/

```dockerfile
From node

WORKDIR /app # 容器内工作目录
COPY package*.json /app/
RUN npm --registry https://registry.npm.taobao.org i -S
COPY ./ /app/
# RUN npm start 构造镜像不需要start
```



## 运行容器

框架内置了 [egg-cluster](https://github.com/eggjs/egg-cluster) 来启动 [Master 进程](https://eggjs.org/zh-cn/core/cluster-and-ipc.html#master)，Master 有足够的稳定性，不再需要使用 [pm2](https://github.com/Unitech/pm2) 等进程守护模块。

框架也提供了 [egg-scripts](https://github.com/eggjs/egg-scripts) 来支持线上环境的运行和停止。

## package.json

```
{
  "scripts": {
    "start": "egg-scripts start",
    "stop": "egg-scripts stop"
  }
}
```

- ### `--daemon` 开启后台模式。若使用 Docker 建议直接前台运行，后台运行会导致容器自动结束。



### 运行指令

```
docker run -d -p 3021:7001 tarkov npm start
```

