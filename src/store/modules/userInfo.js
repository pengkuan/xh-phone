import api from '@/api/index'
import Util from '@/util/index'
import * as types from '../mutation-types.js'

 
// initial state
const state = {
    userId: '666',
    userName: 'pengkuan',
    power: { //按钮权限管理
        active_reward_add: true,
        active_reward_look: true,
        active_reward_setpower: true,
        active_reward_setpriority: true
    },
    /**** 本地调试登录账号 *****/
    loginInfo:{
        account:'pengkuan',
        pwd:'123456'
    }
}

// getters
const getters = {
    userId: state => state.userId,
    userName: state => state.userName,
    power: state => state.power,
    loginInfo: state => state.loginInfo,
}

// actions
const actions = {

}

// mutations 
const mutations = {
    // [types.SET_SESSION](state,  val ) {
    //     state.session = val
    // } 
}

export default {
    state,
    getters,
    actions,
    mutations
}
