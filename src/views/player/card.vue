<template>
<div>
    <xh-header label="玩家列表 / 发卡">
        <!-- <router-link to="/player/index"><el-button size="small">返回玩家列表</el-button></router-link> -->
    </xh-header>
    <!-- <div class="content-container">
        <el-form :inline="true" label-width="120px">
            <el-form-item label="搜索：" prop="txnId">
                <el-input v-model="searchKey" placeholder="请输入关键字"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="init">查询</el-button>
            </el-form-item>
        </el-form>
        <el-form label-width="120px">
            <el-form-item label="玩家ID：">{{info.id}}</el-form-item>
            <el-form-item label="玩家昵称：">{{info.nick}}</el-form-item>
            <el-form-item label="创建时间：">{{info.phone}}</el-form-item>
            <el-form-item label="剩余卡数：">{{info.card}}</el-form-item>
            <el-form-item label="玩家状态：">{{info.level}}</el-form-item>
            <el-form-item label="我的库存：">{{myCard}}</el-form-item>
            <el-form-item label="赠送数量：" >
                <el-input v-model="num" type="number" placeholder='请输入赠送数量' :maxlength='20'></el-input>
            </el-form-item>
            <el-form-item>
                <div class="operate">
                    <el-button @click="onSubmit" type="primary" >发卡</el-button>
                    <router-link to="/player/index"><el-button >取消</el-button></router-link>
                </div>
            </el-form-item>
        </el-form>
    </div> -->
</div>

    
</template>

<style type="text/css" scoped>
  .content-container{width: 500px}
</style>

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
                let res = await api.getDetail({type:'player',key:String(this.key)})
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
                api.sendCard( {type:'player',num:Number(this.num),to:this.info.id} ).then((res)=>{
                    // if (res.code != 0) {
                    //     this.$alert(res.msg,"提示")
                    //     return
                    // }
                    // this.$message("成功！")
                    this.$router.push({ path: '/player/index' })
                })
            }
        }
    }
</script>