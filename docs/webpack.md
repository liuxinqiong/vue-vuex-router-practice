# 模块化时代
限制
* 浏览器对资源加载有同源策略限制，也不支持编程化加载资源。
* 大部分加载器选择通过`<script>`标签加载，然后通过各种hack判断是否加载完成。

发展
* require.js将AMD发扬光大，成为AMD事实标准。
* Common.js / CMD

# webpack 入门
与require.js / sea.js不同，webpack是一个在开发阶段进行打包的模块化工具，也就是说它无法不经过打包直接在线上使用。

webpack同时兼容AMD、Common.js以及非模块化的写法。注意这里的同时兼容可不是指你可以任选一种，你可以同时用三种！

webpack之所以好用，正是因为有诸如此类超出预期的特性，有可能你不需要，但如果你想要的时候就会爽得不要不要的。

入口文件
* 入口文件就是在HTML直接引用的，由浏览器触发执行的JS文件。其它的非入口文件则是由入口文件来直接或间接依赖，由JS互相调用执行。
* 一般而言，我们会将一些逻辑提取封装后放到独立的文件中，最后由入口文件引入来调用它们提供的方法完成整个程序逻辑。也就是一般入口文件关注整体流程，而非入口文件关注公共某一部分的实现。

### 打包文件分析
假设我们将一个仅有1行代码的js用webpack打包，查看打包后的文件，你会发现文件变大很多。其实主要分为两部分
1. 函数定义，也就是官方文档中提到的Runtime，作用是保证模块的顺利加载和运行。
2. 自定义的JS文件，不过被包裹在一个函数中，也就是模块

值得注意的是第20行，使用了.call，第一个参数是module.exports，这就导致模块的包裹函数的作用域中的this指向了module.exports。这会带来两个后果：
1. 模块中无法使用this指代全局变量（浏览器中就是window）
2. 模块中可以使用this.xxx来指定模块包含的成员，类似Common.js中exports.xxx的方式（感觉我们找到了除AMD/Common.js之外的另一种模块化规范，不过因为webpack官方并没有强调这个，我们也只是代过。）
3. 影响
  * 模块不是暴露在全局作用域下了。也即通过var xxx的方式定义的xxx变量不再挂在全局对象下。这可能是在非模块化的代码迁移到webpack中碰到的最大的问题，需要手工将var xxx的定义方式改为window.xxx。
  * 由于模块源码是采用非模块化的方案编写的，因此没有通过AMD的return或者CommonJS的exports或者this导出模块本身，这会导致模块被引入的时候只能执行代码而无法将模块引入后赋值给其它模块使用。

> 为何webpack能同时使用多种模块化（及非模块化）方案的模块而传统的require.js / sea.js之类的方案则不行？这是因为webpack对模块的处理是在编译阶段，针对每一个模块都可以针对性地分析，然后对不同方案加以不同的包裹方案，最后生成可供浏览器运行的代码。而require.js之类的方案必须保证在运行时阶段能正确地引入模块并运行。

多模块依赖
* 发现模块列表数组有了多个模块
* 模块紧挨着的数字注释是，表示模块的索引
* 值得注意的是第40行，`return __webpack_require__(0)`，如果留心的话会发现我们前面的例子中编译出来的这一行全部都是引用写死模块ID 0，也就是说，模块ID为0的永远是入口。

### Node模块
Node使用的模块规范也是CommonJS，所以理想情况下，是可以做到代码在Node和浏览器中复用的。但这里面有几处关键的差异可能导致无法复用：
* Node的模块在运行时会有一个包裹函数，下面详述
* 浏览器并不支持所有的Node模块，因此部分使用了Node API的模块无法在浏览器中运行

不知道大家在写Node模块的时候是否有好奇过，这里的module（以及require / exports / __filename / __dirname）是从哪里来的？因为按照对JS的认知，如果它不是一个局部变量（含函数形参）的话，那么只能是全局变量了。难道这些变量是全局变量？然而当我们打开Node的命令行去访问的时候又明明白白地告诉我们是undefined。

> 按照Node的文档，global.require确实是存在的，还有.cache / .resolve()等成员，但每个模块中使用的require仍然是局部变量，并非全局require。

如果在运行的时候去查看它的话，它会变成这样：
```js
(function (exports, require, module, __filename, __dirname) {
    var me = {};
    module.exports = me;
});
```

可以看到，我们的模块代码在运行的时候是被包裹了一层的，而上面列的这些变量正是在这个包裹函数中作为形参传入的。

其中module指向模块本身，module.exports和exports是等价的，表示模块要导出供调用的内容，`__filename`表示当前模块的文件名，`__dirname`表示当前模块所在路径。

# webpack 进阶

## 使用模式

在进入配置项讲解之前，我们首先看一看webpack为我们提供的使用方式：CLI和API。

### CLI
CLI即Command Line Interface，顾名思义，也就是命令行用户界面。

大部分生产环境下使用时都会需要加上非常多的参数，导致整个命令非常长，既不利于记忆编写，也不利于传播交接等。因此，一般会将配置项写在同目录的webpack.config.js中，然后执行webpack即可，webpack会从该配置文件中读取参数，此时不需要在命令行中传入任何参数。

