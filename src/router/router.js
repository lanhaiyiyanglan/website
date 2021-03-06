export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login-登录'
    },
    component: () => import('@/views/login.vue')
};
export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@/views/error-page/403.vue')
};
export const page404 = {
    path: '*',
    //redirect:'/login'
    meta: {
        title: '404-页面不存在'
    },
    name: 'errorFirst-404',
    component: () => import('@/views/error-page/404.vue')
};
export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/home',
    name: 'Main',
    component: () => import('@/views/main.vue'),
    children: [
        {
            path: '/1300000000',
            name: 'ywbb',
            component: () => import('@/views/ywbb/ywbb.vue'),
            children: [
                {
                    path: '/1301000000',
                    name: 'task',
                    component: () => import('@/views/ywbb/task.vue')
                }, {
                    path: '/1302000000',
                    name: 'line_patrol',
                    component: () => import('@/views/ywbb/line.vue')
                }, {
                    path: '/1303000000',
                    name: 'station',
                    component: () => import('@/views/ywbb/station.vue')
                },
                {
                    path: '/1304000000',
                    name: 'monitor',
                    component: () => import('@/views/ywbb/monitor.vue')

                },
                {
                    path:'/1305000000',
                    name:'guanDao',
                    component:()=>import('@/views/ywbb/guanDao.vue')
                },
                {
                    path:'/1306000000',
                    name:'duanChang',
                    component:()=>import('@/views/ywbb/duanChang.vue')
                },
                {
                    path: '/1307000000',
                    name: 'inspectionlog',
                    component: () => import('@/views/ywbb/inspectionlog.vue')

                },
                {
                    path:'/1308000000',
                    name:'unitCheck',
                    component:()=>import('@/views/ywbb/unitCheck.vue')
                },
                {
                    path:'/1309000000',
                    name:'personCheck',
                    component:()=>import('@/views/ywbb/personCheck.vue')
                },
                {
                    path:'/1310000000',
                    name:'duanzCheck',
                    component:()=>import('@/views/ywbb/duanzCheck.vue')
                },
                {
                    path:'/1311000000',
                    name:'rank',
                    component:()=>import('@/views/ywbb/rank.vue')
                },
                {
                    path:'/1312000000',
                    name:'weekReport',
                    component:()=>import('@/views/ywbb/weekReport.vue')
                },
                {
                    path:'/1313000000',
                    name:'patrol',
                    component:()=>import('@/views/ywbb/patrol.vue')
                },
                {
                    path:'/1314000000',
                    name:'patrolReport',
                    component:()=>import('@/views/ywbb/patrolReport.vue')
                },
                {
                    path:'/1315000000',
                    name:'thirdParty',
                    component:()=>import('@/views/ywbb/thirdParty.vue')
                }
            ]
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
