廖雪峰 JavaScript 教程

用来查漏补缺，又是一位膜拜的对象！

<!-- more -->

# 快速入门

多行字符串：由于多行字符串用\n写起来比较费事，所以最新的ES6标准新增了一种多行字符串的表示方法，用反引号 ` ... ` 表示

ES6新增了一种模板字符串，表示方法和上面的多行字符串一样，但是它会自动替换字符串中的变量

操作字符串
* 需要特别注意的是，字符串是不可变的，如果对字符串的某个索引赋值，不会有任何错误，但是，也没有任何效果
* JavaScript为字符串提供了一些常用方法，注意，调用这些方法本身不会改变原有字符串的内容，而是返回一个新字符串

操作数组
* 直接给Array的length赋一个新的值会导致Array大小的变化
* Array可以通过索引把对应的元素修改为新的值，对Array的索引进行赋值会直接修改这个Array，这一点不同于字符串
* 如果通过索引赋值时，索引超过了范围，同样会引起Array大小的变化
* indexOf 索引元素
* slice()就是对应String的substring()版本
* splice()方法是修改Array的“万能方法”，它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素

操作对象
* 如果我们要检测xiaoming是否拥有某一属性，可以用in操作符，不过要小心，如果in判断一个属性存在，这个属性不一定是xiaoming的，它可能是xiaoming继承得到的
* 要判断一个属性是否是xiaoming自身拥有的，而不是继承得到的，可以用hasOwnProperty()方法
* JavaScript的默认对象表示方式{}可以视为其他语言中的Map或Dictionary的数据结构，即一组键值对。JavaScript的对象有个小问题，就是键必须是字符串。但实际上Number或者其他数据类型作为键也是非常合理的。为了解决这个问题，最新的ES6规范引入了新的数据类型Map。
* Set和Map类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，没有重复的key。
* 遍历Array可以采用下标循环，遍历Map和Set就无法使用下标。为了统一集合类型，ES6标准引入了新的iterable类型，Array、Map和Set都属于iterable类型。具有iterable类型的集合可以通过新的for-of循环来遍历。

for-in 和 for-of
* for-in循环由于历史遗留问题，它遍历的实际上是对象的属性名称。一个Array数组实际上也是一个对象，它的每个元素的索引被视为一个属性。
* 当我们手动给Array对象添加了额外的属性name后，for-in循环将带来意想不到的意外效果，for-in循环将把name包括在内，但Array的length属性却不包括在内。
* for-of循环则完全修复了这些问题，它只循环集合本身的元素
* 更好的方式是直接使用iterable内置的forEach方法

> 注意，forEach()方法是ES5.1标准引入的，你需要测试浏览器是否支持

操作函数
* arguments：JavaScript还有一个免费赠送的关键字arguments，它只在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数。
* ES6标准引入了rest参数，rest参数只能写在最后，前面用...标识
* ES6标准引入了新的关键字const来定义常量，const与let都具有块级作用域
* 解构赋值
  * 支持嵌套
  * 如果要使用的变量名和属性名不一致，例子：把passport属性赋值给变量id，let {name, passport:id} = person;
  * 解构赋值还可以使用默认值（使用=），这样就避免了不存在的属性返回undefined的问题
* JavaScript的函数内部如果调用了this，那么这个this到底指向谁？答案是，视情况而定！
* 高阶函数
  * map
  * reduce
  * filter，利用filter巧妙去重
  ```js
    r = arr.filter(function (element, index, self) {
        return self.indexOf(element) === index;
    });
  ```
  * sort
    * 因为字符串根据ASCII码进行排序
    * 默认把所有元素先转换为String再排序
* 闭包
  * 返回闭包时牢记的一点就是：返回函数不要引用任何循环变量，或者后续会发生变化的变量。
  * 如果一定要引用循环变量怎么办？方法是再创建一个函数，用该函数的参数绑定循环变量当前的值，无论该循环变量后续如何更改，已绑定到函数参数的值不变
  * 使用场景
    * 封装私有变量
    * 把多参数的函数变成单参数的函数
* 箭头函数
  * 箭头函数相当于匿名函数，并且简化了函数定义。
  * 箭头函数和匿名函数有个明显的区别：箭头函数内部的this是词法作用域，由上下文确定。
* 生成器：generator

# 标准对象
包装对象
* 使用Number、Boolean和String时，没有写new会发生什么情况。Number、Boolean和String被当做普通函数，把任何类型的数据转换为number、boolean和string类型（注意不是其包装类型）
* 任何对象都有toString()方法吗？null和undefined就没有
* number对象调用toString()报SyntaxError，需要处理一下
```js
123..toString(); // '123', 注意是两个点！
(123).toString(); // '123'
```

总结一下，有这么几条规则需要遵守：
* 不要使用new Number()、new Boolean()、new String()创建包装对象；
* 用parseInt()或parseFloat()来转换任意类型到number；
* 用String()来转换任意类型到string，或者直接调用某个对象的toString()方法；
* 通常不必把任意类型转换为boolean再判断，因为可以直接写if (myVar) {...}；
* typeof操作符可以判断出number、boolean、string、function和undefined；
* 判断Array要使用Array.isArray(arr)；
* 判断null请使用myVar === null；
* 判断某个全局变量是否存在用typeof window.myVar === 'undefined'；
* 函数内部判断某个变量是否存在用typeof myVar === 'undefined'。

Date
* 略

RegExp
* [非常不错的正则基础知识和JS正则的使用](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499503920bb7b42ff6627420da2ceae4babf6c4f2000)

