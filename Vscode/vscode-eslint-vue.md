## Vscode 配置 Eslint 格式化 Vue 代码

https://eslint.vuejs.org/user-guide/#usage



## 安装 Eslint

```shell
npm i eslint -D
```



## 安装 eslint-plugin-vue

```shell
npm i eslint-plugin-vue
```

新建配置文件 **.eslintrc.js**

```javascript
module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        // 'plugin:vue/vue3-recommended',
        'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    ],
    rules: {
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
    }
}
```

#### 插件（只需选一个即可，后面的包含前面的功能）

- `"plugin:vue/base"` ... Settings and rules to enable correct ESLint parsing.
- Configurations for using Vue.js 3.x.
  - `"plugin:vue/vue3-essential"` ... `base`, plus rules to prevent errors or unintended behavior.
  - `"plugin:vue/vue3-strongly-recommended"` ... Above, plus rules to considerably improve code readability and/or dev experience.
  - `"plugin:vue/vue3-recommended"` ... Above, plus rules to enforce subjective community defaults to ensure consistency.
- Configurations for using Vue.js 2.x.
  - `"plugin:vue/essential"` ... `base`, plus rules to prevent errors or unintended behavior.
  - `"plugin:vue/strongly-recommended"` ... Above, plus rules to considerably improve code readability and/or dev experience.
  - `"plugin:vue/recommended"` ... Above, plus rules to enforce subjective community defaults to ensure consistency



## Vetur

Vetur 会对 <template> 、<script> 、<style> 调用对应的格式化工具

上面已经使用 Eslint 对 Vue 进行格式化，为防止重复冲突，应禁用 Vetur 对 <template> 的格式化

```json
"editor.formatOnSave": true, // 开启保存后格式化
"editor.codeActionsOnSave": { // 设置用eslint来格式化
    "source.fixAll.eslint": true
}
"vetur.format.defaultFormatter.html": "none", // 禁用Vetur对<template>的格式化，防止与eslint重复冲突
"vetur.format.defaultFormatter.js": "vscode-typescript", // <script>标签使用vscode自带工具来格式化
"javascript.format.semicolons": "remove", // 移除多余的分号
"vetur.format.defaultFormatter.js": "vscode-typescript", // <script>标签使用vscode自带工具来格式化
```

