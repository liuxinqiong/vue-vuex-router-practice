Vscode vue文件没有语法高亮，安装vetur扩展即可。

Vscode 格式化vue Template代码段
1. 安装 vetur
2. 在User Setting中增加设置:
```shell
"vetur.format.defaultFormatter.html": "js-beautify-html"
```

经验证上述代码无效，折腾了好久，找到一个可行方案
1. 安装扩展beautify
2. 配置
```json
"beautify.language": {
    "js": {
        "type": [
            "javascript",
            "json"
        ],
        "filename": [
            ".jshintrc",
            ".jsbeautify"
        ]
    },
    "css": [
        "css",
        "scss"
    ],
    "html": [
        "htm",
        "html",
        "vue" //在这里加上vue
    ]
}
```

vscode 安装 vetur 之后强制双引号和自动添加分号，个人并不喜欢
* 安装 prettier
* 设置
```shell
"prettier.singleQuote": true,
"prettier.semi": false
```