JSON
* JSON是JavaScript Object Notation的缩写，它是一种数据交换格式。
* 在JSON出现之前，大家一直用XML来传递数据。
* 道格拉斯同学长期担任雅虎的高级架构师，自然钟情于JavaScript。他设计的JSON实际上是JavaScript的一个子集。
* JSON还定死了字符集必须是UTF-8，表示多语言就没有问题了。为了统一解析，JSON的字符串规定必须用双引号""，Object的键也必须用双引号""。
* 几乎所有编程语言都有解析JSON的库，而在JavaScript中，我们可以直接使用JSON，因为JavaScript内置了JSON的解析。
* 把任何JavaScript对象变成JSON，就是把这个对象序列化成一个JSON格式的字符串，这样才能够通过网络传递给其他计算机。
* 如果我们收到一个JSON格式的字符串，只需要把它反序列化成一个JavaScript对象，就可以在JavaScript中直接使用这个对象了。

JSON.stringify
* 最常用的是一个参数的情形，同时还支持第二个和第三个参数
* 第二个参数用于控制如何筛选对象的键值，如果我们只想输出指定的属性，可以传入Array
* 还可以传入一个函数，这样对象的每个键值对都会被函数先处理
* 如果我们还想要精确控制如何序列化对象，可以给对象定义一个toJSON()的方法，直接返回JSON应该序列化的数据
* 第三个参数控制输出缩进

JSON.parse
* 最常用的是一个参数的情形，同时还支持第二个
* 第二个参数可以接受一个函数，用来转换解析出的属性

# 面向对象编程
如果你熟悉Java或C#，很好，你一定明白面向对象的两个基本概念：
1. 类
2. 实例

所以，类和实例是大多数面向对象编程语言的基本概念。但在JavaScript中，这个概念需要改一改。JavaScript不区分类和实例的概念，而是通过原型（prototype）来实现面向对象编程。

假设有两个实例，xiaoming和Student，xiaoming如何想访问Student属性，简单粗暴的方法如下：
```js
xiaoming.__proto__ = Student;
```

经过实践，我们来分析几种情况
```js
// 方式1
var Student = {
  name: 'Robot',
  height: 1.2
};
var xiaoming = {
  name: '小明'
};

xiaoming.__proto__ = Student;

// 方式2
function Person() {
  this.name = 'Robot';
  this.height = 1.2;
}

function Student1() {
  this.name = 'lisi';
}

// 方式2
// Student1.prototype = new Person();

var person = new Person();

var lisi = new Student1();

// 方式3
lisi.__proto__ = person
```
分析如下，方式2和方式3的对象结构是相同的，但和方式1有细微不同，见图
![](img/1.png) ![](img/2.png)

区别其实很好理解，其实也就是通过new创建对象和花括号直接创建对象的区别，我们只需要知道new的原理和构造函数（即函数名）的prototype。
1. 最原始的函数名prototype属性只有两个属性，constructor指向自身函数和`__proto__`连接原型
2. 用 new 创建的对象还从原型上获得了一个 constructor 属性，从下面new模拟实现可以理解
3. new函数的模拟实现如下
```js
function objectFactory() {
  var obj = new Object(),
    Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret : obj;
}
```

但不知道方式2和方式3结果完全一样，有没有引发你的思考呢，同样的，看上面的new的原理可以知道
1. 表面只是修改方法的prototype，此时并没有继承，继承代码：`Constructor.prototype = father`
2. 但是new的时候，内部实例的`obj.__proto__ = Constructor.prototype`
3. 因此实际为`obj.__proto__ = Constructor.prototype = father`，prototype属性只是起到了过渡的作用
4. 但是通过 prototype 起到了一次性修改的作用，后面创建的对象都将直接实现继承 

> JavaScript的原型链和Java的Class区别就在，它没有“Class”的概念，所有对象都是实例，所谓继承关系不过是把一个对象的原型指向另一个对象而已。因此，归根到底，js的继承通过`__proto__`实现，`son.__proto__ = father`

注意，在编写JavaScript代码时，不要直接用`obj.__proto__`去改变一个对象的原型，使用Object.create()方法可以传入一个原型对象（实例或函数的prototype属性），并创建一个基于该原型的新对象，但是新对象什么属性都没有。即：
```js
// 基于Student原型创建一个新对象:
var s = Object.create(Student);
// create的模拟实现
function createObj(o) {
  function F(){}
  F.prototype = o;
  return new F();
}
```

### 创建对象
数组原型链：arr ----> Array.prototype ----> Object.prototype ----> null

函数原型链：foo ----> Function.prototype ----> Object.prototype ----> null

很容易想到，如果原型链很长，那么访问一个对象的属性就会因为花更多的时间查找而变得更慢，因此要注意不要把原型链搞得太长。

如果对象方法属性，直接创建在构造函数内部的化，如下：
```js
function Student(name) {
    this.name = name;
    this.hello = function () {
        alert('Hello, ' + this.name + '!');
    }
}
```

如果我们通过new Student()创建了很多对象，这些对象的hello函数实际上只需要共享同一个函数就可以了，这样可以节省很多内存。

要让创建的对象共享一个hello函数，根据对象的属性查找原则，我们只要把hello函数移动到对象共同的原型上就可以了，也就是Student.prototype。

