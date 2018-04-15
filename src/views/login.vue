<template>
    <div>
        <br><br><br><br><br><br><br><br><br>
        <x-input title="账号" v-model="account.uname"></x-input>
        <x-input title="密码" type="password" v-model="account.pwd"></x-input>
        <br><br>
        <x-button type="primary" @click.native="handleLogin">登录</x-button>
    </div>
</template>

<script>
import api from '@/api/index'
import md5 from 'js-md5'
import { mapGetters,mapMutations } from 'vuex'
import { Group,XButton,XInput } from 'vux'
export default {
    components: {
        Group,
        XButton,
        XInput
    },
    data() {
        return {
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
    mounted(){

    },
    methods: {
        ...mapMutations({
            setLoading: 'common/SET_LOADING' 
        }),
        handleLogin() {
            this.setLoading({status:true,text:'正在登录'})
            let user = {
                uname : this.account.uname,
                pwd : md5(this.account.pwd)
            }
            let loginParams = { 
                'account': user
            }
            api.Login(loginParams).then(res => {
                this.setLoading({status:false,text:''})
                if (res.code != '0') {
                    this.$message(res.msg)
                    return
                }
                this.Util.setCookie('xh-session',res.user.session)
                this.Util.setCookie('xh-level',res.user.level)
                this.Util.setCookie('xh-uname',res.user.uname)
                this.Util.setCookie('xh-id',res.user.id)
                this.$router.push({ path: '/' })
            })

        }
    }
}
</script>
