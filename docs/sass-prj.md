项目架构
src
---assets 静态文件
---common 公共工具
  ---cookie操作
  ---h5存储
  ---数组去重交换
  ---ajax操作
  ---笛卡尔积
  ---权限
---components
---filter
---layout
---pages
---router
---service
---vuex


使用ElementUI：Vue.use(ElementUI)

注册全局组件：Vue.Component

注册全局指令：Vue.directive，是用v-name使用

注册过滤器：Vue.filter，用法和angular是一样的

阻止Vue在启动时生成生产消息：Vue.config.productionTip = false

import @符号：webpack 设置的别名

封装 ajax 请求
* transformRequest：允许在向服务器发送前，修改请求数据
* transformResponse：在传递给 then/catch 前，允许修改响应数据
* Context-Type头
  * application/x-www-form-urlencoded：目前项目所使用的，提交的数据按照 key1=val1&key2=val2 的方式进行编码
  * multipart/form-data：boundary值用户分割不同的字段
  * application/json：服务端消息主体是序列化后的 JSON 字符串，由于 JSON 规范的流行，除了低版本 IE 之外的各大浏览器都原生支持 JSON.stringify，服务端语言也都有处理 JSON 的函数。JSON 格式支持比键值对复杂得多的结构化数据，这一点也很有用。
  * text/xml：XML 结构还是过于臃肿，一般场景用 JSON 会更灵活方便。

学习vuex