忘记写new怎么办
* 如果一个函数被定义为用于创建对象的构造函数，但是调用时忘记了写new怎么办？
* 在strict模式下，this.name = name将报错，因为this绑定为undefined，在非strict模式下，this.name = name不报错，因为this绑定为window，于是无意间创建了全局变量name，并且返回undefined，这个结果更糟糕。
* 所以，调用构造函数千万不要忘记写new。为了区分普通函数和构造函数，按照约定，构造函数首字母应当大写，而普通函数首字母应当小写，这样，一些语法检查工具如jslint将可以帮你检测到漏写的new。

### 原型继承
在传统的基于Class的语言如Java、C++中，继承的本质是扩展一个已有的Class，并生成新的Subclass。

由于这类语言严格区分类和实例，继承实际上是类型的扩展。但是，JavaScript由于采用原型继承，我们无法直接扩展一个Class，因为根本不存在Class这种类型。看下面的例子：
```js
function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}
```

我们要基于Student扩展出子PrimaryStudent，可以先定义出PrimaryStudent
```js
function PrimaryStudent(props){
    Student.call(this,props)
    this.grade = props.grade || 1;
}
```
但是，调用了Student构造函数不等于继承了Student，PrimaryStudent创建的对象的原型是：
```js
new PrimaryStudent() ----> PrimaryStudent.prototype ----> Object.prototype ----> null
```
必须须想办法把原型链修改为：
```js
new PrimaryStudent() ----> PrimaryStudent.prototype ----> Student.prototype ----> Object.prototype ----> null
```
这样，原型链对了，继承关系就对了。新的基于PrimaryStudent创建的对象不但能调用PrimaryStudent.prototype定义的方法，也可以调用Student.prototype定义的方法。

如果你想用最简单粗暴的方法这么干：
```js
PrimaryStudent.prototype = Student.prototype;
```
是不行的！如果这样的话，PrimaryStudent和Student共享一个原型对象，那还要定义PrimaryStudent干啥？他会有什么问题呢？
1. 因为是直接重写prototype，因此如果PrimaryStudent的 prototype 上有自己的方法，就会被覆盖
2. 父对象的属性不能访问到，因为直接原型链直接指向了父的prototype
3. 会污染父prototype，子原型链上增加属性会影响到父元素原型链

我们必须借助一个中间对象来实现正确的原型链，这个中间对象的原型要指向Student.prototype。为了实现这一点，参考道爷（就是发明JSON的那个道格拉斯）的代码，中间对象可以用一个空函数F来实现
```js
// 空函数F:
function F() {
}

// 把F的原型指向Student.prototype:
F.prototype = Student.prototype;

// 把PrimaryStudent的原型指向一个新的F对象，F对象的原型正好指向Student.prototype:
PrimaryStudent.prototype = new F();

// 把PrimaryStudent原型的构造函数修复为PrimaryStudent:
PrimaryStudent.prototype.constructor = PrimaryStudent;
```

注意，函数F仅用于桥接，我们仅创建了一个new F()实例，而且，没有改变原有的Student定义的原型链。

如果把继承这个动作用一个inherits()函数封装起来，还可以隐藏F的定义，并简化代码：
```js
function inherits(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}

// 可以用es 5.1提供的api简化
function inherits(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}
```

JavaScript的原型继承实现方式就是：
* 定义新的构造函数，并在内部用call()调用希望“继承”的构造函数，并绑定this；
* 借助中间函数F实现原型链继承，最好通过封装的inherits函数完成；
* 继续在新的构造函数的原型上定义新方法。

### class继承
JavaScript的对象模型是基于原型实现的，特点是简单，缺点是理解起来比传统的类－实例模型要困难，最大的缺点是继承的实现需要编写大量代码，并且需要正确实现原型链。

新的关键字class从ES6开始正式被引入到JavaScript中。class的目的就是让定义类更简单。本质就是原型链的语法糖，也就是上面的代码实现的。

class的好处
* 封装性更好，避免了类似Student.prototype.hello = function () {...}这样分散的代码
* 对象创建和继承的最佳实践，比如方法挂载在原型链上，super调用父类构造并传参，同时简化代码，不需要开发者考虑原型继承的中间对象，原型对象的构造函数等等

> ES6引入的class和原有的JavaScript原型继承有什么区别呢？实际上它们没有任何区别，class的作用就是让JavaScript引擎去实现原来需要我们自己编写的原型链代码。简而言之，用class的好处就是极大地简化了原型链代码。

# 浏览器
浏览器对象
* window：不但充当全局作用域，而且表示浏览器窗口
* navigator：表示浏览器的信息，很容易地被用户修改，所以JavaScript读取的值不一定是正确的。
* screen：屏幕的信息
* location：当前页面的URL信息，常用属性：protocol，host，port，pathname，search，hash
* document
  * 表示当前页面。由于HTML在浏览器中以DOM形式表示为树形结构，document对象就是整个DOM树的根节点
  * document的title属性是从HTML文档中的`<title>xxx</title>`读取的，但是可以动态改变
* history：保存了浏览器的历史记录

操作DOM 和 操作表单

操作文件
* 在HTML表单中，可以上传文件的唯一控件就是`<input type="file">`。出于安全考虑，浏览器只允许用户点击`<input type="file">`来选择本地文件，用JavaScript对`<input type="file">`的value赋值是没有任何效果的。当用户选择了上传某个文件后，JavaScript也无法获得该文件的真实路径
* 由于JavaScript对用户上传的文件操作非常有限，尤其是无法读取文件内容，使得很多需要操作文件的网页不得不用Flash这样的第三方插件来实现。
* 随着HTML5的普及，新增的File API允许JavaScript读取文件内容，获得更多的文件信息。HTML5的File API提供了File和FileReader两个主要对象，可以获得文件信息并读取文件。
* readAsDataURL读取到的文件是一个字符串base64编码，如果需要服务器端处理，把字符串base64,后面的字符发送给服务器并用Base64解码就可以得到原始文件的二进制内容。

