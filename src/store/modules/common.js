import api from '@/api/index'
import Util from '@/util/index'
import * as types from '../mutation-types.js'

 
// initial state
const state = {
   loading:false
}

// getters
const getters = {
    isloading: state => state.loading,
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
