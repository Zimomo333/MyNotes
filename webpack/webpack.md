# 起步

## 基本安装

```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```



## 目录结构

```diff
    webpack-demo
    |- package.json
    |- /dist
      |- index.html
    |- /src
      |- index.js
```



## package.json

```diff
  {
    "name": "webpack-demo",
+   "private": true,	//防止意外发布重要私密库
-   "main": "index.js",	//入口起点名
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "build": "webpack"	//npm run build 相当于 npx webpack --config webpack.config.js
    },
    "devDependencies": {
      "webpack": "^4.0.1",
      "webpack-cli": "^2.0.9"
    },
    "dependencies": {}
  }
```



## webpack.config.js配置文件

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```







# 管理资源文件

## 加载CSS

```bash
npm install --save-dev style-loader css-loader
```

### webpack.config.js

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };
```



## 加载图片、字体、CSV、XML文件

```bash
npm install --save-dev file-loader
```

### webpack.config.js

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
+       {
+         test: /\.(png|svg|jpg|gif)$/,			//图片
+         use: [
+           'file-loader'
+         ]
+       },
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,	//字体
+         use: [
+           'file-loader'
+         ]
+       },
+       {
+         test: /\.(csv|tsv)$/,					//csv
+         use: [
+           'csv-loader'
+         ]
+       },
+       {
+         test: /\.xml$/,						//xml
+         use: [
+           'xml-loader'
+         ]
+       }
      ]
    }
  };
```







# 管理输出

## 配置 [`entry`](https://www.webpackjs.com/configuration/entry-context) 分离入口起点

### webpack.config.js

```diff
  const path = require('path');

  module.exports = {
-   entry: './src/index.js',
+   entry: {
+     app: './src/index.js',
+     print: './src/print.js'
+   },
    output: {
-     filename: 'bundle.js',
+     filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```



## html-webpack-plugin

### 解决痛点：

#### 		如果更改了一个入口起点的名称，或添加了一个新的名称，生成的包将被重命名在一个构建中，但是`index.html`文件仍然会引用旧的名字，需要手动配置。

#### 		使用`HtmlWebpackPlugin` 生成 index.html，会自动添加所有 bundle。

```bash
npm install --save-dev html-webpack-plugin
```

### webpack.config.js

```diff
  const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: 'Output Management'
+     })
+   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```



## clean-webpack-plugin 清理 `/dist` 文件夹

### 每次构建前清理 `/dist` 文件夹

```bash
npm install clean-webpack-plugin --save-dev
```

### webpack.config.js

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
+ const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    plugins: [
+     new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```







# 开发环境调试

## source map

### 解决痛点：

​	当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（`a.js`, `b.js` 和 `c.js`）打包到一个 bundle（`bundle.js`）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 `bundle.js`，而实际需要准确地知道错误来自于哪个源文件。

#### [source map](http://blog.teamtreehouse.com/introduction-source-maps) 可将编译后的代码映射回原始源代码，准确反馈错误源文件。

### webpack.config.js

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
+   devtool: 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```



## 热加载模式

webpack 中有三个热加载模式，帮助你在代码发生变化后自动编译代码：

1. webpack's Watch Mode（需要手动刷新浏览器）
2. webpack-dev-server（实时重新加载页面 live reloading）
3. webpack-dev-middleware



### webpack's Watch Mode

#### （需要手动刷新浏览器）

#### 添加一个用于启动 webpack 的观察模式的 npm script 脚本：

#### package.json

```diff
  {
    "name": "development",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "watch": "webpack --watch",
      "build": "webpack"	//npm run build 相当于 npx webpack --config webpack.config.js
    },
    "devDependencies": {
      "clean-webpack-plugin": "^0.1.16",
      "html-webpack-plugin": "^2.29.0",
      "webpack": "^3.0.0",
    }
  }
```

#### 修改clean-webpack-plugin设置

##### Watch模式下，防止误删未变更的index.html

https://blog.csdn.net/qq_40285497/article/details/106401423

##### webpack.config.js

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    plugins: [
+     new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```