ajax跨域问题
* 通过Flash插件发送HTTP请求，现在用得也越来越少了。
* 通过在同源域名下架设一个代理服务器来转发，JavaScript负责把请求发送到代理服务器
* 第三种方式称为JSONP，它有个限制，只能用GET请求，并且要求返回JavaScript。
* 如果浏览器支持HTML5，那么就可以一劳永逸地使用新的跨域策略：CORS了。
  * Origin表示本域，也就是浏览器当前页面的域。当JavaScript向外域（如sina.com）发起请求后，浏览器收到响应后，首先检查Access-Control-Allow-Origin是否包含本域，如果是，则此次跨域请求成功，如果不是，则请求失败，JavaScript将无法获取到响应的任何数据。
  * 跨域能否成功，取决于对方服务器是否愿意给你设置一个正确的Access-Control-Allow-Origin，决定权始终在对方手中。
  * 简单请求包括GET、HEAD和POST（POST的Content-Type类型仅限application/x-www-form-urlencoded、multipart/form-data和text/plain），并且不能出现任何自定义头（例如，X-Custom: 12345），通常能满足90%的需求。
  * 最新的浏览器全面支持HTML5。在引用外域资源时，除了JavaScript和CSS外，都要验证CORS。
  * 对于PUT、DELETE以及其他类型如application/json的POST请求，在发送AJAX请求之前，浏览器会先发送一个OPTIONS请求（称为preflighted请求）到这个URL上，询问目标服务器是否接受，浏览器确认服务器响应的Access-Control-Allow-Methods头确实包含将要发送的AJAX请求的Method，才会继续发送AJAX，否则，抛出一个错误。由于以POST、PUT方式传送JSON格式的数据在REST中很常见，所以要跨域正确处理POST和PUT请求，服务器端必须正确响应OPTIONS请求。

Promise
* Promise有各种开源实现，在ES6中被统一规范，由浏览器直接支持。
* 简单例子
```js
var asyncJob = function(resolve,reject){
    // 开始工作，完成调用resolve，失败调用reject
}
// 直接将任务丢给Promise构造函数即可
var promise = new Promise(asyncJob);
```
* Promise最大的好处是在异步执行的流程中，把执行代码和处理结果的代码清晰地分离了
* 有若干个异步任务，需要先做任务1，如果成功后再做任务2，任何任务失败则不再继续并执行错误处理函数。只需要在任务1完成时候，继续return一个异步任务的promise即可
* 并行执行异步任务：Promise.all()
* 多个异步任务是为了容错，同时向两个URL获取数据，只需要获得先返回的结果即可。这种情况下，用Promise.race()

canvas
* getContext('2d')方法让我们拿到一个CanvasRenderingContext2D对象，所有的绘图操作都需要通过这个对象完成。
* 如果需要绘制3D怎么办？HTML5还有一个WebGL规范，允许在Canvas中绘制3D图形：gl = canvas.getContext("webgl");
* 坐标系统：Canvas的坐标以左上角为原点，水平向右为X轴，垂直向下为Y轴，以像素为单位，所以每个点都是非负整数。
* Canvas除了能绘制基本的形状和文本，还可以实现动画、缩放、各种滤镜和像素转换等高级操作。如果要实现非常复杂的操作，考虑以下优化方案：
  * 通过创建一个不可见的Canvas来绘图，然后将最终绘制结果复制到页面的可见Canvas中；
  * 尽量使用整数坐标而不是浮点数；
  * 可以创建多个重叠的Canvas绘制不同的层，而不是在一个Canvas中绘制非常复杂的图；
  * 背景图片如果不变可以直接用`<img>`标签并放到最底层。
* 更多api单独学习

jQuery：目前jQuery有1.x和2.x两个主要版本，区别在于2.x移除了对古老的IE 6、7、8的支持，因此2.x的代码更精简。选择哪个版本主要取决于你是否想支持IE 6~8。

underscore：正如jQuery统一了不同浏览器之间的DOM操作的差异，让我们可以简单地对DOM进行操作，underscore则提供了一套完善的函数式编程的接口，让我们更方便地在JavaScript中实现函数式编程。

# Node
浏览器大战，有点意思啊
* 微软通过IE击败了Netscape后一统桌面，结果几年时间，浏览器毫无进步。微软认为IE6浏览器已经非常完善，几乎没有可改进之处，然后解散了IE6开发团队
* Google自己开发了一个高性能JavaScript引擎，名字叫V8，以BSD许可证开源。
* 现代浏览器大战让微软的IE浏览器远远地落后了，因为他们解散了最有经验、战斗力最强的浏览器团队！回过头再追赶却发现，支持HTML5的WebKit已经成为手机端的标准了，IE浏览器从此与主流移动端设备绝缘。

浏览器大战和Node有何关系？
* 话说有个叫Ryan Dahl的歪果仁，他的工作是用C/C++写高性能Web服务。对于高性能，异步IO、事件驱动是基本原则，但是用C/C++写就太痛苦了。于是这位仁兄开始设想用高级语言开发Web服务。他评估了很多种高级语言，发现很多语言虽然同时提供了同步IO和异步IO，但是开发人员一旦用了同步IO，他们就再也懒得写异步IO了，所以，最终，Ryan瞄向了JavaScript。
* 因为JavaScript是单线程执行，根本不能进行同步IO操作，所以，JavaScript的这一“缺陷”导致了它只能使用异步IO。
* 2009年，Ryan正式推出了基于JavaScript语言和V8引擎的开源Web服务器项目，命名为Node.js。

