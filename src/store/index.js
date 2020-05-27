import Vue from 'vue'
import Vuex from 'vuex'


// 安装插件
Vue.use(Vuex)

//  创建对象
const store = new Vuex.Store({

    state:{
        count:0,
        student:[
            {id:12,name:'zhangsan',age:29},
            {id:13,name:'wangwu',age:12},
            {id:14,name:'lisi',age:'21'}
        ]
     
    },
    mutations:{
        addNum(state){
            state.count++
        },
        updateNum(state){
            state.count--
        }
    },
    actions:{

    },
    getters:{
        addNumber(state){
            return state.count * state.count
        },
        num20(state){
            return state.student.filter(s=>s.age>20)
        }
    },
    modules:{

    }

})

// 导出store
export default store