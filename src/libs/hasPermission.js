//判断按钮权限的自定义指令

// const hasPermission = {
//     install (Vue) {
//         Vue.directive('hasPermission', {
//             bind(el, binding, vnode) {
//                 // 当前用户所有权限数据
//                 let permissionList = JSON.parse(localStorage.getItem('permissionList'));
//                 let parentViewCode = vnode.context.$route.meta.parentViewCode

//                 // 当前页面路由名称
//                 let routeName = vnode.context.$route.name;
//                 // 根据当前页路由名称 权限数据中筛选出当前页面权限数据结构

//                 let parentData = permissionList.find(o => o.resUrl === routeName) || permissionList.find(o => o.resCode === parentViewCode);

//                 //解析一级路由对应页面上的按钮权限（列表页）
//                 let childPermissionList = permissionList.filter(o => o.resParentId === parentData.resId);

//                 //此路由页面下无按钮对应按钮权限时，移除dom
//                 if (!childPermissionList.find(item => item.resUrl == binding.value) && el.parentNode) {
//                     el.parentNode.removeChild(el);
//                 }

//             }
//         });
//     }
// };

// export default hasPermission;

import Vue from 'vue';
import Cookies from 'js-cookie'
const hasPermission = userPermission => {
// 是否在权限数组里面
let status = Cookies.get('inspectionPermission').includes(userPermission)
return status
}

//全局方法挂载
Vue.prototype.$_has = hasPermission

