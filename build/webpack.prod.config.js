const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const path = require('path');
const package = require('../package.json');
const envConfig = require('./webpack.env.config');

let copyObj = {
    from:'../static',
    to:'../dist/SinopecPatrol/statistics/static'
}

if (envConfig.PLAT_FORM) {
    // copyObj = {
    //     from:'../static/UEditor',
    //     to:'../dist/static/UEditor'
    // }
}


module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/SinopecPatrol/statistics/compress/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    plugins: [
        new cleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, '../')
        }),
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            title: 'GPS管道巡线情况统计平台',
            filename: '../index.html',
            template: './src/template/index.ejs',
            inject: false
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, copyObj.from),
                to: path.resolve(__dirname, copyObj.to),
                ignore: ['.*']
            }
        ])
    ]
});
