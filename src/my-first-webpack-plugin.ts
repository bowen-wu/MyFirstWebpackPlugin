// A JavaScript class.
class MyFirstWebpackPlugin {
    // Define `apply` as its prototype method which is supplied with compiler as its argument
    apply(compiler) {
        // 指定一个挂载到 webpack 自身的事件钩子。
        // 设置回调来访问 compilation 对象：
        // compilation对象 => 处理 webpack 内部实例的特定数据。
        compiler.hooks.emit.tapAsync(
            'MyFirstWebpackPlugin',
            (compilation, callback) => {
                console.log('This is my first webpack plugin!');
                console.log(
                    'Here’s the `compilation` object which represents a single build of assets:',
                    compilation
                );

                callback();
            }
        );
    }
}

// module.exports = MyFirstWebpackPlugin;
