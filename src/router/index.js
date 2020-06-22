import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login'
import Home from '@/common/home'
Vue.use(Router)

export default new Router({
  //mode: 'history',
  base:'test',
  routes: [
   {
     path:"/",
     meta: { title: '首页' }
   },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/dashboard',
      children:[
        {
          path: '/dashboard',
          component: () => import('../components/system/dashboard.vue'),
          meta: { title: '系统首页' }
        },
        {
          path: '/map',
          component: () => import('../components/map/mapindex.vue'),
          meta: { title: '地图' }
        },
        {
          path: '/table',
          component: () => import('../components/page/pagepuul.vue'),
          meta: { title: '肩背' }
        },
        {
          path: '/tabs',
          component: () => import('../components/car/carzuul.vue'),
          meta: { title: '车载' }
        },
        {
          path: '/3',
          component: () => import('../components/hand/handin.vue'),
          meta: { title: '手持' }
        },
        {
          path: '/icon',
          component: () => import('../components/tube/tubevalue.vue'),
          meta: { title: '管栏' }
        },
        {
          path: '/dialog',
          component: () => import('../components/user/userindex.vue'),
          meta: { title: '个人信息' }
        },
        {
          path: '/drag',
          component: () => import('../components/user/updatepassword.vue'),
          meta: { title: '修改密码' }
        },
        {
          path: '/pre',
          component: () => import('../components/car/carindex/Pre.vue'),
          meta: { title: '前置' }
        },
        {
          path: '/rear',
          component: () => import('../components/car/carindex/Rear.vue'),
          meta: { title: '后置' }
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { title: 'login' }
    },
  ]
})
