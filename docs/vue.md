## Vue 对象
* el 指定元素
* data 组件数据
  * 当一个 Vue 实例被创建时，它向 Vue 的响应式系统中加入了其 data 对象中能找到的所有的属性
  * 只有当实例被创建时 data 中存在的属性才是响应式的。如果你知道你会在晚些时候需要一个属性，但是一开始它为空或不存在，那么你仅需要设置一些初始值。
  * 唯一的例外是使用 Object.freeze()，这会阻止修改现有的属性，也意味着响应系统无法再追踪变化。
* methods 组件函数：直接通过 this.attr 访问组件 data 数据
* 除了数据属性，Vue 实例还暴露了一些有用的实例属性与方法。它们都有前缀 $，以便与用户定义的属性区分开来。
  * $data
  * $el
  * $watch
* 钩子函数
  * created
  * mounted
  * updated
  * destoryed
  * 生命周期钩子的 this 上下文指向调用它的 Vue 实例，不要在选项属性或回调上使用箭头函数
* computed 计算属性：计算属性是基于它们的依赖进行缓存的。
  * 计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter
* watch 侦听属性
  * 注意不要滥用watch，通常更好的做法是使用计算属性而不是命令式的 watch 回调。
  * 虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
* vue实例化对象可以直接访问 data 下数据和 methods 下方法

## 模板语法
* 插值
  * 文本：Mustache 语法 {{}}，通过使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。
  * 原始 HTML：v-html 
  * v-bind：Mustache 语法不能作用在 HTML 特性上，遇到这种情况应该使用 v-bind 指令
* 指令
  * 指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。
  * 参数：一些指令能够接收一个“参数”，在指令名称之后以冒号表示。
  * 修饰符：修饰符 (Modifiers) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。
  * 缩写：v-bind 可以直接缺省，v-on 使用 @ 代替

> 在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。

> 你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值。

> 对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持。

## Class 和 Style 增强
* 在将 v-bind 用于 class 和 style 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。
* 我们也可以在这里绑定一个返回对象的计算属性。这是一个常用且强大的模式
* v-bind:style 的数组语法可以将多个样式对象应用到同一个元素上
* v-bind:style 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用单引号括起来) 来命名
* 自动添加前缀
* 多重值

## 条件渲染
* v-if v-else v-else-if
* v-show：v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS 属性 display。 
  * 注意，v-show 不支持 `<template>` 元素，也不支持 v-else。
* 用 key 管理可复用的元素
  * Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
  * 那如果需求是不复用他们呢？只需要添加 key 属性即可

v-if 与 v-show 区别
* v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
* v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
* v-show 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
* v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

## 列表渲染
* 在 v-for 块中，我们拥有对父作用域属性的完全访问权限。v-for 还支持一个可选的第二个参数为当前项的索引。
* 遍历对象 v-for="(value, key, index) in object"
* key
  * 当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。
  * 为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。理想的 key 值是每项都有的且唯一的 id。
  * 建议尽可能在使用 v-for 时提供 key，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。
* v-for 也可以取整数。在这种情况下，它将重复多次模板。

数组
* 变异方法
  * push()
  * pop()
  * shift()
  * unshift()
  * splice()
  * sort()
  * reverse()
* 非变异方法
  * filter()
  * concat()
  * slice()

注意事项
* Vue 不能检测以下变动的数组
  * 当你利用索引直接设置一个项时
    * Vue.set(vm.items, indexOfItem, newValue)
    * vm.items.splice(indexOfItem, 1, newValue)
    * vm.$set 实例方法，该方法是全局方法 Vue.set 的一个别名
  * 当你直接修改数组的长度属性时
    * vm.items.splice(newLength)
* Vue 不能检测对象属性的添加或删除
  * 可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性。
  * 你可能需要为已有对象赋予多个新属性，比如使用 Object.assign() 或 _.extend()。在这种情况下，你应该用两个对象的属性创建一个新的对象。

## 事件处理
* 绑定方法名称
* 内联 JavaScript 语句中调用方法
  * 竟然可以写成方法调用，猜测v-on中进行了处理
* 在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 $event 把它传入方法
* 事件修饰符
  * .stop：阻止冒泡
  * .prevent：阻止默认行为
  * .capture：事件捕获方式
  * .self：当前元素自身时触发处理函数
  * .once：事件将只会触发一次
  * .passive
* 按键修饰符
  * .enter
  * .tab
  * .delete (捕获“删除”和“退格”键)
  * .esc
  * .space
  * .up
  * .down
  * .left
  * .right
* 系统修饰键
  * .ctrl
  * .alt
  * .shift
  * .meta
* .exact 修饰符
* 鼠标按钮修饰符
  * .left
  * .right
  * .middle

> config.keyCodes 对象自定义按键修饰符别名

## 表单绑定
* v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源。
* 修饰符
  * .lazy：转变为使用 change 事件进行同步
  * .number：自动将用户的输入值转为数值类型，这通常很有用，因为即使在 type="number" 时，HTML 输入元素的值也总会返回字符串。
  * .trim：自动过滤用户输入的首尾空白字符


## 组件化
* 组件可以扩展 HTML 元素，封装可重用的代码。
* 所有的 Vue 组件同时也都是 Vue 的实例，所以可接受相同的选项对象 (除了一些根级特有的选项) 并提供相同的生命周期钩子。
* 注册组件
  * 全局组件：Vue.component(name,option)
  * 局部注册：Vue对象选项，components属性
