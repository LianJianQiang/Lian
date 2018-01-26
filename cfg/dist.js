'use strict';

const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./base');
const defaultSettings = require('./defaults');

const HappyPack = require('happypack');

let config = Object.assign({}, baseConfig, {
    cache: false,
    devtool: 'source-map',
    plugins: defaultSettings.getDefaultPlugins().concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new htmlWebpackPlugin({
            title: '自诊工具',
            hash: true,
            template: defaultSettings.srcPath + '/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new webpack.optimize.UglifyJsPlugin({   // 代码压缩
            sourceMap: true,
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoEmitOnErrorsPlugin()     // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
    ]),
    module: defaultSettings.getDefaultModules()
});

// use happyPack
config.plugins.push(
    new HappyPack({
        id: 'babel',
        loaders: [{
            path: 'babel-loader'
        }],
        threadPool: defaultSettings.happyThreadPool
    })
);

// Add needed loaders to the defaults here
config.module.rules.push({
    test: /\.(js|jsx)$/,
    loader: 'happypack/loader?id=babel',
    include: [path.join(__dirname, '/../app')]
});

module.exports = config;
