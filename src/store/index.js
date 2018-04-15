import Vue from 'vue'
import Vuex from 'vuex'
import agent from './modules/agent'
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        agent:{
        	namespaced: true,
        	modules:[agent]
        },
        common:{
        	namespaced: true,
        	modules:[common]
        }
    }
})
