import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

const EXPRIES = new Date().getTime() + 2 * 3600 * 1000 // 前端缓存 2小时
const PATH = '/'; // 当前的path 默认是当前/ 之后的 东都可以用cookie
const DOMAIN = document.domain;  // 当前域名下使用cookie 防止 窃取
Vue.use(Vuex)

export default new Vuex.Store({
  //     //数据仓库
  state:{
      userid:'',
      username:'',
      token:''
  },
  // //改变状态的方法
  mutations:{
    //登入
    login(state,params){
      state.token = params.token || '';
      state.username = params.username || '';
      state.userid = params.userid || '';
      Cookies.set('token', params.token, { expires: EXPRIES,path:PATH,domain:DOMAIN });
      Cookies.set('username', params.username, { expires: EXPRIES,path:PATH,domain:DOMAIN });
      Cookies.set('userid', params.userid, { expires: EXPRIES,path:PATH,domain:DOMAIN });
    },
    //注销
    logout(state,params){
      state.token =  params.token;
      state.username =  params.username;
      state.userid =   params.userid;
      Cookies.set('token', params.token, { expires: EXPRIES,path:PATH,domain:DOMAIN });
      Cookies.set('username', params.username, { expires: EXPRIES,path:PATH,domain:DOMAIN });
      Cookies.set('userid', params.userid, { expires: EXPRIES,path:PATH,domain:DOMAIN });
    },
  },
})
