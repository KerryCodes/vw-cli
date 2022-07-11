module.exports = {
    presets: [ // babel的presets是用来简化plugins的使用的。
        [
            '@babel/preset-env', // 用于编译 ES6+ 语法.可以根据我们对browserslist的配置，在转码时自动根据我们对转码后代码的目标运行环境的最低版本要求，采用更加“聪明”的转码，如果我们设置的最低版本的环境，已经原生实现了要转码的ES特性，则会直接采用ES标准写法；如果最低版本环境，还不支持要转码的特性，则会自动注入对应的polyfill。
            { 
                targets: {
                    esmodules: true,
                }
            },
        ],
        [
            '@babel/preset-react',
            {
                runtime: 'automatic', // automatic 表示自动导入 JSX 转换而来的函数。 classic 表示不会自动导入任何东西。
            }
        ],
        '@babel/preset-typescript', // 将TS语法转换为JS
    ],
    plugins: [
      // ["@babel/plugin-proposal-decorators", { "legacy": true }],
      // ["@babel/plugin-proposal-class-properties", { "loose" : true }],
    ]
};