<template>
    <p>5555</p>
    <!-- <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
        <h3 class="title">新河麻将管理后台</h3>
        <el-form-item prop="uname">
            <el-input type="text" v-model="account.uname" @keyup.13.native="enter($event)" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
            <el-input type="password" v-model="account.pwd" @keyup.13.native="enter($event)" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="logining">登录</el-button>
        </el-form-item>
    </el-form> -->
</template>

<script>
import api from '@/api/index'
import md5 from 'js-md5'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            logining: false,
            account: {
                uname: 'xinhe',
                pwd: 'xinhe-20171204'
            },
            rules: {
                uname: [
                    {required: true, message: '请输入账号', trigger: 'blur'},
                ],
                pwd: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                ]
            },
            checked: true
        }
    },
    computed:{
        ...mapGetters({
            'loginInfo':'userInfo/loginInfo',
            'session':'userInfo/session',
        }),
    },
    mounted(){
        // this.init()
        // this._Util.delCookie('uname')
        this.handleLogin()
    },
    methods: {
        init(){
            /*** if记住密码 ***/
            // let uName = this._Util.getCookie('LoginName')
            // let uPwd = this._Util.getCookie('LoginPwd')
            // if(uName){
            //     this.account.uname = uName
            //     this.account.pwd = uPwd
            // }
        },
        enter(ev){
            this.handleLogin()
        },
        handleLogin() {

            let user = {
                uname : this.account.uname,
                pwd : md5(this.account.pwd)
            }
            let loginParams = { 
                'account': user
            }
            api.Login(loginParams).then(res => {
                this.logining = false
                // if (res.code != '0') {
                //     this.$message(res.msg)
                //     return
                // }
                this._Util.setCookie('xh-session',res.user.session)
                this._Util.setCookie('xh-level',res.user.level)
                this._Util.setCookie('xh-uname',res.user.uname)
                this._Util.setCookie('xh-id',res.user.id)
                this.$router.push({ path: '/' })
            })

        }
    }
}
</script>