Node上运行的JavaScript相比其他后端开发语言有何优势？
* 借助JavaScript天生的事件驱动机制加V8高性能引擎，使编写高性能Web服务轻而易举。
* JavaScript语言本身是完善的函数式语言，在Node环境下，通过模块化的JavaScript代码，加上函数式编程，并且无需考虑浏览器兼容性问题，直接使用最新的ECMAScript 6标准，可以完全满足工程上的需求。

给 mac 版 vscode 添加，右键菜单open with code，之前一直觉得不方便，这里终于可以[解决](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001470969077294a6455fc9cd1f48b69f82cd05e7fa9b40000)了。

### 模块
* 在使用require()引入模块的时候，请注意模块的相对路径。如果只写模块名，则Node会依次在内置模块、全局模块和当前模块下查找
* 这种模块加载机制被称为CommonJS规范。

深入了解模块原理
* 其实要实现“模块”这个功能，并不需要语法层面的支持。Node.js也并不会增加任何JavaScript语法。
* JavaScript语言本身并没有一种模块机制来保证不同模块可以使用相同的变量名。实现“模块”功能的奥妙就在于JavaScript是一种函数式编程语言，它支持闭包。
* Node利用JavaScript的函数式编程的特性，轻而易举地实现了模块的隔离。直接使用代码帮助理解
```js
// 准备module对象
var module = {
    id: 'hello',
    exports: {}
};
var load = function (exports,module) {
    // 读取的hello.js代码:
    function greet(name) {
        console.log('Hello, ' + name + '!');
    }

    module.exports = greet;
    // hello.js代码结束
    return module.exports;
};
var exported = load(module);
// 保存module:
save(module, exported);
```
  * 变量module是Node在加载js文件前准备的一个变量，并将其传入加载函数，我们在hello.js中可以直接使用变量module原因就在于它实际上是函数的一个参数
  * 通过把参数module传递给load()函数，hello.js就顺利地把一个变量传递给了Node执行环境，Node会把module变量保存到某个地方。
  * 由于Node保存了所有导入的module，当我们用require()获取module时，Node找到对应的module，把这个module的exports变量返回，这样，另一个模块就顺利拿到了模块的输出

module.exports vs exports

在Node环境中，有两种方法可以在一个模块中输出变量
```js
// 此方式有效
module.exports = {
    hello: hello,
    greet: greet
};

// 此方式有效
exports.hello = hello;
exports.greet = greet;

// 但是你不可以直接对exports赋值，将没有输出任何变量
exports = {
    hello: hello,
    greet: greet
};
```
其实看看上面的加载远离，就不难知道了
* 一开始默认情况下，Node准备的exports变量和module.exports变量实际上是同一个变量，并且初始化为空对象{}
* 记住load()函数最终返回module.exports
* exports直接添加属性的话，是可以的，因为操作的实际是同一个变量，会反映到module.exports中，但是如果覆盖写的话，将改变指向，此时无法放映到module.exports中，因此也就不会有任何输出了

### 基本模块
服务器程序必须能接收网络请求，读写文件，处理二进制内容，所以，Node.js内置的常用模块就是为了实现基本的服务器功能。这些模块在浏览器环境中是无法被执行的，因为它们的底层代码是用C/C++在Node.js运行环境中实现的。
* global：JavaScript有且仅有一个全局对象，在浏览器中，叫window对象。而在Node.js环境中，也有唯一的全局对象，但不叫window，而叫global，这个对象的属性和方法也和浏览器环境的window不同。
* process也是Node.js提供的一个对象，它代表当前Node.js进程。
  * JavaScript程序是由事件驱动执行的单线程模型，Node.js也不例外。如果我们想要在下一次事件响应中执行代码，可以调用process.nextTick()
  * Node.js进程本身的事件就由process对象来处理。如果我们响应exit事件，就可以在程序即将退出时执行某个回调函数
* fs
  * Node.js内置的fs模块就是文件系统模块，负责读写文件。
  * fs.readFile
  * fs.writeFile
  * fs.stat：获取文件大小，创建时间等信息
* stream
* http：Node.js开发的目的就是为了用JavaScript编写Web服务器程序。
  * 要开发HTTP服务器程序，从头处理TCP连接，解析HTTP是不现实的。这些工作实际上已经由Node.js自带的http模块完成了。应用程序并不直接和HTTP协议打交道，而是操作http模块提供的request和response对象。
  * 文件服务器：我们可以设定一个目录，然后让Web程序变成一个文件服务器。要实现这一点，我们只需要解析request.url中的路径，然后在本地找到对应的文件，把文件内容发送出去就可以了
  * 解析URL需要用到Node.js提供的url模块，它使用起来非常简单，通过parse()将一个字符串解析为一个Url对象
  * 处理本地文件目录需要使用Node.js提供的path模块，它可以方便地构造目录
    * path.resolve('.') 当前目录
    * path.join 组合路径
* crypto
  * 目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。
  * crypto.createHash('md5') md5可以换成其他hash算法

> Node.js标准的回调函数：第一个参数代表错误信息，第二个参数代表结果。

