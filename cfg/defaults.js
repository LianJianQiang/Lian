'use strict';

const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const autoPrefixer = require('autoprefixer');
const HappyPack = require('happypack');

const srcPath = path.join(__dirname, '/../app');
// const theme = require('../antdtheme');

const happyThreadPool = HappyPack.ThreadPool({size: 5});


function getDefaultModules() {
    return {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: srcPath,
                enforce: 'pre',
                exclude: '/node_modules/',
                loader: 'eslint-loader'
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.sass/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]-[hash:5]',
                            minimize: true
                        }
                    }, {
                        loader: 'csslint-loader'
                    }, {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: {
                                expanded: true
                            },
                            includePaths: [srcPath],
                            data: '@import "styles/core/variables";'
                        }
                    }
                ]
            }, {
                test: /\.scss/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]-[hash:base64:5]',
                            minimize: true
                        }
                    }, {
                        loader: 'csslint-loader'
                    }, {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: {
                                expanded: true
                            },
                            includePaths: [srcPath],
                            data: '@import "styles/core/variables";'
                        }
                    }
                ]
            }, {
                test: /\.less/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }, {
                test: /\.less/,
                include: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: 'happypack/loader?id=antd-css'
                })
            }, {
                test: /\.html/,
                loader: 'html-loader'
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    name: 'fonts/[name:md5].[ext]'
                }
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }, {
                test: /\.(png|jpg|gif|webp)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }, {
                test: /\.(mp4|ogg|svg)$/,
                loader: 'file-loader'
            }
        ]
    };
}

/**
 * Get the default plugins object for webpack
 * @return {Object}
 */
function getDefaultPlugins() {
    return [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../dist/dev/vendor-manifest.json')
        }),
        new ProgressBarPlugin({
            width: 50,
            format: chalk.magenta.bold('build bundle process ') + chalk.cyan.bold(':percent') + chalk.yellow.bold(' (:elapsed seconds)'),
            clear: false
        }),
        new CopyWebpackPlugin([])
    ];
}

module.exports = {
    srcPath: srcPath,
    publicPath: '/',
    getDefaultModules,
    getDefaultPlugins,
    happyThreadPool
};