### webpack-dev-server

#### （实时重新加载页面 live reloading）

```bash
npm install --save-dev webpack-dev-server
```

#### 以下配置告知 `webpack-dev-server`，在 `localhost:8080` 下建立服务，将 `dist` 目录下的文件，作为可访问文件

#### webpack.config.js

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

#### 添加 运行开发服务器(dev server)  script 脚本

##### package.json

```diff
  {
    "name": "development",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
+     "start": "webpack-dev-server --open",
      "build": "webpack"
    },
    "devDependencies": {
      "clean-webpack-plugin": "^0.1.16",
      "html-webpack-plugin": "^2.29.0",
      "webpack": "^3.0.0",
    }
  }
```



###  webpack-dev-middleware

​		`webpack-dev-middleware` 是一个容器(wrapper)，可以把 webpack 处理后的文件传递给一个服务器(server)。 `webpack-dev-server` 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求。

```bash
npm install --save-dev express webpack-dev-middleware
```

#### webpack.config.js

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
+     publicPath: '/'
    }
  };
```

`publicPath` 也会在服务器脚本用到，以确保文件资源能够在 `http://localhost:3000` 下正确访问

#### server.js

```js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

#### 添加 npm script 脚本

##### package.json

```diff
  {
    "name": "development",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
      "start": "webpack-dev-server --open",
+     "server": "node server.js",
      "build": "webpack"
    },
    "devDependencies": {
      "clean-webpack-plugin": "^0.1.16",
      "html-webpack-plugin": "^2.29.0",
      "webpack": "^3.0.0",
      "webpack-dev-middleware": "^1.12.0",
    }
  }
```







# 模块热替换（HMR）

## （更改模块不需要重新加载页面 live reloading，直接操作内存）

### 在 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 的配置基础上，使用 webpack 内置的 HMR 插件

#### webpack.config.js

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const webpack = require('webpack');

  module.exports = {
    entry: {
-      app: './src/index.js',
-      print: './src/print.js'
+      app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      }),
+     new webpack.NamedModulesPlugin(),
+     new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

### `NamedModulesPlugin` 作用是在热加载时直接返回更新文件名，而不是文件的id

```bash
[HMR] Updated modules:
[HMR]  - ./example.js
[HMR]  - ./hmr.js
[HMR] Update applied.
```

```bash
[HMR] Updated modules:
[HMR]  - 39
[HMR]  - 40
[HMR] Update applied.
```

#### index.js

```diff
  import printMe from './print.js';

  function component() {
    var btn = document.createElement('button');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
  }

  document.body.appendChild(component());
+
+ if (module.hot) {
+   module.hot.accept('./print.js', function() {
+     console.log('Accepting the updated printMe module!');
+     printMe();
+   })
+ }
```

### 存在问题（需要重新绑定模块）

​		如果更新后点击示例页面上的按钮，会发现控制台仍在打印旧的 `printMe` 功能。这是因为按钮的 `onclick` 事件仍然绑定在旧的 `printMe` 函数上，需要使用 `module.hot.accept` 更新绑定到新的 `printMe` 函数上。

**index.js**

```diff
  import printMe from './print.js';

  function component() {
    var btn = document.createElement('button');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;  // onclick 事件绑定原始的 printMe 函数上

    element.appendChild(btn);

    return element;
  }

- document.body.appendChild(component());
+ let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
+ document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
-     printMe();
+     document.body.removeChild(element);
+     element = component(); // 重新渲染页面后，component 更新 click 事件处理
+     document.body.appendChild(element);
    })
  }
