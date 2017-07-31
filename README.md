
## 名词解释

* 项目根目录 : 项目顶级目录,即package.json所在目录
* 模块根目录 : 源码子业务模块顶级目录, 即fis-conf.js所在目录


## 启动程序

### 依赖环境

* node 5.3版本 (建议使用nvm管理node版本)
* 全局安装nodemon、yarn

### 工具安装

* `npm install -g grape-cli@0.3.1`

### 环境初始化
    
* 项目根目录执行 `yarn`
* 业务子模块(common)执行 `yarn`
* 项目根目录执行 `npm run env:init` , windows如报错, 执行 `sh scripts/env/init`

### 编译代码

* 编译各个模块
    
    模块根目录 grape release -cw
    
### 启动服务器

* 项目根目录启动server :  grape run


## 代码规范


### ES6 使用

* 模块定义/加载, **禁止** 使用 ES6 的模块方法, 例如 `import`/ `export default`


### client  端

* `JSON.parse`  统一使用 `common:widget/ui/utils/utils.js` 下的 `utils.parseJSON`, 会在解析异常时,返回 `null`
* 引入第三方库时, **必须** 先检查是否支持 `IE8`

### server 端

* 异步请求后端服务, **必须**使用 `ES7` 中的 `async/await`
* 对于后端服务返回结果, 如果要读取 `data`, **必须** 先检查`status`是否为 **数字0**
* 提测前, **必须** 删除开发中临时加入的 `console` 语句, 避免增加线上日志文件大小


