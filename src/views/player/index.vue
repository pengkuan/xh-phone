<template>
    <div id = "rewardRecord">
        <xh-header label="首页 / 玩家列表"></xh-header>
        <!-- <el-form :inline="true" :model="search" ref="search" label-width="60px" size="small" class="demo-form-inline">
            <el-form-item label="搜索：" prop="key">
                <el-input v-model="search.key" placeholder="请输入关键字"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="search.key?false:true" type="primary" @click="query">查询</el-button>
                <el-button  @click="reset('search')">重置</el-button>
            </el-form-item>
        </el-form>
        <br>
        <el-table border :data="dataList" style="width: 100%,min-height:300px">
            <el-table-column prop="head" label="头像"></el-table-column>
            <el-table-column prop="id" label="游戏ID"></el-table-column>
            <el-table-column prop="number" label="绑定代理"></el-table-column>
            <el-table-column prop="card" label="剩余房卡"></el-table-column>
            <el-table-column prop="time" label="注册时间"></el-table-column>
            <el-table-column prop="lastlogin.time" label="最后登录时间"></el-table-column>
            <el-table-column prop="lastlogin.ip" label="最后登录IP"></el-table-column>
            <el-table-column prop="login" label="登录次数"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button class='indexFunBtn' type="primary" @click="sendCard(scope.row.id)" size="small">发卡</el-button>
                    <el-button class='indexFunBtn' type="primary" @click="disabled(scope.row.id)" size="small">封号</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="hjx-pagination">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div> -->
    </div>
</template>
<script>
import api from '@/api/index'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            dataList: [],
            search: {
                "key": "",
                "pageIndex": 1,
                "pageSize": "10"
            },
            currentPage: 1,
            total: 0
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        async query(){
            let res = await api.getDetail({type:'player',key:String(this.search.key)})
            // if (res.code != 0) {
            //     this.$alert(res.msg,"提示")
            //     return
            // }
            this.dataList = res.list
            this.total = 1
        },
        async init(){
            let res = await api.playerList({page:this.search.pageIndex})
            // if (res.code != 0) {
            //     this.$alert(res.msg,"提示")
            //     return
            // }
            this.dataList = res.list
            this.total = res.total
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.search.pageIndex = val
            this.init()
        },
        reset(formName){
            // this.$refs[formName].resetFields()
            this.init()
        },
         //发卡
        sendCard(id){
            this.$router.push({
                name:'playerCard',
                query:{id:id}
            })
        },
        //封号
        disabled(){

        }
    }

}

</script>
