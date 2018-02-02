import * as http from './http'

export default {
/**
 * @post接口
 */
    Login(params) {return http.fetchPost('/agent/login', params)},//修改密码
    modifyPwd(params) {return http.fetchPost('/agent/resetpwd', params)},//修改密码

    addAgent(params) {return http.fetchPost('/agent/create', params)},//创建代理
    agentList(params) {return http.fetchPost('/agent/getagents', params)},//代理列表
    playerList(params) {return http.fetchPost('/agent/getplayers', params)},//玩家列表
    getDetail(params) {return http.fetchPost('/agent/query', params)},//查询代理/玩家
    sendCard(params) {return http.fetchPost('/agent/transcard', params)},//发卡
    sendRecord(params) {return http.fetchPost('/agent/getorders', params)},//发卡记录
    operateData(params) {return http.fetchPost('/agent/getstat', params)},//运营数据
}