> 执行时webpack会去寻找当前目录下的webpack.config.js当作配置文件使用，也可以使用 -c 指定配置文件

配置文件webpack.config.js的写法则是：
```
module.exports = {
    // 配置项
};
```

> 值得注意的是，配置文件是一个真正的JS文件，因此配置项只要是一个对象即可，并不要求是JSON。也就意味着你可以使用表达式，也可以进行动态计算，或者甚至使用继承的方式生成配置项。

### API
API则是指将webpack作为Node.js模块使用，例如：
```js
webpack({
    // 配置项
    entry:'main.js',
    ...
},callback);
```

相比CLI模式而言，使用API模式会更加灵活，因为可以与你的各种工具进行集成，甚至共享一些环境变量然后动态生成打包配置等等，在复杂项目中会很有用。

## 基本配置项

### entry 和 output
entry 指定源入口文件

output 指定编译配置，告诉 webpack 打包好的文件存放在哪里，以及怎么命名，filename 指定编译后文件

output.filename除了可以指定具体的文件名以外，还可以使用一些占位符，包括：
* name 模块名称
* hash 模块编译后的（整体）Hash值
* chunkhash 分片的Hash值

使用的方式就是在output.filename的中使用[name].js或者my-[name]-[hash].js之类的，一看就明白。但这三个值具体是从哪里来的呢？

首先，我们一次有可能要打包很多模块，因此会碰到支持多个入口文件（entry）的情况，每一个入口都需要有自己的名字，具体对应entry的写法而言，有如下几种情况：
```js
entry:'./example2.1'
// 或者
entry:['./example2.1','./example2.2']
```

这种情况下，模块是没有名字的，webpack会使用main作为模块名字，因此像下面这种用数组来指定入口的情况，模块名会重复，而此时webpack会将它们的代码合并打包！其实完整如下：
```js
const config = {
  entry: {
    main: './yourpath/file.js'
  }
};
```

另一种是webpack比较推荐的多入口写法：
```js
entry:{
    'example2.1':'example2.1.js',
    'example2.2':'example2.2.js'
}
```

这种写法中，名字和模块文件名一一对应，每个模块都有独立的名字。因此这里的[name]可以理解成模块名字。

事实上，在webpack的文档中，这个name是指“chunk name”，即分片的名字，所谓分片就是指一个入口模块的代码有可能会被分成多个文件，还有一些文件可能是来自模块的公共代码，而不是入口模块。因此这里的[name]并非严格与入口模块一一对应。

了解了这些情况之后，[hash]和[chunkhash]就自然好理解了，一个是指本次打包相关的整体的hash，一个是指分片的hash。

hash 和 chunkhash 的结果是不一样的，hash 两个文件是用同一个 hash 值，官方文档叫作 bundle 的 hash 值，chunkhash 的话两个文件 hash 值是不同的，也就是每一个分片的 hash 都不一样。

output.path
* 有时候我们希望输出的文件不在当前目录（其实大部分时候都是这样），比如源码在src目录，输出的文件在dist目录，此时就需要用到output.path来指定输出路径。
* 如果你的模块是存放在子目录中的，而你又想保持这种目录结构到打包后的dist中
  * 这种情况下，子目录并不能由output.path配置而来，而应该将目录写到模块名上，配置文件变成这样
  * 注意这里的filename一定要包含[name]才行，因为路径信息是带在模块名上的。

output.publicPath：指定前缀

## 分片
随着项目开发过程中越来越大，我们的代码体积也会越来越大，而将所有的脚本都打包到同一个JS文件中显然会带来性能方面的问题（无法并发，首次加载时间过长等）。

> 值得注意的是，webpack对代码拆分的定位仅仅是为了解决文件过大，无法并发加载，加载时间过长等问题，并不包括公共代码提取和复用的功能。对公共代码的提取将由CommonChunks插件来完成。

要使用webpack的分片功能，首先需要定义“分割点”，即代码从哪里分割成两个文件。

分割点表示代码在此处被分割成两个独立的文件。具体的方式有两种。
* 使用require.ensure
* 使用AMD的动态require

> 分片只是分片，并没有自动提取公共模块的作用。

## CommonChunks插件
插件的目的在于解决loader解决不了的事情，使用插件指定plugins选项即可，需要注意的使用插件需要引入插件。

Common Chunks 插件的作用就是提取代码中的公共模块，然后将公共模块打包到一个独立的文件中去，以便在其它的入口和模块中使用。
```js
var webpack = require('webpack');

module.exports = {
    entry:{
        main1:'./main',
        main2:'./main.2'
    },
    output:{
        filename:'bundle.[name].js'
    },
    plugins: [
        new  webpack.optimize.CommonsChunkPlugin('common.js', ['main1', 'main2'])
    ]
};
```
参数common.js表示公共模块的文件名，后面的数组元素与entry一一对应，表示要提取这些模块中的公共模块。

# loader
Loader可以在加载模块时预处理文件，类似于gulp中的task。

