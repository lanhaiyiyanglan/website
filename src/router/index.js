import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import myAxios from '../libs/axios';
import VueRouter from 'vue-router';
import { routers } from './router';
import Cookies from 'js-cookie'
Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  base: '/SinopecPatrol/statistics',
  routes: routers,
  mode:'history'
};
export const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
    
    let url=window.location.href;
    let islogin=Cookies.get('islogin');
    console.log("isLogin="+islogin);
    if(to.path == "/login"){
      if(islogin){
        next("/home");
      }else{
        next();
      }
    }else{
        if(islogin) {
          if(to.path=="/"||to.path=="/index.html"){
            next("/home");
          }else{
            next();
          }
        }else{
          if(url.indexOf("?") != -1&&url.indexOf("&")!= -1){
            let userArr = url.split('?');
            myAxios.get('gpsGroups/checkUser?userId=' +userArr[1].split('&')[0]+'&sId='+userArr[1].split('&')[1]).then((res) => {
                if(res.result.flag==1){
                  if(islogin){
                    console.log(userArr[1].split('#').length,userArr[1].split('#'));
                    if(userArr[1].split('#').length>=2){
                      //history.replaceState(null,null,'/');
                      if(userArr[1].split('#')[1]=="/"){
                        next("/home");
                      }else{
                        next(userArr[1].split('#')[1]);
                      }
                    }else{
                      //history.replaceState(null,null,'/');
                      next("/home");
                    }
                  }else{
                      Cookies.set('userId',userArr[1].split('&')[0]);
                      Cookies.set('islogin',res.result.flag);
                      if(res.result.USERNAME==null||res.result.USERNAME==""){
                        Cookies.set('userName',res.result.NAME);
                      }else{
                        Cookies.set('userName',res.result.USERNAME);
                      }
                      Cookies.set('AREAID',res.result.AREAID);
                      Cookies.set('GROUPCODE',res.result.GROUPCODE);
                      Cookies.set('GROUPNAME',res.result.GROUPNAME);
                      Cookies.set('AREANAME',res.result.AREANAME);
                      if(userArr[1].indexOf("#")>-1){
                        console.log("url参数后的path"+userArr[1].split('#')[1]);
                        if(userArr[1].split('#')[1]=="/"){
                          next("/home");
                        }else{
                          next(userArr[1].split('#')[1]);
                        }
                      }else{
                        next("/home");
                      }
                  }
                }else{
                  Cookies.remove('userId');
                  Cookies.remove('islogin');
                  Cookies.remove('sessionid');
                  //history.replaceState(null,null,'/login');
                  next("/login");
                  window.vm.$message({
                    type: 'error',
                    message: '地址栏里用户名或者sessionId不正确，请重新登录',
                    showClose: true,
                    duration: 5000,
                  });
                }
            });
          }else{
            next('/login');
          }
        }
    }
    
});
router.afterEach((to) => {
  // Util.openNewPage(router.app, to.name, to.params, to.query);
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
