// A JavaScript class.
class MyFirstWebpackPlugin {
    static defaultOptions = {
        outputFile: 'assets.md'
    };

    options;
    name = 'MyFirstWebpackPlugin';

    // Any options should be passed in the constructor of your plugin,
    // (this is a public API of your plugin).
    constructor(options = {}) {
        // Applying user-specified options over the default options
        // and making merged options further available to the plugin methods.
        // You should probably validate all the options here as well.
        this.options = { ...MyFirstWebpackPlugin.defaultOptions, ...options };
    }

    // Define `apply` as its prototype method which is supplied with compiler as its argument
    apply(compiler) {
        const pluginName = MyFirstWebpackPlugin.name;

        // webpack module instance can be accessed from the compiler object,
        // this ensures that correct version of the module is used
        // (do not require/import the webpack or any symbols from it directly).
        const { webpack } = compiler;

        // Compilation object gives us reference to some useful constants.
        const { Compilation } = webpack;

        compiler.hooks.environment.tap('MyFirstWebpackPlugin,', (a, b) => {
            console.log('---------- environment stage ------------');
            // 查看 a b 的值 => undefined
            debugger;
        });

        compiler.hooks.afterEnvironment.tap('MyFirstWebpackPlugin,', (a, b) => {
            console.log('---------- afterEnvironment stage ------------');
            // 查看 a b 的值 => undefined
            debugger;
        });

        compiler.hooks.entryOption.tap('MyFirstWebpackPlugin,', (context, entry) => {
            console.log('---------- entryOption stage ------------');
            // 查看 context, entry 的值 =>
            // context => 项目全路径 => /<path>/front-end/webpack/test-my-first-webpack-plugin
            // entry: {main: {import: ['./src/index.js']}}
            debugger;
        });

        compiler.hooks.afterPlugins.tap('MyFirstWebpackPlugin,', (compiler) => {
            console.log('---------- afterPlugins stage ------------');
            // 查看 compiler 的值 => Compiler 实例
            debugger;
        });

        compiler.hooks.afterResolvers.tap('MyFirstWebpackPlugin,', (compiler) => {
            console.log('---------- afterResolvers stage ------------');
            // 查看 compiler 的值 => Compiler 实例
            debugger;
        });

        compiler.hooks.initialize.tap('MyFirstWebpackPlugin,', (a, b) => {
            console.log('---------- initialize stage ------------');
            // 查看 a b 的值 => undefined
            debugger;
        });

        compiler.hooks.beforeRun.tap('MyFirstWebpackPlugin,', (compiler) => {
            console.log('---------- beforeRun stage ------------');
            // 查看 compiler 的值 => Compiler 实例
            debugger;
        });

        compiler.hooks.run.tap('MyFirstWebpackPlugin,', (compiler, b) => {
            console.log('---------- run stage ------------');
            // 查看 compiler 的值 => Compiler 实例
            // b => undefined
            debugger;
        });

        compiler.hooks.normalModuleFactory.tap('MyFirstWebpackPlugin,', (normalModuleFactory) => {
            console.log('---------- normalModuleFactory stage ------------');
            // 查看 normalModuleFactory 的值 => NormalModuleFactory 实例
            debugger;
        });

        compiler.hooks.contextModuleFactory.tap('MyFirstWebpackPlugin,', (contextModuleFactory) => {
            console.log('---------- contextModuleFactory stage ------------');
            // 查看 contextModuleFactory 值 => ContextModuleFactory 实例
            debugger;
        });

        compiler.hooks.beforeCompile.tap('MyFirstWebpackPlugin,', (params) => {
            console.log('---------- beforeCompile stage ------------');
            // 查看 params 值 => NormalModuleFactory 实例 + ContextModuleFactory 实例
            debugger;
        });

        compiler.hooks.compile.tap('MyFirstWebpackPlugin,', (params) => {
            console.log('---------- compile stage ------------');
            // 查看 params 值 => NormalModuleFactory 实例 + ContextModuleFactory 实例
            debugger;
        });

        compiler.hooks.thisCompilation.tap('MyFirstWebpackPlugin,', (compilation, params) => {
            console.log('---------- thisCompilation stage ------------');
            // check compilation => Compilation 实例
            // 查看 params 值 => NormalModuleFactory 实例 + ContextModuleFactory 实例
            debugger;
        });

        compiler.hooks.compilation.tap('MyFirstWebpackPlugin,', (compilation, params) => {
            console.log('---------- compilation stage ------------');
            // check compilation => Compilation 实例
            // 查看 params 值 => NormalModuleFactory 实例 + ContextModuleFactory 实例
            debugger;
        });

        compiler.hooks.make.tap('MyFirstWebpackPlugin,', (compilation, callback) => {
            console.log('---------- make stage ------------');
            // check compilation => Compilation 实例
            // 查看 callback 值 => undefined
            debugger;
            this.subscribeCompilationHook(compilation, Compilation, pluginName);
        });

        // 指定一个挂载到 webpack 自身的事件钩子。
        // 设置回调来访问 compilation 对象：
        // compilation对象 => 处理 webpack 内部实例的特定数据。
        compiler.hooks.emit.tapAsync(
            'MyFirstWebpackPlugin',
            (compilation, callback) => {
                console.log('This is my first webpack plugin!');

                callback();
            }
        );

        // RawSource is one of the "sources" classes that should be used
        // to represent asset sources in compilation.
        const { RawSource } = webpack.sources;

        // Tapping to the "thisCompilation" hook in order to further tap
        // to the compilation process on an earlier stage.
        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            // Tapping to the assets processing pipeline on a specific stage.
            compilation.hooks.processAssets.tap(
                {
                    name: pluginName,

                    // Using one of the later asset processing stages to ensure
                    // that all assets were already added to the compilation by other plugins.
                    stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
                },
                (assets) => {
                    // "assets" is an object that contains all assets
                    // in the compilation, the keys of the object are pathnames of the assets
                    // and the values are file sources.

                    // Iterating over all the assets and
                    // generating content for our Markdown file.
                    const content =
                        '# In this build:\n\n' +
                        Object.keys(assets)
                            .map((filename) => `- ${filename}`)
                            .join('\n');

                    // Adding new asset to the compilation, so it would be automatically
                    // generated by the webpack in the output directory.
                    compilation.emitAsset(
                        this.options.outputFile,
                        new RawSource(content)
                    );
                }
            );
        });
    }

    private subscribeCompilationHook(compilation, Compilation, pluginName) {
        compilation.hooks.addEntry.tap({
            name: pluginName,
            stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
        }, (entry, options) => {
            console.log('---------- Compilation addEntry stage ------------');
            debugger;
        });

        compilation.hooks.succeedEntry.tap({
            name: pluginName,
            stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
        }, (entry, options, module) => {
            // entry => 入口
            // options => {name: "main"}
            // module => undefined
            console.log('---------- Compilation succeedEntry stage ------------');
            debugger;
        });

        compilation.hooks.finishModules.tap({
            name: pluginName,
            stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
        }, (modules) => {
            // modules => module chain => ???
            console.log('---------- Compilation finishModules stage ------------');
            debugger;
        });


    }
}

export { MyFirstWebpackPlugin };
