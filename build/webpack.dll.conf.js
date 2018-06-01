var path = require('path')
var webpack = require('webpack')

/**
 * 单独运行此文件 webpack build/webpack.dll.conf.js 生成json文件
 * 在prod打包中，通过DllReferencePlugin引用
 */
module.exports = {
    entry: {
        vue: ['vue', 'vue-router', 'vuex'],
        ui: ['element-ui']
    },
    output: {
        // 此时不能在输出在dist下，因为每次重新打包，dist都会被删除
        path: path.join(__dirname, '../src/dll'),
        filename: '[name].dll.js',
        // 本质在打包第三方库，定义引用这个库的使用方式。如果不写，相当于产生全局变量
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            // map放在什么位置
            path: path.join(__dirname, '../src/dll', '[name]-manifest.json'),
            name: '[name]'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}