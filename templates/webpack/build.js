const { merge } = require('webpack-merge')
const common = require('./common.js')


module.exports = merge(common, {
    mode: 'production',
    // plugins : [
    //     new webpack.DefinePlugin({ // 定义变量和值
    //         "BUILD_ENV": JSON.stringify('production') 
    //     })
    // ],
})