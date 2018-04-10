将组件(components)映射到路由(routes)，然后告诉 vue-router 在哪里渲染它们。

组件：
* `<router-link>` 路由导航组件，通过to属性指定path
* `<router-view>` 指定匹配到的组件的渲染区域

创建 router 实例
* 创建 VueRouter(options) 对象
* 设置 options 属性 routes 指定路由集合。路由主要参数 path 指定路径，component 注册组件
* 通过 router 属性挂在到根实例

通过注入路由器，我们可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由
* 获取路由参数 this.$route.params
* this.$router.go(-1)
* this.$router.push('/')
* $route.query 查询参数
* $route.hash

响应路由参数变化
* 使用路由参数时，类似情况的路由跳转，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。
* 复用组件时，想对路由参数变化做出响应的话，简单的 watch $route 对象或者使用 beforeRouteUpdate 守卫

匹配优先级
* 有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。

嵌套路由
* 实际应用中，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件
* `<router-view>` 是最顶层的出口，渲染最高级路由匹配到的组件。同样地，一个被渲染组件同样可以包含自己的嵌套 `<router-view>`。
* 在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置

> 要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。

声明式 VS 编程式
* `<router-link to="...">`
* router.push(location, onComplete?, onAbort?)
* router.replace(location, onComplete?, onAbort?)：它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

push的几种方式
```js
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

> 注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path

命名路由
* 有时候，通过一个名称来标识一个路由比路径显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称 name。
* 这时候通过 router-link 跳转 to 需要传递对象

命名视图
* 有时候想同时（同级）展示多个视图，而不是嵌套展示，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。
* 此时路由的注册就需要使用components，而不是component了！

重定向和别名
* 定义 route 时设置 redirect 属性，重定向的目标可以是 path，可以是命名的路由，甚至可以是一个方法
* 设置 route 的 alias 属性，别名的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。

路由组件传参
* 在组件中使用 $route  会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。使用 props 将组件和路由解耦
* 定义 route 的时候，设置props:true，route.params 将会被设置为组件属性。这里注意：对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项
* props还可以是对象，函数模式

HTML5 History模式
* vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。
* 如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。
* 这种模式要玩好，还需要后台配置支持。你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。
* 警告：给个警告，因为这么做以后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回 index.html 文件。为了避免这种情况，你应该在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面。

导航守卫
* vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。
* 全局守卫：router.beforeEach 
* 全局后置钩子：router.afterEach，和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身
* 路由独享的守卫，定义 route 的 beforeEnter
* 组件内的守卫
  * beforeRouteEnter：在渲染该组件的对应路由被 confirm 前调用，不！能！获取组件实例 `this`，不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
  * beforeRouteUpdate (2.2 新增)：在当前路由改变，但是该组件被复用时调用
  * beforeRouteLeave：导航离开该组件的对应路由时调用

> 记住参数或查询的改变并不会触发进入/离开的导航守卫。你可以通过观察 $route 对象来应对这些变化，或使用 beforeRouteUpdate 的组件内守卫。

路由元信息
* 定义路由的时候可以配置 meta 字段
* 一个路由匹配到的所有路由记录会暴露为 $route 对象（还有在导航守卫中的路由对象）的 $route.matched 数组。因此，我们需要遍历 $route.matched 来检查路由记录中的 meta 字段。

基于路由的动态过渡
```js
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>
// 接着在父组件内
// watch $route 决定使用哪种过渡
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
```

数据获取
* 导航完成之后获取：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示『加载中』之类的指示。
  * created 获取数据
* 导航完成之前获取：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。
  * 在接下来的组件的 beforeRouteEnter 守卫中获取数据，当数据获取成功后只调用 next 方法。

滚动行为
* 使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 
* 当创建一个 Router 实例，你可以提供一个 scrollBehavior 方法
  * scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
  * 这个方法返回滚动位置的对象信息 { x: number, y: number } || { selector: string, offset? : { x: number, y: number }}
* 滚动到锚点
* 返回 savedPosition

路由懒加载
* 把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件
* 结合 Vue 的异步组件和 Webpack 的代码分割功能，轻松实现路由组件的懒加载。
  1. 可以将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身)
  2. 在 Webpack 2 中，我们可以使用动态 import语法来定义代码分块点 (split point)