```



## HMR 修改样式表

​		当更新 CSS 依赖模块时， `style-loader` 自动在后台使用 `module.hot.accept` 来修补(patch) `<style>` 标签，正常添加style-loader、css-loader插件即可。







# tree shaking

### 用于移除 JavaScript 上下文中的未引用代码(dead-code)



## 将文件标记为无副作用(side-effect-free)

​		[ES2015](https://babeljs.io/learn-es2015/) 中的 [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 和 [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) 语句已经被标准化，webpack 不会更改代码中除 `import` 和 `export` 语句以外的部分。

​		在一个纯粹的 ESM 模块世界中，识别出哪些文件有副作用很简单。然而，通常项目无法达到这种纯度。此时有必要向 webpack 的 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。



### 所有代码都不包含副作用

#### package.json

```json
{
  "name": "your-project",
  "sideEffects": false
}
```



### 副作用黑名单（不进行tree shaking操作）

```json
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js",
    "*.css"
  ]
}
```

常见副作用模块：全局样式表、全局配置的 js 文件

全局 CSS 是直接导入到 JavaScript 文件中的样式表，它没有被转换成 CSS 模块或任何类似的东西

```javascript
import './MyStylesheet.css';
```

以上述方式导入的任何样式表，被 webpack 视为死代码，从输出中删除，需要设置黑名单。



## 压缩输出

### 生产模式

#### 代码压缩（去除空格、缩短变量名）+ tree shaking（移除未引用代码）

##### webpack.config.js

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
+ mode: "production"
};
```

### 开发模式

#### 未压缩便于调试

```diff
  mode: "development"
```







# 通用、生产、开发环境配置分离

​		在*开发环境*中，需要具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在*生产环境*中，目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。使用`webpack-merge`为每个环境编写**彼此独立的 webpack 配置**，同时遵循不重复原则，保留一个“通用”配置。

```bash
npm install --save-dev webpack-merge
```



#### 目录结构

```diff
  webpack-demo
  |- package.json
- |- webpack.config.js
+ |- webpack.common.js
+ |- webpack.dev.js
+ |- webpack.prod.js
  |- /dist
  |- /src
    |- index.js
    |- math.js
  |- /node_modules
```

#### webpack.common.js

```diff
+ const path = require('path');
+ const { CleanWebpackPlugin } = require('clean-webpack-plugin');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');
+
+ module.exports = {
+   entry: {
+     app: './src/index.js'
+   },
+   plugins: [
+     new CleanWebpackPlugin(),
+     new HtmlWebpackPlugin({
+       title: 'Production'
+     })
+   ],
+   output: {
+     filename: '[name].bundle.js',
+     path: path.resolve(__dirname, 'dist')
+   }
+ };
```

#### webpack.dev.js

```diff
+ const merge = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   }
+ });
```

#### webpack.prod.js

```diff
+ const merge = require('webpack-merge');
+ const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   plugins: [
+     new UglifyJSPlugin()
+   ]
+ });
```

### NPM Scripts

##### package.json

```diff
  {
    "scripts": {
-     "start": "webpack-dev-server --open",
+     "start": "webpack-dev-server --open --config webpack.dev.js",
-     "build": "webpack"
+     "build": "webpack --config webpack.prod.js"
    },
    "devDependencies": {
      "clean-webpack-plugin": "^0.1.17",
      "html-webpack-plugin": "^2.29.0",
      "webpack": "^3.0.0",
      "webpack-dev-server": "^2.9.1",
      "webpack-merge": "^4.1.0",
    }
  }
```



## NODE_ENV系统环境变量

`NODE_ENV` *是一个由 Node.js 暴露给执行脚本的系统环境变量。通常用于决定在开发环境与生产环境(dev-vs-prod)下，服务器工具、构建脚本和客户端 library 的行为。*

**webpack.prod.js**

```diff
+ const webpack = require('webpack');
  const merge = require('webpack-merge');
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true
      }),
+     new webpack.DefinePlugin({
+       'process.env.NODE_ENV': JSON.stringify('production')
+     })
    ]
  });
```

#### 任何位于 `/src` 的本地代码都可以关联到 process.env.NODE_ENV 环境变量

##### src/index.js

```diff
+ if (process.env.NODE_ENV !== 'production') {
+   console.log('Looks like we are in development mode!');
+ }
```