loader是webpack中一个重要的概念，它是指用来将一段代码转换成另一段代码的webpack插件。为什么需要将一段代码转换成另一段代码呢？这是因为webpack实际上只能处理JS文件，如果需要使用一些非JS文件（比如Coffee Script），就需要将它转换成JS再require进来。

webpack的每一个loader命名都是xxx-loader，在安装的时候需要将对应的loader装到项目目录下

除了npm安装模块的时候以外，在任何场景下，loader名字都是可以简写的，coffee-loader和coffee是等价的

loader是可以串联使用的，也就是说，一个文件可以先经过A-loader再经过B-loader最后再经过C-loader处理。

loader还可以接受参数，不同的参数可以让loader有不同的行为（前提是loader确实支持不同的行为），具体每个loader支持什么样的参数可以参考loader的文档。参数的指定方式和url很像，要通过?来指定。

loader使用方法
* 在require中显式指定
* 在配置项（webpack.config.js）中指定
* 在命令行中指定

在配置项中指定是最灵活的方式，它的指定方式是这样：
```js
module: {
    // loaders是一个数组，每个元素都用来指定loader
    loaders: [{
        test: /\.jade$/,    //test值为正则表达式，当文件路径匹配时启用
        loader: 'jade',    //指定使用什么loader，可以用字符串，也可以用数组
        exclude: /regexp/, //可以使用exclude来排除一部分文件
        //可以使用query来指定参数，也可以在loader中用和require一样的用法指定参数，如`jade?p1=1`
        query: {
            p1:'1'
        }
    },
    {
        test: /\.css$/,
        loader: 'style!css'    //loader可以和require用法一样串联
    },
    {
        test: /\.css$/,
        loaders: ['style', 'css']    //也可以用数组指定loader
    }]
}
```

新的webpack版本已经发生改变，配置loader需要在module选项下指定对应后缀名相应的rules，使用test正则指定后缀名，使用use指定相应的loader
```js
const config = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  }
};
```

loader本质上做的是一个anything to JS的转换，因此想象空间极大,大致有这样一些用途：
* 其它语言编译到JS，包括JSON、纯文本、coffee、CSS等，也包括比较复杂的整体方案处理，比如vue-loader、polymer-loader等
* “微处理”类，比如为非模块化文件添加一些模块化导入导出代码，对模块细节（代码）微调等，例如exports-loader、expose-loader等
* 校验和压缩类，这一类其实最终并不生成代码，检验类如果报错就阻止构建进行，压缩类只是替换一下图片资源等
* 纯打包类，比如file-loader，将资源文件一并纳入路径管理

## loader | plugin list
你会发现，webpack的使用回到一个很重要的问题，就是哪些loader或plugin能帮助我们解决痛点呢

常用loader
* style-loader和css-loader：允许在js中import css
* url-loader[file-loader]：允许加载图片

常用plugin
* uglifyjs-webpack-plugin：精简输出，混淆，丑化
* clean-webpack-plugin：清除重复的文件
* html-webpack-plugin：自动生成html文件
* 内置DefinePlugin：指定变量


## 其他
source map：源代码被webpack打包之后，会很难追踪到原始的代码的位置，使用source map功能，可以将编译后的代码映射回原始代码位置，指定devtool选项即可

webpack-dev-server
* webpack-dev-server提供了一个简单的web服务器，并能够实时重新加载使用webpack需要先安装 npm i --save-dev webpack-dev-server
* 在配置文件中指定devServer选项，告诉服务器在哪里寻找文件
* 开启热更新很简单，只需要更新webpack-dev-server配置，增加hot选项，同时使用webpack自带的HMR插件
```js
const config = {
  // ....
  devServer: {
    contentBase: './dist',
    hot:true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

webpack-dev-middleware：对更改的文件进行监控，编译, 一般和 webpack-hot-middleware 配合使用，实现热加载功能

生产和开发构建分离
* 生产和开发中的构建肯定是不同，生产中侧重于一个更好的开发体验，而生产环境中则需要更多的性能优化，更小的chunk。webpack可以指定命令运行以来的配置文件，通过在package.json中写入script是一种不错的方式。而生产和开发中的配置肯定有很多重复的地方，使用webpack-merge可以合并通用配置安装
* 写入package.json是一种很棒的方式
```js
  // ......
  "scripts": {
      "start": "webpack-dev-server --open --config webpack.dev.js",
      "build": "webpack --config webpack.prod.js"
    },
  // ......
}
```

许多lib通过与process.env.NODE_ENV环境关联来决定lib中使用哪些内容，使用webpack内置的DefinePlugin可以为所有依赖指定这个变量。

让webpack不打包指定的lib
* 在开发中有些时候我们需要webpack不打包某些lib，这在我们开发lib的时候特别常见
* 使用配置的external选项可以做到

http-proxy-middleware：设置代理

# 资料
* [webpack gitbook](https://webpack.toobug.net/zh-cn/)
* [webpack 入门](https://github.com/huruji/blog/issues/3)
* [不用create-react-app搭建基于webpack的react项目](https://www.chenliqiang.cn/post/webpack-react-without-create-react-app.html)
* [webpack 文档](https://webpack.js.org/concepts/)