function MyFirstWebpackPlugin(options) {
}

MyFirstWebpackPlugin.prototype.apply = function (compiler) {
    // 指定一个挂载到 webpack 自身的事件钩子。
    // 设置回调来访问 compilation 对象：
    // compilation对象 => 处理 webpack 内部实例的特定数据。
    compiler.plugin('emit', function (compilation, callback) {

        // 现在，设置回调来访问 compilation 中的步骤：
        compilation.plugin('optimize', function () {
            console.log('Assets are being optimized.');
        });

        // 功能完成后调用 webpack 提供的回调。
        callback();
    });
};

module.exports = MyFirstWebpackPlugin;