# 代码分离

​		把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，按需加载或并行加载，控制资源加载优先级，如果使用合理，会极大影响加载时间。

#### 三种常用的代码分离方法：

- 入口起点：使用 [`entry`](https://www.webpackjs.com/configuration/entry-context) 配置手动地分离代码。
- 防止重复：使用 [`CommonsChunkPlugin`](https://www.webpackjs.com/plugins/commons-chunk-plugin) 去重和分离 chunk。
- 动态导入：通过模块的内联函数调用来分离代码。



## 入口起点(entry points)

##### project

```diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- another-module.js
|- /node_modules
```

##### another-module.js

```js
import _ from 'lodash';

console.log(
  _.join(['Another', 'module', 'loaded!'], ' ')
);
```

##### webpack.config.js

```js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/another-module.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

##### 构建结果：

```bash
            Asset    Size  Chunks                    Chunk Names
  index.bundle.js  544 kB       0  [emitted]  [big]  index
another.bundle.js  544 kB       1  [emitted]  [big]  another
```

##### `index.js`和`another-module.js `都含有`lodash`模块

#### 缺点：

- 如果入口 chunks 之间包含重复的模块，那些重复模块都会被引入到各个 bundle 中。
- 这种方法不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。



## 防止重复(prevent duplication)

​		[`CommonsChunkPlugin`](https://www.webpackjs.com/plugins/commons-chunk-plugin) 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。

#### webpack.config.js

```diff
  const path = require('path');
+ const webpack = require('webpack');
  const HTMLWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      index: './src/index.js',
      another: './src/another-module.js'
    },
    plugins: [
      new HTMLWebpackPlugin({
        title: 'Code Splitting'
      }),
+     new webpack.optimize.CommonsChunkPlugin({
+       name: 'common' // 指定公共 bundle 的名称。
+     })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

#### 构建效果：

```bash
            Asset       Size  Chunks                    Chunk Names
  index.bundle.js  665 bytes       0  [emitted]         index
another.bundle.js  537 bytes       1  [emitted]         another
 common.bundle.js     547 kB       2  [emitted]  [big]  common
```



## 动态导入(dynamic imports)

### 在`index.js`中动态导入 `lodash`模块

##### webpack.config.js

```diff
  const path = require('path');
  const HTMLWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      index: './src/index.js'
    },
    plugins: [
      new HTMLWebpackPlugin({
        title: 'Code Splitting'
      })
    ],
    output: {
      filename: '[name].bundle.js',
+     chunkFilename: '[name].bundle.js',	//决定非入口 chunk 的名称
      path: path.resolve(__dirname, 'dist')
    }
  };
```

#### src/index.js

```diff
- import _ from 'lodash';
-
- function component() {
+ function getComponent() {
-   var element = document.createElement('div');
-
-   // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
+     var element = document.createElement('div');
+
+     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+
+     return element;
+
+   }).catch(error => 'An error occurred while loading the component');
  }

- document.body.appendChild(component());
+ getComponent().then(component => {
+   document.body.appendChild(component);
+ })
```

#### `lodash` 自动会分离到一个单独的 bundle：

```bash
           Asset     Size  Chunks                    Chunk Names
lodash.bundle.js   541 kB       0  [emitted]  [big]  lodash
 index.bundle.js  6.35 kB       1  [emitted]         index
```



###  `async` 函数简化代码：

​		`import()` 会返回一个 promise，可以和 [`async` 函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)一起使用。但是，需要使用像 Babel 的预处理器和[Syntax Dynamic Import Babel Plugin](https://babeljs.io/docs/plugins/syntax-dynamic-import/#installation)。

#### src/index.js

```diff
- function getComponent() {
+ async function getComponent() {
-   return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
-     var element = document.createElement('div');
-
-     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-
-     return element;
-
-   }).catch(error => 'An error occurred while loading the component');
+   var element = document.createElement('div');
+   const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
+
+   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+
+   return element;
  }

  getComponent().then(component => {
    document.body.appendChild(component);
  });
```







# 懒加载

​		上文代码分离部分，lodash`包每次加载页面都需要请求它，没有分离的必要，会对性能产生负面影响。下面举一个实用例子。

​		增加一个交互，当用户点击按钮的时候用 console 打印一些文字。但是会等到第一次交互的时候再加载那个代码块（`print.js`）

#### src/print.js

```js
console.log('The print.js module has loaded! See the network tab in dev tools...');

export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
}
```

#### src/index.js

```javascript
  function component() {
    var element = document.createElement('div');
    var button = document.createElement('button');
    var br = document.createElement('br');

    button.innerHTML = 'Click me and look at the console!';
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.appendChild(br);
    element.appendChild(button);
 
    // Note that because a network request is involved, some indication
    // of loading would need to be shown in a production-level site/app.
    button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
      var print = module.default;
      print();
    });

    return element;
  }

  document.body.appendChild(component());
