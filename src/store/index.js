import Vue from 'vue'
import Vuex from 'vuex'
import agent from './modules/agent'
import userInfo from './modules/userInfo'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        agent:{
        	namespaced: true,
        	modules:[agent]
        },
        userInfo:{
        	namespaced: true,
        	modules:[userInfo]
        }
    }
})
