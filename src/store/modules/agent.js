import api from '@/api/index'
import util from '@/util/index'
import * as types from '../mutation-types'

// initial state
const state = {
    agentLevels: [],
    categoryList:[],
    channelList:[],
    myCard: 0,
}

// getters
const getters = {
    agentLevels: state => state.agentLevels,
    myCard: state => state.myCard
}

// actions
const actions = {
    async getMyCard({ commit }){
        let key = util.getCookie('xh-id')
        let res = await api.getDetail({type:'agent',key:String(key)})
        if (res.code != 0) {
            this.$alert(res.msg,"提示")
            return
        }
        commit(types.GET_MY_CARD,  res.list[0].card )
    }
}

// mutations
const mutations = { //注意事项  退出登录时 需将此值还原！！
    [types.SET_PRECHOOSE_LEVEL](state) {
        let level = util.getCookie('xh-level') , 
            levelArr = [
                {'name':'一级','id':1},
                {'name':'二级','id':2},
                {'name':'三级','id':3},
                {'name':'四级','id':4}
            ]
        state.agentLevels = levelArr.filter(item=> item.id > level)
    },
    [types.GET_MY_CARD](state,val){
        state.myCard = val
    }
    
}

export default {
    state,
    getters,
    actions,
    mutations
}
