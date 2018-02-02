<template>
<div id="sendcard-agent">
    <xh-header label="代理列表 / 发卡">
        <router-link to="/agent/index">返回代理列表</router-link>
    </xh-header>
    <div class="content-container">
        <!-- 搜索start -->
        <!-- <el-form :inline="true" label-width="120px">
            <el-form-item label="搜索：" prop="txnId">
                <el-input v-model="searchKey" placeholder="请输入关键字"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="init">查询</el-button>
            </el-form-item>
        </el-form>
        <el-form label-width="120px">
            <el-form-item label="代理ID：">{{info.id}}</el-form-item>
            <el-form-item label="代理账号：">{{info.uname}}</el-form-item>
            <el-form-item label="代理手机号：">{{info.phone}}</el-form-item>
            <el-form-item label="代理姓名：">{{info.name}}</el-form-item>
            <el-form-item label="代理级别：">{{info.level}}</el-form-item>
            <el-form-item label="我的库存：">{{myCard}}</el-form-item>
            <el-form-item label="赠送数量：" >
                <el-input v-model="num" type="number" placeholder='请输入赠送数量' :maxlength='20'></el-input>
            </el-form-item>
            <el-form-item>
                <div class="operate">
                    <el-button @click="onSubmit" type="primary" >发卡</el-button>
                    <router-link to="index"><el-button >取消</el-button></router-link>
                </div>
            </el-form-item>
        </el-form> -->
    </div>
</div>

    
</template>


<script type="text/javascript">
    import { mapGetters,mapActions } from 'vuex'
    import api from '@/api/index'

    export default {
        data() {
            return {
                searchKey:'',
                num:'',
                info:{}
            }
        },
        computed:{
            ...mapGetters({
                'agentLevels':'agent/agentLevels',
                'myCard':'agent/myCard'
            }),
            key(){
                return this.searchKey?this.searchKey:this.$route.query.id
            }
        },
        mounted()  {
            this.init()
            this.getMyCard()
        },
        methods:{
            ...mapActions({
                getMyCard: 'agent/getMyCard' 
            }),
            async init(){
                let res = await api.getDetail({type:'agent',key:String(this.key)})
                // if (res.code != 0) {
                //     this.$alert(res.msg,"提示")
                //     return
                // }
                this.info = res.list[0]
            },
            onSubmit() {
                if(!this.num) {
                    this.$message('请输入赠送数量！')
                    return
                }
                if(this.num > this.myCard) {
                    this.$message('库存不足，无法赠送！')
                    return
                }
                // let loading = this.$loading({
                //     text:'正在提交',
                //     target:'#sendcard-agent'
                // })
                api.sendCard( {type:'agent',num:Number(this.num),to:this.info.id} ).then((res)=>{
                    // if (res.code != 0) {
                    //     this.$alert(res.msg,"提示")
                    //     return
                    // }
                    // loading.close()
                    // this.$message("成功！")
                    this.$router.push({ path: '/agent/index' })
                })
            }
        }
    }
</script>