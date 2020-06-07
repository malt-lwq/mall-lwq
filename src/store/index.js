import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
// 1.安装Vuex
Vue.use(Vuex)

// 2.创建Store对象
const  store = new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations,
  actions,
})

// 3.挂载到实例上
export default store