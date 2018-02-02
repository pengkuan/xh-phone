<template>
    <div id = "rewardRecord">
        <xh-header label="代理列表 ">
            <!-- <el-button type="primary" @click="add" size="mini" >新增</el-button> -->
        </xh-header>
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
            <el-table-column prop="id" label="代理ID"></el-table-column>
            <el-table-column prop="uname" label="代理账号"></el-table-column>
            <el-table-column prop="name" label="代理姓名"></el-table-column>
            <el-table-column prop="phone" label="代理手机号"></el-table-column>
            <el-table-column prop="level" label="代理级别"></el-table-column>
            <el-table-column prop="parent" label="上级代理"></el-table-column>
            <el-table-column prop="children" label="代理数"></el-table-column>
            <el-table-column prop="player" label="玩家数"></el-table-column>
            <el-table-column prop="card" label="库存卡数"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button class='indexFunBtn' type="primary" @click="sendCard(scope.row.id)" size="small">发卡</el-button>
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
            let res = await api.getDetail({type:'agent',key:String(this.search.key)})
            // if (res.code != 0) {
            //     this.$alert(res.msg,"提示")
            //     return
            // }
            this.dataList = res.list
            this.total = 1
        },
        async init(){
            let res = await api.agentList({page:this.search.pageIndex})
            // if (res.code != '0') {
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
        add(){
            if(this._Util.getCookie('xh-level') =='4'){
                this.$message('4级代理暂不支持添加下级！')
                return
            }
            this.$router.push({
                name:'agentAdd',
            })
        },
          //发卡
        sendCard(id){
            this.$router.push({
                name:'agentCard',
                query:{id:id}
            })
        }
    }

}

</script>
