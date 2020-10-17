# Vue-Router-Webpack 模块化开发

### 项目目的

不使用vue-cli脚手架，从头搭建Vue模块化开发环境



### 项目功能

1. 导航栏（折叠）
2. 面包屑

3. Vue-Router（路由功能）

4. Wepack打包压缩，热加载本地服务器



### 项目依赖

1. Vue
2. Vue Router
3. Element-UI
4. webpack

```shell
npm init
npm i vue -S

npm i element-ui -S

npm i vue-router -S

npm i webpack webpack-dev-server -D         // 热加载本地server，用于运行打包后的dist资源

<!-- webpack loader -->
npm i vue-loader vue-template-compiler -D   // 解析vue文件、模板
npm i css-loader style-loader -D            // 解析Element-UI的CSS文件
npm i file-loader -D                        // 解析Element-UI的字体文件

<!-- webpack plugin -->
npm i html-webpack-plugin -D                // 自动生成注入js的index.html
```



### 目录结构

<div><img src="https://raw.githubusercontent.com/Zimomo333/Vue-Router-Webpack/master/picture/directory.PNG"></div>

结构说明：

| 文件/目录名         | 作用                                        |
| ------------------- | ------------------------------------------- |
| `webpack.config.js` | `webpack` 配置文件                          |
| `routes.js`         | `Vue Router` 配置文件                       |
| `main.js`           | 全局配置，`webpack`打包入口                 |
| `App.vue`           | `Vue` 根组件                                |
| `public/index.html` | `HtmlWebpackPlugin` 自定义`index.html` 模板 |
| `views`目录         | 页面组件（业务页面）                        |
| `components`目录    | 公用组件（导航栏、面包屑）                  |
| `dist`目录          | `webpack`打包输出目录                       |
| `node_modules`目录  | `npm` 模块下载目录                          |







## Vue-Router

### router.js

以 `/` 开头的嵌套路径会被当作根路径，因此子路由的path无需加 `/` 

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const routes = [
    { 
        path: '/info',
        component: () => import('./views/info.vue'),
        meta: { 
            title: '个人中心',
            icon: 'el-icon-user-solid'
        }
    },
    { 
        path: '/orders',        // 以 / 开头的嵌套路径会被当作根路径
        component: () => import('./views/orders/index.vue'),    // 可写成{render: (e) => e("router-view")}，避免新建空router-view文件
        meta: { 
            title: '订单管理',
            icon: 'el-icon-s-order'
        },
        children: [
            {
                path: 'my-orders',      // 子路由不要加 /
                component: () => import('./views/orders/myOrders.vue'),
                meta: { 
                    title: '我的订单',
                    icon: 'el-icon-s-order'
                }
            },
            {
                path: 'submit',
                component: () => import('./views/orders/submit.vue'),
                meta: { 
                    title: '提交订单',
                    icon: 'el-icon-s-order'
                }
            }
        ]
    }
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default router
```







## Webpack

### webpack.config.js

```javascript
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'               // 打包输出的js包名
    },
    devServer: {
        contentBase: './dist'               // server运行的资源目录
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,             // 处理ElementUI样式
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(woff|ttf)$/,	    // 处理ElementUI字体
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),              // vue-loader伴生插件，必须有！！！
        new HtmlWebpackPlugin({             // 自动生成注入js的index主页
            title: 'Vue-wepack demo',
            template: './public/index.html' // 自定义index模板
        })
    ]
}
```



### `public/index.html`模板

默认生成的`index.html `没有 id="app" 挂载点，必须使用自定义模板

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <div id="app">		<!-- App.vue根组件 挂载点 -->
        </div>
    </body>
</html>
```







## 组件

### App.vue

`import { xxx } from './xxx' ` 指定需要引用的模块

`<style scoped>`  scoped 范围css 防止全局污染

增加了一个全局样式，解决导航栏折叠时子菜单文字不隐藏的bug

```vue
<template>
    <div id="app">
        <el-row class="tac">
            <el-col :span="4">
                <el-radio-group v-model="isCollapse">
                    <el-radio-button :label="false">展开</el-radio-button>
                    <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
                <h3>导航栏</h3>
                <el-menu
                :default-active="this.$route.path"
                :collapse="isCollapse"
                router
                >
                    <sidebar-item v-for="route in routes" :key="route.path" :item="route" />
                </el-menu>
            </el-col>
            <el-col :span="16">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item 
                    v-for="item in this.$route.matched" 
                    :key="item.path" 
                    :to="item.path"
                    >
                        {{item.meta.title}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <h3>正文</h3>
                <router-view />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { routes } from './router'   // {}指定需要引用的模块
import SidebarItem from './components/SidebarItem.vue'

export default {
    name: 'App',
    components: { 
        SidebarItem
    },
    data() {
        return {
            isCollapse: true,
            routes
        }
    }
}
</script>

<style scoped>  /* scoped 范围css 防止全局污染 */
h3 {
    text-align: center;
}
.el-breadcrumb {
    font-size: 1.17em;
    margin: 21.92px;
}
.el-radio-group {
    width:100%;
    display: flex;
    justify-content: center;
    margin-top: 13px;
}
</style>

<style>     /* 解决导航栏折叠子菜单文字不隐藏的bug，必须覆盖全局样式 */
/* 隐藏文字 */
.el-menu--collapse .el-submenu__title span{
	display: none;
}
/* 隐藏 > , 默认该i元素标签无hash值，因此scoped无效，必须使用全局样式覆盖 */
.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow{
	display: none;
}
</style>
```



### SidebarItem.vue(导航栏组件)

组件自调用实现嵌套导航栏

传递basePath记录父路由路径，与子路由拼接成完整路径

```vue
<template>
  <!-- 隐藏不需要显示的路由 -->
  <div v-if="!item.hidden">
    <!-- 如果没有子路由 -->
    <template v-if="!item.children">
        <el-menu-item :key="item.path" :index="resolvePath(item.path)">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
    </template>
    <!-- 如果有子路由，渲染子菜单 -->
    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :basePath="resolvePath(item.path)" />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'

export default {
  name: 'SidebarItem',    //组件自调用，必须有name属性
  props: {                //接收父组件传参
    item: {
      type: Object,
      required: true
    },
    basePath: {     //从父组件一直拼接下来的基路径
      type: String,
      default: ''
    }
  },
  methods: {
    //拼接父子路径
    resolvePath(routePath) {
      return path.resolve(this.basePath,routePath)
    }
  }
}
</script>
```





### 项目展示

<div align=center><img src="https://raw.githubusercontent.com/Zimomo333/Vue-Router-Webpack/master/picture/display.gif"></div>