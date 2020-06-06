import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './common/i18n';
// import 'element-ui/lib/theme-chalk/index.css';      // 默认主题
import './assets/css/theme-green/index.css';          // 浅绿色主题
import './assets/css/icon.css';
import './common/directives';
import 'babel-polyfill';
import VCharts from 'v-charts'
//  图表
import VeLine from 'v-charts/lib/histogram.common'      //    柱状图
import VeLinea from 'v-charts/lib/line.common'          //    折线图
import 'echarts/lib/component/toolbox'                 //    工具箱
import 'v-charts/lib/style.css'
//api后端服务
import { getRequest } from './utils/api'
import { postRequest } from './utils/api'
import { deleteRequest } from './utils/api'
import { putRequest } from './utils/api'
import { uploadFileRequest } from './utils/api'
import store from './store/index'
//api后端服务的实现
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.uploadFileRequest = uploadFileRequest;

Vue.use(VCharts)
Vue.component(VeLinea.name, VeLinea)
Vue.component(VeLine.name, VeLine)
import AMap from 'vue-amap';
import Cookies from 'js-cookie'

Vue.use(AMap);
// 初始化vue-amap    高德地图
AMap.initAMapApiLoader({
  // 高德key
  key: 'bfe118bd3aa0025f81e2851530fc5f29',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation', 'AMap.Geocoder', 'AMap.ToolBar']
});
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
  size: 'small'
});
const i18n = new VueI18n({
  locale: 'zh',
  messages
});

const token = Cookies.get('token') || '';
const userid = Cookies.get('userid') || '';
const username = Cookies.get('username') || '';
const usertype = Cookies.get('usertype') || '';
const params = {
  token,
  userid,
  username,
  usertype
}
if (token) store.commit('login', params)


// 路由 login => path   好了。。。
// const whiteList = "/login";
// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title} | vue-manage-system`;
//     const role = store.state.token;
//   if (!role) {
//     if (whiteList === to.path) {
//       next();
//     } else {
//       next();
//       console.log(11111111111111111)
//       router.replace({ path: whiteList + `?redirect=${to.path}` });
//     }
//   } else {
//     if (whiteList !== to.path) {
//         next();
        
//       } else {
//         next();
//         router.replace(from.fullPath);
//       }
//   }
// });
const whiteList = "/login"
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-manage-system`;
  const role = store.state.token
  if (!role ) {
      if (whiteList === to.path) {
        next()
      }else{
        router.replace({path:whiteList + `?redirect=${to.path}`})
      }
  }else{ 
    next();
  }

});

// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title} | vue-manage-system`;
//     const role = token;
//     if (!role && to.path !== '/login') {
//         next('/login');
//     } else {
//         next();
//         // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//         // if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
//         //     Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//         //         confirmButtonText: '确定'
//         //     });
//         // } else {
//         //     next();
//         // }
//     }
// });


new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app');

