import axios from 'axios';
import env from '../../build/env';
import lazyLoading from './lazyLoading.js';
import {routers} from "../router/router";
import {router} from "../router";

let util = {};
util.title = function (title) {
    title = title || 'Platform';
    window.document.title = title;
};
util.ajax = axios.create({
    timeout: 30000,
    headers: {Authorization: 'Sys ' + sessionStorage.getItem('token')}
});

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.map(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && itAccess.isArray()) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    let routerObj = {};
    routers.forEach(item => {
        if (item.name === 'otherRouter') {
            item.children.forEach((child, i) => {
                if (child.name === name) {
                    routerObj = item.children[i];
                }
            });
        } else {
            if (item.children) {
                if (item.children.length === 1) {
                    if (item.children[0].name === name) {
                        routerObj = item.children[0];
                    }
                } else {
                    item.children.forEach((child, i) => {
                        if (child.name === name) {
                            routerObj = item.children[i];
                        }
                    });
                }
            }
        }
    });
    return routerObj;
};

util.handleTitle = function (vm, item) {
    return item.title;
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.children && item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            if (item.children) {
                item.children.forEach(child => {
                    if (child.name === name) {
                        title = util.handleTitle(vm, child);
                        if (item.name === 'otherRouter') {
                            isOtherRouter = true;
                        }
                    }
                });
            }
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            }
        ];
        // } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
    } else if (!isOtherRouter && name !== 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: ''
            }
        ];
    } else if (isOtherRouter && name !== 'home_index') {

        let currentPathObj = vm.$store.state.app.routers.find(item => item.name == 'otherRouter');
        if (currentPathObj.children.length <= 1) {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                }
            ];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home_index') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.children[0].title,
                    path: '',
                    name: ''
                }
            ];
        } else {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, name)),
                    path: '',
                    name: ''
                }
            ];
        }
    }

    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    if (vm.$store === undefined) {
        return;
    }
    let pageOpenedList = vm.$store.state.app.pageOpenedList;

    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;

    //主菜单数据
    //let MainMenu = JSON.parse(localStorage.getItem('permissionList')).map(item => item.resUrl)
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name || name == 'sys/externalLinks/ExternalLinksView') { //
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }

    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children && item.children.length > 0) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children && tag.children.length > 0 ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next ,ssoName) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: ssoName || routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    // 权限菜单过滤相关
    vm.$store.commit('updateMenulist');
};
util.initRouter = function (vm,callBack) {
    const constRoutes = [];
    const otherRoutes = [];

    // 404路由需要和动态路由一起注入
    const otherRouter = [{
        path: '/*',
        name: 'error-404',
        meta: {
            title: '404-页面不存在'
        },
        component: 'error-page/404'
    }];
    // 模拟异步请求
    let token = sessionStorage.getItem('token');
    let lang=localStorage.lang || 'zh_CN';
    // if(uid) {
    let menuUri = (vm.menuUri) ? vm.menuUri : token ? vm.prefix + '/microarch/sys/sysuser/getMenuTreeTl?lang='+lang : '';
    if (menuUri == '') {
        return false;
    }
    vm.$myHttp(menuUri).then(res => {
        let menuData;
        if (vm.menuUri) {
            menuData = res.data;
        } else {
            if (res.data && res.data.ext) {
                menuData = JSON.parse(res.data.ext);
                for (var i = 0; i < menuData.length; i++) {
                    if (menuData[i].children && menuData[i].children.length == 1) {
                        menuData[i].title = menuData[i].children[0].title;
                        //是否刷新
                        menuData[i].isExternalLink = menuData[i].children[0].isExternalLink
                        menuData[i].memo = menuData[i].children[0].memo

                    }
                }
            }
        }


        util.initRouterNode(constRoutes, menuData);
        util.initRouterNode(otherRoutes, otherRouter);
        // 添加主界面路由
        vm.$store.commit('updateAppRouter', constRoutes);
        // 添加全局路由
        vm.$store.commit('updateDefaultRouter', otherRoutes);
        // 刷新界面菜单
        vm.$store.commit('updateMenulist', constRoutes);

        let tagsList = [];
        vm.$store.state.app.routers.map((item) => {
            if (item.children && item.children.length > 0) {
                tagsList.push(...item.children);
            } else {
                tagsList.push();
            }
        });

        vm.$store.commit('setTagsList', tagsList);
        if(callBack)  callBack()
    });
    // }
};

