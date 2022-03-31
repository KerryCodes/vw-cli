const { merge } = require('webpack-merge');
const common = require('./common.js');
const path = require('path');


module.exports = merge(common, {
    mode: 'development', //会将 process.env.NODE_ENV 的值设为 production, 告知 webpack 使用相应模式的内置优化。
    devtool: 'eval-source-map', //控制是否以及如何生成 source map
    devServer: { // 本地开发服务器配置
        hot: true, //热更新
        open: true, //编译完自动打开浏览器
        compress: true, //开启gzip压缩
        host: 'localhost',
        port: 3000, //开启端口号
        historyApiFallback: true, // historyApiFallback是开发中一个非常常见的属性，它主要的作用是解决SPA页面在history路由模式下，进行路由跳转之后，进行页面刷新 时，返回404的错误。因为在SPA中的路由是前端路由，直接刷新的时候，后台是不存在对应路由的，因此会报404错误。 当使用HTML5历史API时，所有的404请求都响应index.html的内容。 将devServer.historyApiFallback设为true开启
        static: { //托管静态资源文件
          directory: path.join(__dirname, "../public"),
        },
        client: {
          progress: true, //在浏览器端打印编译进度
        },
        // proxy: { //代理
        //     "/api": "http://localhost:5050"
        // },
    },
});