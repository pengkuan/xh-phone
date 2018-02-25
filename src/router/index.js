import Vue from 'vue'
import Router from 'vue-router'
import Util from '@/util/index'

import userCenter from './userCenter'
import agent from './agent'
import player from './player'

const login = resolve => require(['@/views/login'], resolve)
const home = resolve => require(['@/views/home'], resolve)
const index = resolve => require(['@/views/index'], resolve)  //运营数据

Vue.use(Router)

let router = new Router({ 
    routes: [
        {
            path: '/login',
            name: '登录',
            component: login
        },
        {
            path: '/',
            name: 'home', 
            component: home,
            redirect: '/index',
            leaf: true, // 只有一个节点
            iconCls: 'iconfont icon-home_fill_light', // 图标样式class
            children: [
                {path: '/index', component: index, name: '运营数据'}
            ]
        },
        {
            path: '/',
            name: '代理管理', 
            component: home,
            iconCls: 'iconfont icon-friend_light', // 图标样式class
            children: [
                {path: '/agent/nav', component: agent.nav, name: 'agentNav'},
                {path: '/agent/index', component: agent.index, name: '代理列表'},
                {path: '/agent/add', component: agent.add, name: 'agentAdd'},
                {path: '/agent/card', component: agent.card, name: 'agentCard'},
                {path: '/agent/cardRecord', component: agent.cardRecord, name: '代理发卡记录'},
            ]
        },
        {
            path: '/',
            name: '玩家管理', 
            component: home,
            iconCls: 'iconfont icon-friend_light', // 图标样式class
            children: [
                {path: '/player/nav', component: player.nav, name: 'playerNav'},
                {path: '/player/index', component: player.index, name: '玩家列表'},
                {path: '/player/card', component: player.card, name: 'playerCard'},
                {path: '/player/cardRecord', component: player.cardRecord, name: '玩家发卡记录'},
            ]
        },
        {
            path: '/',
            name: '个人中心', 
            // name: '测试',  
            component: home,
            menuShow: true,
            iconCls: 'iconfont icon-settings_light', // 图标样式class
            children: [
                {path: '/user/nav', component: userCenter.nav, name: 'userNav'},
                {path: '/user/setPwd', component: userCenter.setPwd, name: '修改密码'},
            ]
        },
    ]
})
router.beforeEach((to, from, next) => {
    
    if (to.path.startsWith('/login')) {
        next()
    } else {
        const session = Util.getCookie('xh-session')
        if(session) next()
        else next({path: '/login'})
    }
})

export default router
