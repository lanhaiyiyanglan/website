const path = require('path');
const os = require('os');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
// 引入上面的webpack.env.conf模块
const envConfig = require('./webpack.env.config');

var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
require('babel-polyfill')
function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    entry: {
        main: ['babel-polyfill','@/main'],
        'vender-base': '@/vendors/vendors.base.js',
        'vender-exten': '@/vendors/vendors.exten.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist/SinopecPatrol/statistics/compress')
    },
    devServer:{
        port:8081,
        progress:true,
        hot: true,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        loaders: {
                            css: 'vue-style-loader!css-loader',
                            less: 'vue-style-loader!css-loader!less-loader'
                        },
                        postLoaders: {
                            html: 'babel-loader'
                        }
                    }
                }
            },
            {
                test: /iview\/.*?js$/,
                loader: 'happypack/loader?id=happybabel',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=happybabel',
                exclude: /node_modules/
            },
            {
                test: /\.js[x]?$/,
                include: [resolve('src')],
                exclude: /node_modules/,
                loader: 'happypack/loader?id=happybabel'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-hot-loader', 'autoprefixer-loader', 'less-loader'],
                    fallback: 'style-loader'
                }),
            },

            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader'],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        }),
        new webpack.DefinePlugin({
            'process.env': envConfig
        })
    ],
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': resolve('../src'),
            'libs': resolve('../src/libs'),
            'views':resolve('../src/views')
        }
    }
};
