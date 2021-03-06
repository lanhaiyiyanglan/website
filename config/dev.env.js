'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',

    //网关地址，本地开发需要配置，生产环境配置空，通过nginx代理转发
    API_HOST: '"http://192.168.205.65:5002"',// API_HOST: '"http://192.168.205.65:5002"',

    //富文本编辑器中文件上传服务地址
    UEDITOR_SERVER_URL: '"http://192.168.205.65:8080"',

    //代码生成器，true：加载，false：不加载
    PLAT_FORM : true,

    //平台主框架页面客户化配置，项目组根据需要修改
    mainSrc:'"sys/Main"',

    //平台首页客户化配置，项目组根据需要修改
    homeSrc:'"sys/home"',

    //平台登陆页客户化配置，项目组根据需要修改
    loginSrc:'"sys/login"',

    //单点登录请求url
    ssoLoginUrl:'"microArch/ssoLogin"'
})