```







# 缓存

​		如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。通过配置确保 webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件。



## `chunkhash`替换输出文件名

`[hash]` 替换，在文件名中包含一个构建相关(build-specific)的 hash，

`[chunkhash]` 替换，在文件名中包含一个 chunk 相关(chunk-specific)的哈希。

#### webpack.config.js

```javascript
  const path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      })
    ],
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

#### 构建结果：

```bash
                       Asset       Size  Chunks                    Chunk Names
main.7e2c49a622975ebd9b7e.js     544 kB       0  [emitted]  [big]  main
                  index.html  197 bytes          [emitted]
```

如果不做修改，再次运行构建，会发现文件名**还是改变了**（可能会变）

##### 这是因为 webpack 在入口 chunk 中，包含了某些样板(boilerplate)，特别是 `runtime`和 `manifest`。（样板(boilerplate)指 webpack 运行时的引导代码）



## 提取模板(Extracting Boilerplate)

#### `CommonsChunkPlugin` 可将webpack 的样板和 manifest 提取出来

##### webpack.config.js

```diff
  const path = require('path');
+ const webpack = require('webpack');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
+     new webpack.optimize.CommonsChunkPlugin({
+       name: 'manifest'	//通过指定 entry 配置中未用到的名称
+     })
    ],
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

### 提取第三方库

​		通过使用新的 `entry(入口)` 起点，以及再额外配置一个 `CommonsChunkPlugin` 实例的组合方式，将更新频率低的第三方库(library)提取到单独的 `vendor` chunk 文件中。

#### webpack.config.js

```diff
  var path = require('path');
  const webpack = require('webpack');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
-   entry: './src/index.js',
+   entry: {
+     main: './src/index.js',
+     vendor: [
+       'lodash'
+     ]
+   },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
+     new webpack.optimize.CommonsChunkPlugin({
+       name: 'vendor'
+     }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      })
    ],
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

#### 构建结果：

```bash
                           Asset       Size  Chunks                    Chunk Names
  vendor.8196d409d2f988123318.js     541 kB       0  [emitted]  [big]  vendor
    main.0ac0ae2d4a11214ccd19.js  791 bytes       1  [emitted]         main
manifest.004a1114de8bcf026622.js    5.85 kB       2  [emitted]         manifest
                      index.html  352 bytes          [emitted]
```



## 模块标识符(Module Identifiers)

​		添加一个模块 `print.js`，再次运行构建，期望只有 `main` bundle 的 hash 发生变化。