file-server.js
```js
'use strict';

var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

// 创建服务器:
var server = http.createServer(function (request, response) {
    // 获得URL的path，类似 '/css/bootstrap.css':
    var pathname = url.parse(request.url).pathname;
    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filepath = path.join(root, pathname);
    // 获取文件状态:
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在:
            console.log('200 ' + request.url);
            // 发送200响应:
            response.writeHead(200);
            // 将文件流导向response: 没有必要手动读取文件内容。由于response对象本身是一个Writable Stream，直接用pipe()方法就实现了自动读取文件内容并输出到HTTP响应。
            fs.createReadStream(filepath).pipe(response);
        } else {
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);
```

### web开发
在Node.js诞生后的短短几年里，出现了无数种Web框架、ORM框架、模版引擎、测试框架、自动化构建工具，数量之多，即使是JavaScript老司机，也不免眼花缭乱。
* 常见的Web框架包括：Express，Sails.js，koa，Meteor，DerbyJS，Total.js，restify……
* ORM框架比Web框架要少一些：Sequelize，ORM2，Bookshelf.js，Objection.js……
* 模版引擎PK：Jade，EJS，Swig，Nunjucks，doT.js……
* 测试框架包括：Mocha，Expresso，Unit.js，Karma……
* 构建工具有：Grunt，Gulp，Webpack……

#### koa
koa是Express的下一代基于Node.js的web框架，目前有1.x和2.0两个版本。

历史
* Express
  * Express是第一代最流行的web框架，它对Node.js的http进行了封装
  * 基于ES5的语法，要实现异步代码，只有一个方法：回调。
* koa 1.0
  * 随着新版Node.js开始支持ES6，Express的团队又基于ES6的generator重新编写了下一代web框架koa。
  * koa 1.0使用generator实现异步
* koa2
  * 基于ES7开发了koa2
  * koa2完全使用Promise并配合async来实现异步
  * 出于兼容性考虑，目前koa2仍支持generator的写法，但下一个版本将会去掉。

基础
* 理解use，参数ctx是由koa传入的封装了request和response的变量，我们可以通过它访问request和response，next是koa传入的将要处理的下一个异步函数。
* 理解中间件概念，其实和express类似
  * 每收到一个http请求，koa就会调用通过app.use()注册的async函数，并传入ctx和next参数。
  * 用await next()来调用下一个async函数
  * middleware的顺序很重要

koa-router
* const router = require('koa-router')();
* get/post/
* app.use(router.routes());

用post请求处理URL时，我们会遇到一个问题：post请求通常会发送一个表单，或者JSON，它作为request的body发送，但无论是Node.js提供的原始request对象，还是koa提供的request对象，都不提供解析request的body的功能！

我们又需要引入另一个middleware来解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中。koa-bodyparser就是用来干这个活的。

重构
* 所有的URL处理函数都放到app.js里显得很乱，而且，每加一个URL，就需要修改app.js。随着URL越来越多，app.js就会越来越长。
* 如果能把URL处理函数集中到某个js文件，或者某几个js文件中就好了，然后让app.js自动导入所有处理URL的函数。这样，代码一分离，逻辑就显得清楚了。
  * 分离到几个文件中，操作比较简单，但是自动实现导入才是关键，但是注册路径和处理函数的代码其实都是一样的逻辑
  * 将路由处理集中到一个文件夹中，每个js文件按照{path:handle}的规则导出
  * 使用fs模块自动扫描文件夹，require导出，开循环注册即可

> 其实代码并不复杂，佩服的是作者思考代码重构能力和习惯

nunjucks：模版引擎

JavaScript的模板字符串可以实现模板功能，那为什么我们还需要另外的模板引擎？
* JavaScript的模板字符串必须写在JavaScript代码
* 转义：对特殊字符要转义，避免受到XSS攻击。
* 格式化：对不同类型的变量要格式
* 简单逻辑：条件判断、循环等功能

Nunjucks模板引擎最强大的功能在于模板的继承。

性能
* 对于模板渲染本身来说，速度是非常非常快的，因为就是拼字符串嘛，纯CPU操作。
* 性能问题主要出现在从文件读取模板内容这一步。这是一个IO操作，在Node.js环境中，我们知道，单线程的JavaScript最不能忍受的就是同步IO，但Nunjucks默认就使用同步IO读取模板文件。
* 好消息是Nunjucks会缓存已读取的文件内容，也就是说，模板文件最多读取一次，就会放在内存中，后面的请求是不会再次读取文件的，只要我们指定了noCache: false这个参数。
* 在开发环境下，可以关闭cache，这样每次重新加载模板，便于实时修改模板。在生产环境下，一定要打开cache，这样就不会有性能问题。

编写静态文件中间件

编写模版中间件

注意：生产环境上必须配置环境变量NODE_ENV = 'production'，而开发环境不需要配置，实际上NODE_ENV可能是undefined，所以判断的时候，不要用NODE_ENV === 'development'。

我们在使用上面编写的处理静态文件的middleware时，也可以根据环境变量判断：
```js
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}
```

这是因为在生产环境下，静态文件是由部署在最前面的反向代理服务器（如Nginx）处理的，Node程序不需要处理静态文件。而在开发环境下，我们希望koa能顺带处理静态文件，否则，就必须手动配置一个反向代理服务器，这样会导致开发环境非常复杂。