* 参数
  * props 父子数据传递
  * template 指定 html 模板
* 当在一个自定义组件上使用 class 属性时，这些类将被添加到该组件的根元素上面。这个元素上已经存在的类不会被覆盖。
* is 属性使用组件 $emit 触发事件
* DOM 模板解析注意事项
  * 像 `<ul>、<ol>、<table>、<select>` 这样的元素里允许包含的元素有限制，而另一些像 `<option>` 这样的元素只能出现在某些特定元素的内部。在自定义组件中使用这些受限制的元素时会导致一些问题，变通的方案是使用特殊的 is 特性
  * 如果使用来自以下来源之一的字符串模板，则没有这些限制：
    * `<script type="text/x-template">`
    * JavaScript 内联模板字符串
    * .vue 组件
  * 因此，请尽可能使用字符串模板。
* 构造 Vue 实例时传入的各种选项大多数都可以在组件里使用。只有一个例外：data 必须是函数。
* 组件组合
  * Prop
    * camelCase vs. kebab-case：HTML 特性是不区分大小写的。所以，当使用的不是字符串模板时，camelCase (驼峰式命名) 的 prop 需要转换为相对应的 kebab-case (短横线分隔式命名)
    * 动态 Prop：v-bind 来动态地将 prop 绑定到父组件的数据
    * 如果你想把一个对象的所有属性作为 prop 进行传递，可以使用不带任何参数的 v-bind
  * 事件
* 单向数据流
  * 当父组件的属性变化时，将传导给子组件，但是反过来不会。
  * 在两种情况下，我们很容易忍不住想去修改 prop 中数据
    * Prop 作为初始值传入后，子组件想把它当作局部数据来用；
    * Prop 作为原始数据传入，由子组件处理成其它数据输出。
  * 对这两种情况，正确的应对方式是
    * 定义一个局部变量，并用 prop 的值初始化它
    * 定义一个计算属性，处理 prop 的值并返回
* Prop 验证
  * 要指定验证规则，需要用对象的形式来定义 prop，而不能用字符串数组
  * type/required/default/validator 
* keep-alive：如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。

> 注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。

> 注意 prop 会在组件实例创建之前进行校验，所以在 default 或 validator 函数里，诸如 data、computed 或 methods 等实例属性还无法使用。

### 自定义事件
* 使用 v-on 绑定自定义事件
  * 使用 $on(eventName) 监听事件
  * 使用 $emit(eventName, optionalPayload) 触发事件
  * 在某个组件的根元素上监听一个原生事件。可以使用 v-on 的修饰符 .native。
* 使用自定义事件的表单输入组件
  * v-model语法糖
  ```js
  <input v-model="something">  
  // 下面写法的语法糖
  <input
    v-bind:value="something"
    v-on:input="something = $event.target.value">
  ```
  * 让组件的 v-model 生效
    * 接受一个 value prop
    * 在有新的值时触发 input 事件并将新值作为参数
  * 得到真实元素：ref=name、 this.$refs.name
* 非父子组件的通信
  * 在简单的场景下，可以使用一个空的 Vue 实例作为事件总线

### 使用插槽分发内容
为了让组件可以组合，我们需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为内容分发。Vue 使用特殊的 `<slot>` 元素作为原始内容的插槽。
* 单个插槽
  * 除非子组件模板包含至少一个 `<slot>` 插口，否则父组件的内容将会被丢弃。当子组件模板只有一个没有属性的插槽时，父组件传入的整个内容片段将插入到插槽所在的 DOM 位置，并替换掉插槽标签本身。
  * 最初在 `<slot>` 标签中的任何内容都被视为备用内容。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容。
* 具名卡槽
  * `<slot>` 元素可以用一个特殊的特性 name 来进一步配置如何分发内容。多个插槽可以有不同的名字。具名插槽将匹配内容片段中有对应 slot 特性的元素。
  * 仍然可以有一个匿名插槽，它是默认插槽，作为找不到匹配的内容片段的备用插槽。
* 作用域插槽
  * 作用域插槽是一种特殊类型的插槽，用作一个 (能被传递数据的) 可重用模板，来代替已经渲染好的元素。
  * 在子组件中，只需将数据传递到插槽，就像你将 prop 传递给组件一样
  * 父级中添加slot-scope属性，slot-scope 的值将被用作一个临时变量名，此变量接收从子组件传递过来的 prop 对象
  * 作用域插槽更典型的用例是在列表组件中，允许使用者自定义如何渲染列表的每一项

## 其他
编写可复用组件
* Prop 允许外部环境传递数据给组件；
* 事件允许从组件内触发外部环境的副作用；
* 插槽允许外部环境将额外的内容组合在组件中。

子组件引用
* 尽管有 prop 和事件，但是有时仍然需要在 JavaScript 中直接访问子组件。为此可以使用 ref 为子组件指定一个引用 ID。
* $refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅是一个直接操作子组件的应急方案——应当避免在模板或计算属性中使用 $refs。

异步组件
* 允许将组件定义为一个工厂函数，异步地解析组件的定义。
* 可以在工厂函数中返回一个 Promise

高级异步组件

组件间循环引用

……