const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin= require('terser-webpack-plugin');
const path = require('path');
const lessModuleRegex = /\.module\.less$/;


module.exports = {
    entry: { 
        index: path.resolve(__dirname, '../src/index') // 入口起点
    },
    output: {
        filename: 'js/[name]_[chunkhash:8].js',  // js文件输出路径和文件名
        chunkFilename: "js/[name]_[chunkhash:8].chunk.js",  // 异步/懒加载等按需加载模块输出路径和文件名
        path: path.resolve(__dirname, '../build'), // 打包文件输出路径
        publicPath: "/", // 该配置能帮助你为项目中的所有资源指定一个基础路径，静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径
        clean: true, // 每次build清空旧文件
    },
    target: 'web', // 默认是 'web'，可省略。因为服务器node和浏览器web代码都可以用 JavaScript 编写，所以 webpack 提供了多种构建目标
    stats: "errors-warnings", // 打印输出统计信息
    resolve: { // 配置模块如何解析。
      extensions: ['.ts', '.tsx', '.js', '.jsx'], // 自动解析确定的扩展，能够使用户在引入模块时不带扩展名
      alias: { // 创建 import 或 require 的别名，来确保模块引入路径变得更简单
        '@Utils': path.resolve(__dirname, 'src/utils/'),
      },
    },
    module: { // 决定了如何处理项目中的不同类型的模块。
        rules: [
            {
                test: /\.[jt]sx?$/, // 正则匹配相关模块
                exclude: /node_modules/, // 排除node_modules中的文件
                loader: 'babel-loader', // 用该loader处理文件
            },
            {
                test: /\.(le|c)ss$/,
                exclude: lessModuleRegex,
                use: [ // 可以用多个loader串联处理，注意顺序从后往前
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            }
                        }
                    },
                ],
            },
            {
              test: lessModuleRegex, // 支持styles样式引入
              use: [
                MiniCssExtractPlugin.loader,
                { loader: 'css-loader', options: { modules: { localIdentName: '[local]__[name]--[hash:base64:5]' } } },
                {
                  loader: 'less-loader',
                },
              ],
            },
            // {
            //     test: /\.svg/,
            //     use: ['file-loader']
            // },
            {
                test: /\.(jpe?g|png|svg|gif|webp)$/,
                type: 'asset',
                generator: {
                    filename: 'images/[hash][ext][query]', // 局部指定输出位置
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 转base64限制于 8kb，超过则不转
                    }
                }
            }
        ],
    },
    plugins: [ // 插件
        new ProgressBarPlugin(), // 打包过程进度条插件
        new HtmlWebpackPlugin({
            template: './public/index.html', // 指定打包入口模板文件（相对于项目根目录）
            filename: 'index.html', // 指定输出文件名和位置（相对于输出目录）
            favicon: path.resolve('./public/favicon.ico'),
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[chunkhash:8].css',
        }),
    ],
    optimization: { // 优化
        minimizer: [ // 文件最小化配置
            new TerserPlugin({
                extractComments: false, //不提取注释到单独文件
            })
        ],
        splitChunks: { // 用来指定哪类 chunk 需要做拆包优化
            // chunks: 'all', // 所有chunks， 可以在异步和非异步 chunk 之间共享
            // minSize: 0,
            // name: 'vendor',
        }
    },
    // externals: [ // 不需要打包的模块配置，提供了「从输出的 bundle 中排除依赖」的方法。防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)
    //   {
    //     'react': 'React', // 因为react这个模块不会被打包，react 的值将被用来检索一个全局的 window.React 变量。换句话说，当设置为一个字符串时，它将被视为全局的（定义在上面和下面）
    //     'react-dom': 'ReactDOM',
    //     'react-router-dom': 'ReactRouterDOM',
    //     'lodash': 'LODASH',
    //     '@eigen/microAppSDK': 'AMASDK',
    //     'axios': 'AXIOS',
    //     'antd': 'antd',
    //   }
    // ]
};