1. ### 图标需要添加到icons文件夹

   

2. ### parseTime 等工具函数需要export进filters，并将注册全局filters

   错误提示：

   ![](https://raw.githubusercontent.com/Zimomo333/notesPictures/master/vue/vue-admin-element/filter_error.png)

   添加filters文件夹

   main.js 添加以下代码：


```js
import * as filters from './filters' // global filters

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
```



3. ### el-table 的key属性

   Vue官方说明:https://cn.vuejs.org/v2/api/#key

   `key` 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素

```html
<el-table
	:key="tableKey"
	v-loading="listLoading"
	:data="list"
	>
```



4. ### el-table 的slot-scope属性

   ```html
   <template slot-scope="{row}">
   	<span>{{ row.id }}</span>
   </template>
   ```

   通过 `Scoped slot` 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据

   https://blog.csdn.net/tg928600774/article/details/81945140?utm_source=blogxgwz1



5. ### el-form 的prop属性

   ```html
   <el-form-item label="Title" prop="title">
   	<el-input v-model="temp.title" />
   </el-form-item>
   ```

   Form 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 Form-Item 的 `prop` 属性设置为需校验的字段名即可。

   https://github.com/yiminghe/async-validator



6. ### 搜索id无效

   通过控制台发现输入id为字符串，因此需要js toString() 转换后比对



7. ### 异步数据先显示初始数据，再显示从后台带回的数据

   ![](https://raw.githubusercontent.com/Zimomo333/notesPictures/master/vue/vue-admin-element/render_error.png)

   ```html
   <el-form v-if="index!=-1">
       <el-form-item label="头像">
           <el-avatar :size="50" :src="list[index].photo" />
       </el-form-item>
   </el-form>
   ```

   错误原因：当vue首先执行的时候，list里面根本没有数据，

   解决方法：在该模块添加判断语句，如果index=-1，不进行该模块的渲染

   https://blog.csdn.net/qq_42985101/article/details/102056925



8. ### Mock api 地址不能出现前缀重复

   ```html
   url: '/vue-element-admin/record-list'
   url: '/vue-element-admin/record'
   不兼容，会出错
   ```



9. ### 构建打包

   vue.config.js中

   ```
   assetsDir: './'			//assets文件夹与index.html同级
   ```

   ![](https://raw.githubusercontent.com/Zimomo333/notesPictures/master/vue/vue-admin-element/pack2.png)

   ```
   assetsDir: 'static'		//index.html与static同级，assets文件夹位于static内
   ```

   ![](https://raw.githubusercontent.com/Zimomo333/notesPictures/master/vue/vue-admin-element/pack2.png)



#### 需要更改.env.production 内的环境变量

```java
// VUE_APP_BASE_API = '/prod-api'
VUE_APP_BASE_API = ''	//改为空
```

![](https://raw.githubusercontent.com/Zimomo333/notesPictures/master/vue/vue-admin-element/prod-api.png)

.env.production