import axios from 'axios'
import config from '@/config/index'
import util from '@/util/index'
import merge from '@/util/merge'
import router from '@/router'
// axios 配置
// axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = 'http://api.mogumj.com'

// import { Message } from 'element-ui'
//POST传参序列化
axios.interceptors.request.use((msg) => {
    // if(msg.method  === 'post'){
    //     msg.data = qs.stringify(msg.data)
    // }
    return msg
}, (error) => {
    return Promise.reject(error)
})

//返回状态判断
axios.interceptors.response.use((res) => {
    let _this = this
    if (res.status != 200) {
        return Promise.reject(res)
    }
    // if(res.data.code == 40001){
    //     router.push('/login')
    //     return {code:0}
    // }
    return res.data
}, (error) => {
    if (error.response) {
        // Message({ message: error.response.data.msg, type: 'warning' })
        switch (error.response.status) {
            case 403:
                router.push('/login')
        }
    }
    return Promise.reject(error)
})

export function fetchPost(apiPath,params) {
    var resParams = {    
        'app': 'xinhe',
        'session': util.getCookie('xh-session') ? util.getCookie('xh-session'):''
    }
    merge(resParams,params)

    return new Promise((resolve, reject) => {
        axios.post(config.api+apiPath, resParams)
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