#### mysql
为什么需要数据库呢？
1. 程序运行的时候，数据都是在内存中的。当程序终止的时候，通常都需要将数据保存到磁盘上，无论是保存到本地磁盘，还是通过网络保存到服务器上，最终都会将数据写入磁盘文件。
2. 自己定义存储格式文本
  * 存储和读取需要自己实现
  * 不能做快速查询，只有把数据全部读到内存中才能自己遍历，但有时候数据的大小远远超过了内存，根本无法全部读入内存
  * 为了便于程序保存和读取数据，且能直接通过条件快速查询到指定的数据，就出现了数据库（Database）这种专门用于集中存储和查询的软件

既然我们要使用关系数据库，就必须选择一个关系数据库。目前广泛使用的关系数据库也就这么几种：
* Oracle，典型的高富帅；
* SQL Server，微软自家产品，Windows定制专款；
* DB2，IBM的产品，听起来挺高端；
* Sybase，曾经跟微软是好基友，后来关系破裂，现在家境惨淡。

这些数据库都是不开源而且付费的，最大的好处是花了钱出了问题可以找厂家解决，不过在Web的世界里，常常需要部署成千上万的数据库服务器，当然不能把大把大把的银子扔给厂家，所以，无论是Google、Facebook，还是国内的BAT，无一例外都选择了免费的开源数据库：
* MySQL，大家都在用，一般错不了；
* PostgreSQL，学术气息有点重，其实挺不错，但知名度没有MySQL高；
* sqlite，嵌入式数据库，适合桌面和移动应用。

> 因为MySQL普及率最高，出了错，可以很容易找到解决方法。而且，围绕MySQL有一大堆监控和运维的工具，安装和使用很方便。

访问MySQL
* 访问MySQL数据库只有一种方法，就是通过网络发送SQL命令，然后，MySQL服务器执行后返回结果。
* 对于Node.js程序，访问MySQL也是通过网络发送SQL命令给MySQL服务器。这个访问MySQL服务器的软件包通常称为MySQL驱动程序。
* 不同的编程语言需要实现自己的驱动，MySQL官方提供了Java、.Net、Python、Node.js、C++和C的驱动程序，官方的Node.js驱动目前仅支持5.7以上版本
* 目前使用最广泛的MySQL Node.js驱动程序是开源的mysql，可以直接使用npm安装。

ORM
* 如果直接使用mysql包提供的接口，我们编写的代码就比较底层
* Object-Relational Mapping，把关系数据库的表结构映射到对象上。
* 我们选择Node的ORM框架Sequelize来操作数据库。这样，我们读写的都是JavaScript对象，Sequelize帮我们把对象变成数据库中的行。
* 因为Sequelize返回的对象是Promise，所以我们可以用then()和catch()分别异步响应成功和失败。可以用ES7的await来调用任何一个Promise对象来简化代码

> 只要API返回Promise，就可以用await调用，写代码就非常简单！

基本使用
* 创建sequelize对象：new Sequelize
* 定义模型：sequelize.define
  * 用sequelize.define()定义Model时，传入名称pet，默认的表名就是pets
  * 第二个参数指定列名和数据类型，如果是主键，需要更详细地指定。
  * 第三个参数是额外的配置，我们传入{ timestamps: false }是为了关闭Sequelize的自动添加timestamp的功能。
* create
* findAll
* save
* destroy

一个大型Web App通常都有几十个映射表，一个映射表就是一个Model。如果按照各自喜好，那业务代码就不好写。Model不统一，很多代码也无法复用。

所以我们需要一个统一的模型，强迫所有Model都遵守同一个规范，这样不但实现简单，而且容易统一风格。

建立Model
* 首先要定义的就是Model存放的文件夹必须在models内，并且以Model名字命名，例如：Pet.js，User.js等等。
* 统一主键，名称必须是id，类型必须是STRING(50)；
* 主键可以自己指定，也可以由框架自动生成（如果为null或undefined）；
* 所有字段默认为NOT NULL，除非显式指定；
* 统一timestamp机制，每个Model必须有createdAt、updatedAt和version，分别记录创建时间、修改时间和版本号。其中，createdAt和updatedAt以BIGINT存储时间戳，最大的好处是无需处理时区，排序方便。version每次修改时自增。

所以，我们不要直接使用Sequelize的API，而是通过db.js间接地定义Model。就是为了强制实现上述规则。

数据库配置
* config-default.js：存储默认的配置；
* config-override.js：存储特定的配置；比如线上配置
* config-test.js：存储用于测试的配置。测试环境配置

> 开发环境下，团队统一使用默认的配置，并且无需config-override.js。部署到服务器时，由运维团队配置好config-override.js，以覆盖config-override.js的默认设置。测试环境下，本地和CI服务器统一使用config-test.js，测试数据库可以反复清空，不会影响开发。

> 配置文件表面上写起来很容易，但是，既要保证开发效率，又要避免服务器配置文件泄漏，还要能方便地执行测试，就需要一开始搭建出好的结构，才能提升工程能力。

注意到我们其实不需要创建表的SQL，因为Sequelize提供了一个sync()方法，可以自动创建数据库。这个功能在开发和生产环境中没有什么用，但是在测试环境中非常有用。测试时，我们可以用sync()方法自动创建出表结构，而不是自己维护SQL脚本。这样，可以随时修改Model的定义，并立刻运行测试。开发环境下，首次使用sync()也可以自动创建出表结构，避免了手动运行SQL的问题。

