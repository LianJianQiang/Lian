'use strict';

const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./base');
const defaultSettings = require('./defaults');

// Add needed plugins here
// const BowerWebpackPlugin = require('bower-webpack-plugin');
const HappyPack = require('happypack');

let config = Object.assign({}, baseConfig, {
    entry:[
        'react-hot-loader/patch',
        defaultSettings.srcPath + '/index.js'
    ],
    cache: true,
    devtool: 'eval',
    plugins: defaultSettings.getDefaultPlugins().concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new htmlWebpackPlugin({
            title: '自诊工具',
            template: defaultSettings.srcPath + '/index.html'
        })
    ]),
    module: defaultSettings.getDefaultModules()
});

// use happyPack
config.plugins.push(
    new HappyPack({
        id: 'react-babel',
        loaders: [{
            path: 'babel-loader',
            query: {
                cacheDirectory: true
            }
        }],
        threadPool: defaultSettings.happyThreadPool
    })
);

// Add needed loaders to the defaults here
config.module.rules.push({
    test: /\.(js|jsx)$/,
    loader: 'happypack/loader?id=react-babel',
    include: [path.join(__dirname, '/../app')]
});

module.exports = config;