​		然而，三个文件的 hash **都变化了**。这是因为每个 [`module.id`](https://www.webpackjs.com/api/module-variables#module-id-commonjs-) 会基于默认的解析顺序(resolve order)进行增量。也就是说，当解析顺序发生变化，ID 也会随之改变。因此，简要概括：

- `main` bundle 会随着自身的新增内容的修改，而发生变化。
- `vendor` bundle 会随着自身的 `module.id` 的修改，而发生变化。
- `manifest` bundle 会因为当前包含一个新模块的引用，而发生变化。

​		第一个和最后一个都是符合预期的行为，而 `vendor` 的 hash 发生变化是需要修复的。使用两个插件来解决这个问题。

 [`NamedModulesPlugin`](https://www.webpackjs.com/plugins/named-modules-plugin)，将使用模块的路径，而不是数字标识符。虽然此插件有助于在开发过程中输出结果的可读性，然而执行时间会长一些。

####  [`HashedModuleIdsPlugin`](https://www.webpackjs.com/plugins/hashed-module-ids-plugin)，推荐用于生产环境构建：

#### webpack.config.js

```javascript
    plugins: [
    	new webpack.HashedModuleIdsPlugin()
    ],
```

现在不管再添加任何新的本地依赖，每次构建`vendor` hash 都保持一致。



## webpack4（更新以上缓存章节的配置代码）

### 以Hash值命名包更新缓存

```javascript
{
  output: {
    /*
    代码中引用的文件（js、css、图片等）会根据配置合并为一个或多个包，我们称一个包为 chunk。
    每个 chunk 包含多个 modules。无论是否是 js，webpack 都将引入的文件视为一个 module。
    chunkFilename 用来配置这个 chunk 输出的文件名。

    [chunkhash]：这个 chunk 的 hash 值，文件发生变化时该值也会变。使用 [chunkhash] 作为文件名可以防止浏览器读取旧的缓存文件。

    还有一个占位符 [id]，编译时每个 chunk 会有一个id。
    我们在这里不使用它，因为这个 id 是个递增的数字，增加或减少一个chunk，都可能导致其他 chunk 的 id 发生改变，导致缓存失效。
    */
    chunkFilename: '[chunkhash].js',
  }
  
  plugins: [
    /*
    使用文件路径的 hash 作为 moduleId。
    虽然我们使用 [chunkhash] 作为 chunk 的输出名，但仍然不够。
    因为 chunk 内部的每个 module 都有一个 id，webpack 默认使用递增的数字作为 moduleId。
    如果引入了一个新文件或删掉一个文件，可能会导致其他文件的 moduleId 也发生改变，
    那么受影响的 module 所在的 chunk 的 [chunkhash] 就会发生改变，导致缓存失效。
    因此使用文件路径的 hash 作为 moduleId 来避免这个问题。
    */
    new webpack.HashedModuleIdsPlugin()
  ],

  optimization: {
    /*
    上面提到 chunkFilename 指定了 chunk 打包输出的名字，那么文件名存在哪里了呢？
    它就存在引用它的文件中。这意味着一个 chunk 文件名发生改变，会导致引用这个 chunk 文件也发生改变。

    runtimeChunk 设置为 true, webpack 就会把 chunk 文件名全部存到一个单独的 chunk 中，
    这样更新一个文件只会影响到它所在的 chunk 和 runtimeChunk，避免了引用这个 chunk 的文件也发生改变。
    */
    runtimeChunk: true,

    splitChunks: {
      /*
      默认 entry 的 chunk 不会被拆分
      因为我们使用了 html-webpack-plugin 来动态插入 <script> 标签，entry 被拆成多个 chunk 也能自动被插入到 html 中，
      所以我们可以配置成 all, 把 entry chunk 也拆分了
      */
      chunks: 'all'
    }
  }
}
```

### 测试

**第一次构建**

<img src="https://raw.githubusercontent.com/Zimomo333/Vuex-Router-Webpack/master/picture/first_hash.JPG" width="300px" height="540px" />

新增一个test.vue，路由文件新增一个路径，**第二次构建**

<img src="https://raw.githubusercontent.com/Zimomo333/Vuex-Router-Webpack/master/picture/second_hash.JPG" width="300px" height="580px" />

**可以看到大部分包的hash值不变，缓存仍有效**



### 优化分包策略（参考自 字节跳动 花裤衩 大佬）

按照体积大小、共用率、更新频率重新划分包，使其尽可能的利用浏览器缓存。

<img src="https://user-gold-cdn.xitu.io/2018/8/7/16513e5b6a73ac96?w=1482&h=756&f=jpeg&s=150509" width="700px" height="357px" />

- 基础类库 chunk-libs

它是构成我们项目必不可少的一些基础类库，比如 `vue`+`vue-router`+`vuex`+`axios` 这种标准的全家桶，它们的升级频率都不高，但每个页面都需要它们。（一些全局被共用的，体积不大的第三方库也可以放在其中：比如 nprogress、js-cookie、clipboard 等）

- UI 组件库

理论上 UI 组件库也可以放入 libs 中，但这里单独拿出来的原因是： 它实在是比较大，不管是 `Element-UI`还是`Ant Design` gizp 压缩完都可能要 200kb 左右，它可能比 libs 里面所有的库加起来还要大不少，而且 UI 组件库的更新频率也相对的比 libs 要更高一点。我们不时的会升级 UI 组件库来解决一些现有的 bugs 或使用它的一些新功能。所以建议将 UI 组件库也单独拆成一个包。

- 自定义组件/函数 chunk-commons

这里的 commons 主要分为 **必要**和**非必要**。

必要组件是指那些项目里必须加载它们才能正常运行的组件或者函数。比如你的路由表、全局 state、全局侧边栏/Header/Footer 等组件、自定义 Svg 图标等等。这些其实就是你在入口文件中依赖的东西，它们都会默认打包到`app.js`中。

非必要组件是指被大部分页面使用，但在入口文件 entry 中未被引入的模块。比如：一个管理后台，你封装了很多 select 或者  table 组件，由于它们的体积不会很大，它们都会被默认打包到到每一个懒加载页面的 chunk  中，这样会造成不少的浪费。你有十个页面引用了它，就会包重复打包十次。所以应该将那些被大量共用的组件单独打包成`chunk-commons`。

不过还是要结合具体情况来看。一般情况下，你也可以将那些*非必要组件函数*也在入口文件 entry 中引入，和*必要组件函数*一同打包到`app.js`之中也是没什么问题的。

- 低频组件

低频组件和上面的共用组件 `chunk-commons` 最大的区别是，它们只会在一些特定业务场景下使用，比如富文本编辑器、`js-xlsx`前端 excel 处理库等。一般这些库都是第三方的且大于 30kb，所以 webpack 4 会默认打包成一个独立的 bundle。也无需特别处理。小于 30kb 的情况下会被打包到具体使用它的页面 bundle 中。

- 业务代码

这部分就是我们平时经常写的业务代码。一般都是按照页面的划分来打包，比如在 vue 中，使用[路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)的方式加载页面 `component: () => import('./Foo.vue')` webpack 默认会将它打包成一个独立的 bundle。

配置代码：

```javascript
splitChunks: {
  chunks: "all",
  cacheGroups: {
    libs: {
      name: "chunk-libs",
      test: /[\\/]node_modules[\\/]/,
      priority: 10,
      chunks: "initial" // 只打包初始时依赖的第三方
    },
    elementUI: {
      name: "chunk-elementUI", // 单独将 elementUI 拆包
      priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
      test: /[\\/]node_modules[\\/]element-ui[\\/]/
    },
    commons: {
      name: "chunk-commons",
      test: path.resolve("src/components"), // 可自定义拓展你的规则
      minChunks: 2, // 最小共用次数
      priority: 5,
      reuseExistingChunk: true
    }
  }
};
```

### 测试

使用 **webpack-bundle-analyzer** 插件可视化分析包结构

```shell
npm install --save-dev webpack-bundle-analyzer
```

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

**打包前**

<div align=center><img src="https://raw.githubusercontent.com/Zimomo333/Vuex-Router-Webpack/master/picture/before_split.PNG"></div>

**打包后**

<div align=center><img src="https://raw.githubusercontent.com/Zimomo333/Vuex-Router-Webpack/master/picture/after_split.PNG"></div>


