import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import store from './store';
import App from './app.vue';
import util from '@/libs/util.js';
import hasPermission from '@/libs/hasPermission.js';
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui';
//import i18n from './i18n/i18n'
import 'element-ui/lib/theme-chalk/index.css';
import myAxios from './libs/axios';
import axios from 'axios';
import * as filters from './filters'; // global filters
import myGlobal from './components/myGlobal.vue';
import echarts from 'echarts';
import './styles/common.css';
import dayjs from 'dayjs';
import Cookie from 'js-cookie'
var isoWeeksInYear = require('dayjs/plugin/isoWeeksInYear')
var isLeapYear = require('dayjs/plugin/isLeapYear') // dependent on isLeapYear plugin
var isoWeek = require('dayjs/plugin/isoWeek')
var weekOfYear = require('dayjs/plugin/weekOfYear')
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)
dayjs.extend(isoWeeksInYear)
dayjs.extend(isLeapYear)

if(process.env.PLAT_FORM){
    
}

Vue.use(iView);
// Vue.use(hasPermission);
Vue.use(ElementUI);

//axios.defaults.withCredentials = true;
window.Promise = Promise;
Vue.prototype.$myHttp = myAxios;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts
Vue.prototype.myGlobal = myGlobal;
Vue.prototype.menuUri = '';// ./src/data/menu.json'
window.suffix = ''; // ?user=admin&roles=pUser
Vue.prototype.dayjs = dayjs;

Vue.prototype.$Cookie = Cookie;
Vue.prototype.allBtnSize = 'mini';
Vue.prototype.loginPrefix = process.env.API_HOST;
Vue.prototype.homePrefix = process.env.API_HOST;
Vue.prototype.prefix = process.env.API_HOST;
Vue.prototype.prefixWork = process.env.API_HOST;
Vue.prototype.permissionPrefix = process.env.API_HOST;

window.UEDITOR_SERVER_URL = process.env.UEDITOR_SERVER_URL;
window.API_HOST = process.env.API_HOST;


// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

window.vm = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    // render: function(createElement) {
	// 	if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) {
	// 		window.addEventListener('hashchange', () => {
    //             var currentPath = window.location.hash.slice(1);
    //             console.log(currentPath);
    //             console.log(this.$route.path);
	// 			if (this.$route.path !== currentPath) {
	// 				this.$router.push(currentPath)
	// 			}
	// 		}, false)
	// 	}
	// 	return createElement(App);
	// }
});
