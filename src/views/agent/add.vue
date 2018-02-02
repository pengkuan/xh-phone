<template>
<div id="add-agent">
    <xh-header label="代理列表 / 新增">
        <router-link to="/agent/index">返回代理列表</router-link>
    </xh-header>
    <div class="content-container">
        <!-- <el-form  :model="creatAgent" :rules="rules" ref="creatAgent" label-width="120px">
            <el-form-item label="账号：" prop='uname' >
                <el-input v-model.trim="creatAgent.uname" placeholder='请输入账号'></el-input>
            </el-form-item>
            <el-form-item label="密码："  prop='pwd'>
                <el-input v-model.trim="creatAgent.pwd" type='pwd' placeholder='请输入密码'></el-input>
            </el-form-item>
            <el-form-item label="姓名："  prop='name'>
                <el-input v-model.trim="creatAgent.name" placeholder='请输入姓名' :maxlength='20'></el-input>
            </el-form-item>
            <el-form-item label="手机号："  prop='phone'>
                <el-input v-model.trim="creatAgent.phone"  type="number" placeholder='请输入手机号'></el-input>
            </el-form-item>
            <el-form-item label="级别：" prop='level'>
                <el-select v-model="creatAgent.level" placeholder="请选择">
                    <el-option v-for="item in agentLevels" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="我的库存：" >
                <el-button type="text">{{myCard}}</el-button>
            </el-form-item>
            <el-form-item label="赠送数量：" >
                <el-input v-model.trim="creatAgent.card" type="number" placeholder='请输入赠送数量' ></el-input>
            </el-form-item>
            <el-form-item>
                <div class="operate">
                    <el-button @click="onSubmit('creatAgent')" type="primary" >确认</el-button>
                    <router-link to="index"><el-button >取消</el-button></router-link>
                </div>
            </el-form-item>
        </el-form> -->
    </div>
</div>

    
</template>

<style type="text/css" scoped>
  .content-container{width: 600px}
</style>

<script type="text/javascript">
    import { mapGetters ,mapMutations , mapActions } from 'vuex'
    import md5 from 'js-md5'
    import api from '@/api/index'

    export default {
        data() {
            return {
                creatAgent:{
                    uname:'',
                    pwd:'',
                    phone:'',
                    name:'',
                    level:'',
                    card:1,
                },
                rules:{
                    uname: [
                        {  required: true , validator: this._Util.validateNoChinese, trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true , validator: this._Util.validatePwd, trigger: 'blur' }
                    ],
                    name:[
                        { required: true ,message: '请输入姓名',trigger: 'blur' }
                    ],
                    phone:[
                        { required: true , validator: this._Util.validateTel, trigger: 'blur' }
                    ],
                    level:[
                        {  required: true, message: '请选择代理等级', trigger: 'change' }
                    ]
                    
                }
            }
        },
        computed:{
            ...mapGetters({
                'agentLevels':'agent/agentLevels',
                'myCard':'agent/myCard',
            }),
        },
        mounted()  {
            this.setCanLevel()
            this.getMyCard()
        },
        methods:{
            ...mapMutations({
                setCanLevel: 'agent/SET_PRECHOOSE_LEVEL' 
            }),
            ...mapActions({
                getMyCard: 'agent/getMyCard' 
            }),
            //确定
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // let loading = this.$loading({
                        //     text:'正在提交',
                        //     target:'#add-agent'
                        // })
                        const reqData = {
                            'user':{
                                'uname': this.creatAgent.uname,
                                'name':this.creatAgent.name,
                                'phone':this.creatAgent.phone,
                                'level':this.creatAgent.level,
                                'pwd': md5( String(this.creatAgent.pwd) ),
                                'card':Number(this.creatAgent.card)
                            }
                        }
                        api.addAgent(reqData).then(res =>{
                            // if (res.code != '0') {
                            //     this.$alert(res.msg,"提示")
                            //     return
                            // }
                            // loading.close()
                            // this.$message("成功！")
                            this.$router.push({ path: '/agent/index' })
                        })
                    } else {
                        console.log('error submit!!')
                        return false;
                    }
                })

            }
        }
    }
</script>