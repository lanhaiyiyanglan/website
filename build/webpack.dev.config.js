const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const package = require('../package.json');



module.exports = merge(webpackBaseConfig, {
    // devtool: '#source-map', #eval , #cheap-eval-source-map
    devtool: '#eval',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'Platform' + package.version,
            filename: '../index.html',
            template: './src/template/index.ejs',
            inject: false
        })
    ]
});