// 生成路由节点
util.initRouterNode = function (routers, data) {
    for (var item of data) {
        let menu = Object.assign({}, item);

        if(menu.component == 'Main'){
            menu.component = lazyLoading(process.env.mainSrc);
        }else {
            menu.component = lazyLoading(menu.component);
        }

        if (item.children && item.children.length > 0) {
            menu.children = [];
            util.initRouterNode(menu.children, item.children);
        }
        let meta = {};

        // 给页面添加标题
        meta.permission = menu.permission ? menu.permission : null;
        meta.title = menu.title ? menu.title : null;

        if(menu.isExternalLink  == '1'){
            menu.name = 'isExternalLink'+ ' ' + menu.name
        }

        if(menu.isClickRefresh == 0){
            meta.keepAlive = true
        }

        menu.meta = meta;


        routers.push(menu);
    }
};

/**
 * 检测数据是否重复       （使用在表单校验中）
 * @param url            校验请求的地址
 * @param entityData     校验数据
 * @param me             当前上下文（this）
 * @param message        提示信息
 * @param checkCode      筛选code
 * @param callback       校验规则回调方法
 */
util.checkData = function (checkCode, entityData, me, message, callback, url) {
    if (!util.isEmpty(entityData)) {
        axios({
            method: 'POST',
            url: url || me.prefix + 'sysConfig/getSysDictionaryList' + window.suffix,
            data: {
                'entity': entityData
            }
        }).then(res => {
            // 成功回调方法
            if (res.data.total > 0) {
                callback(new Error(message));
            } else {
                callback();
            }
        });
    }
};

/**
 * 判断数据的某项属性是否为空
 * @param data
 * @returns {boolean}
 */
util.isEmpty = (data) => {
    for (let items in data) {
        if (data[items] == '') {
            return true;
        }
    }
    return false;
};

/**
 *
 * @param rule
 * @param value
 * @param callback
 * @param errMsg
 */
util.validatePass = (rule, value, callback, errMsg) => {
    if (value === '') {
        callback(new Error(errMsg));
    } else {
        callback();
    }
};

util.addPreZero = (num) => {
    var t = (num + '').length,
        s = '';

    for (var i = 0; i < 4 - t; i++) {
        s += '0';
    }

    return s + num;
};

/**
 * 项目中 从数据字典中获取下拉框的数据
 * @param me            上下文
 * @param dtypeArry     当前页面需要获取的数据字典内容数组
 */
util.getSelectData = (me, dtypeArry) => {
    if (localStorage.getItem('sysDict')) {
        const allDicts = JSON.parse(localStorage.getItem('sysDict'));
        dtypeArry.map(function (dtype) {
            if (!allDicts.find(o => o.dtype == dtype)) {
                return;
            }
            let subSysDicts = allDicts.find(o => o.dtype == dtype).sysDicts;
            let resArry = [];
            subSysDicts.map(function (o) {
                resArry.push({
                    label: o.dvalue,
                    value: o.dkey
                });
            });
            me[dtype + 'Data'] = resArry;
        });
    }
};


// scrollTop animation
util.scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60)
            }
        )
    }
    const difference = Math.abs(from - to)
    const step = Math.ceil(difference / duration * 50)

    const scroll = (start, end, step) => {
        if (start === end) {
            endCallback && endCallback()
            return
        }

        let d = (start + step > end) ? end : start + step
        if (start > end) {
            d = (start - step < end) ? end : start - step
        }

        if (el === window) {
            window.scrollTo(d, d)
        } else {
            el.scrollTop = d
        }
        window.requestAnimationFrame(() => scroll(d, end, step))
    }
    scroll(from, to, step)
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
util.on = (function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler)
            }
        }
    }
})();