### 测试驱动开发
* 单元测试是用来对一个模块、一个函数或者一个类来进行正确性检验的测试工作。
* 单元测试通过后有什么意义呢？如果我们对abs()函数代码做了修改，只需要再跑一遍单元测试，如果通过，说明我们的修改不会对abs()函数原有的行为造成影响，如果测试不通过，说明我们的修改与原有行为不一致，要么修改代码，要么修改测试。
* 这种以测试为驱动的开发模式最大的好处就是确保一个程序模块的行为符合我们设计的测试用例。在将来修改的时候，可以极大程度地保证该模块行为仍然是正确的。

mocha
* mocha是JavaScript的一种单元测试框架，既可以在浏览器环境下运行，也可以在Node.js环境下运行。
* 使用mocha，我们就只需要专注于编写单元测试本身，然后，让mocha去自动运行所有的测试，并给出测试结果。

mocha的特点主要有：
* 既可以测试简单的JavaScript函数，又可以测试异步代码，因为异步是JavaScript的特性之一；
* 可以自动运行所有测试，也可以只运行特定的测试；
* 可以支持before、after、beforeEach和afterEach来编写初始化代码。

使用Node.js提供的assert模块进行断言
* assert模块非常简单，它断言一个表达式为true。如果断言失败，就抛出Error。
* 单独写一个test.js的缺点是没法自动运行测试，而且，如果第一个assert报错，后面的测试也执行不了了。
* 如果有很多测试需要运行，就必须把这些测试全部组织起来，然后统一执行，并且得到执行结果。这就是我们为什么要用mocha来编写并运行测试。

mocha
* mocha默认会执行test目录下的所有测试，不要去改变默认目录。
* mocha默认的BDD-style的测试。describe可以任意嵌套，以便把相关测试看成一组测试。
* 每个it("name", function() {...})就代表一个测试

> 编写测试的原则是，一次只测一种情况，且测试代码要非常简单。我们编写多个测试来分别测试不同的输入，并使用assert判断输出是否是我们所期望的。

运行测试
* 方法一，可以打开命令提示符，执行命令：node_modules\mocha\bin\mocha
* 方法二，我们在package.json中添加npm命令："test": "mocha"
* 方法三，我们在VS Code中创建配置文件.vscode/launch.json

在测试前初始化资源，测试后释放资源是非常常见的。mocha提供了before、after、beforeEach和afterEach来实现这些功能。

用mocha测试一个函数是非常简单的，但是，在JavaScript的世界中，更多的时候，我们编写的是异步代码，所以，我们需要用mocha测试异步函数。
* 如果要测试异步函数，我们要传入的函数需要带一个参数，通常命名为done
* 测试异步函数需要在函数内部手动调用done()表示测试成功，done(err)表示测试出错。
* 用try...catch太麻烦。还有一种更简单的写法，就是直接把async函数当成同步函数来测试

http测试
* 在测试前启动koa的app，然后运行async测试，在测试代码中发送http请求，收到响应后检查结果，这样，一个基于http接口的测试就可以自动运行。
* 利用mocha的异步测试，配合supertest，我们可以用简单的代码编写端到端的HTTP自动化测试。
* 利用supertest提供的expect()更方便地断言响应的HTTP代码、返回内容和HTTP头。断言HTTP头时可用使用正则表达式。

### WebSocket
WebSocket是HTML5新增的协议，它的目的是在浏览器和服务器之间建立一个不受限的双向通信的通道，比如说，服务器可以在任意时刻发送消息给浏览器。

轮询是指浏览器通过JavaScript启动一个定时器，然后以固定的间隔给服务器发请求，询问服务器有没有新消息。这个机制的缺点一是实时性不够，二是频繁的请求会给服务器带来极大的压力。

Comet本质上也是轮询，但是在没有消息的情况下，服务器先拖一段时间，等到有消息了再回复。这个机制暂时地解决了实时性问题，但是它带来了新的问题：以多线程模式运行的服务器会让大部分线程大部分时间都处于挂起状态，极大地浪费服务器资源。另外，一个HTTP连接在长时间没有数据传输的情况下，链路上的任何一个网关都可能关闭这个连接，而网关是我们不可控的，这就要求Comet连接必须定期发一些ping数据表示连接“正常工作”。

WebSocket协议
* WebSocket并不是全新的协议，而是利用了HTTP协议来建立连接。WebSocket连接必须由浏览器发起，因为请求协议是一个标准的HTTP请求
  * GET请求的地址不是类似/path/，而是以ws://开头的地址；
  * 请求头Upgrade: websocket和Connection: Upgrade表示这个连接将要被转换为WebSocket连接；
  * Sec-WebSocket-Key是用于标识这个连接，并非用于加密数据；
  * Sec-WebSocket-Version指定了WebSocket的协议版本。
* 服务器如果接受该请求，就会返回如下响应
  * 响应代码101表示本次连接的HTTP协议即将被更改，更改后的协议就是Upgrade: websocket指定的WebSocket协议。
  * 版本号和子协议规定了双方能理解的数据格式，以及是否支持压缩等等

> 为什么WebSocket连接可以实现全双工通信而HTTP连接不行呢？实际上HTTP协议是建立在TCP协议之上的，TCP协议本身就实现了全双工通信，但是HTTP协议的请求－应答机制限制了全双工通信。WebSocket连接建立以后，其实只是简单规定了一下：接下来，咱们通信就不使用HTTP协议了，直接互相发数据吧。

安全的WebSocket连接机制和HTTPS类似。首先，浏览器用wss://xxx创建WebSocket连接时，会先通过HTTPS创建安全的连接，然后，该HTTPS连接升级为WebSocket连接，底层通信走的仍然是安全的SSL/TLS协议。