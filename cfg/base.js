'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

module.exports = {
    devtool: 'eval',
    output: {
        path: path.join(__dirname, '/../dist/assets'),
        filename: 'app.js',
        publicPath: `.${defaultSettings.publicPath}`
    },
    devServer: {
        contentBase: './app/',
        disableHostCheck: true,
        // overlay: true,
        historyApiFallback: true,
        hot: true,
        port: defaultSettings.port,
        publicPath: defaultSettings.publicPath,
        noInfo: true, // 使用进度条的方式替换打包信息
        stats: {
            // Config for minimal console.log mess.
            // Find all stats in https://webpack.js.org/configuration/stats/#stats
            timings: false,
            colors: true,
            version: false,
            hash: false,
            chunks: false,
            chunkModules: true,
            children: false
        },
    },
    resolve: {
        modules: [path.join(__dirname, '/../node_modules')],
        extensions: ['.js', '.jsx'],
        alias: {
            'common': `${defaultSettings.srcPath}/common/`,
            'components': `${defaultSettings.srcPath}/components/`,
            'containers': `${defaultSettings.srcPath}/containers/`,
            'static': `${defaultSettings.srcPath}/static/`,
            'utils': `${defaultSettings.srcPath}/utils/`
        }
    },
};