/**
 * @description 解绑事件 off(element, event, handler)
 */
util.off = (function () {
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler)
            }
        }
    }
})();

util.fileDownLoad = ({id,name,size,url,content}) => {
    if(!id) return

    if(size){
        var curLoading = content.$notify({
            title: content.$t('common.prompt'),
            dangerouslyUseHTMLString: true,
            message: '<div>' + content.$t('accessory.downloading') + '</div>',
            duration: 0
        });
    }
    content.$myHttp({
        method: 'post',
        url: content.permissionPrefix + url,
        data: {
            'entity': {
                'id':id
            }
        },
        onDownloadProgress: progressEvent=>{
            // Do whatever you want with the native progress event
            if(size){

                let curLoad=progressEvent.loaded;

                let okLoad=(((curLoad/size)*100).toFixed(2));

                curLoading.message='<div>' + content.$t('accessory.downloading') + okLoad + '%</div>';
                if(parseInt(okLoad)>99){
                    curLoading.message='<div>' + content.$t('accessory.downloadCompletes') + '</div>';
                    curLoading.close();
                }
            }
        },
        responseType: 'arraybuffer'
    }).then(res => {
        let headers = res.headers;
        let blob = new Blob([res.data], {
            type: headers['content-type']
        });
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        name ? link.download = name : link.download = headers.filename;
        link.click();
        //   firefox 里面触发
        let browser=navigator.userAgent.toLowerCase();
        if(browser.indexOf('firefox')>-1) {
            let event = document.createEvent("MouseEvents");
            event.initEvent("click", true, true);
            link.dispatchEvent(event);
        }
    });
};

//根据url参数名，获取对应的值
util.getQueryVariable = (name) => {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
};

//单点登录逻辑
util.ssoLogin = (routers, name, router, next) => {

    // todo 根据第三方tocken 接口请求获取到自己的tocken等信息
    // util.ajax({
    //     method: 'POST',
    //     url: process.env.API_HOST + '/'+ process.env.ssoLoginUrl,
    //     data: {
    //         tocken:util.getQueryVariable('tocken')
    //     }
    // }).then(res => {
    //     //得到自己的tocken
    //     sessionStorage.userName = 'admin';
    //     sessionStorage.token = 'xxxxxxxxxxxxx';
    //     return next({
    //         path: 'home'
    //     })
    // });

    sessionStorage.token = 'eyJhbGciOiJSUzI1NiJ9.eyJ1aWQiOiIzIiwidXNlclJvbGVzIjoiZXZlcnlvbmUsIGFkbWluLCB3d3Rlc3QsIGNlc2hpMSwganQwMDEuMDQiLCJzdWIiOiJhZG1pbiIsImNvZGUiOjAsImNyZWF0ZVRpbWUiOiIyMDE5LTA3LTAzIDExOjI1OjA0IiwidXNlck5hbWUiOiLnrqHnkIblkZgiLCJleHAiOjE1NjIxMzE1MDR9.YD-1_yfOkb0nTI0RTkeTbmimPA10eW-DLF5Ms3c1lGUl5IDM2sDt9RBjBzN-5ecW591jblnqLYmjwjW_-nK6GQ'

    let resCode = util.getQueryVariable('resCode');  //url中截取到的资源编码
    let permissionList = JSON.parse(localStorage.getItem('permissionList')); //全部资源数据
    let ssoName = permissionList.find(item => item.resCode === resCode).resUrl; //从全部资源数据中找到 资源编码code对应的页面name，控制跳转
    util.toDefaultPage(routers, name, router, next,ssoName);
};

util.deepObject = function(source, target) {
    for (let k in source) {
        if (source.hasOwnProperty(k)) {
            if (source[k] && typeof source[k] == 'object') {
                if (!target[k]) target[k] = source[k].constructor === Array ? [] : {}
                target[k] = util.deepObject(source[k], target[k])
            } else {
                if (!target[k]) target[k] = source[k]
            }
        }
    }
    return target
}

export default util;
