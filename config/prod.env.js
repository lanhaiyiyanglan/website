module.exports={
    NODE_ENV: '"prod"',
    API_HOST: '""',
    //代码生成器，true：加载，false：不加载
    PLAT_FORM : false,   //代码生成-表单编辑器资源是否引用标识

    //平台主框架页面客户化配置，项目组根据需要修改
    mainSrc:'"sys/Main"',

    //平台首页客户化配置，项目组根据需要修改
    homeSrc:'"sys/home"',

    //平台登陆页客户化配置，项目组根据需要修改
    loginSrc:'"sys/login"',

    //单点登录请求url
    ssoLoginUrl:'"microArch/ssoLogin"'
}
