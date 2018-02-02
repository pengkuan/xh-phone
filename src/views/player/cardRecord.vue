<template>
    <div id = "rewardRecord">
        <xh-header label="玩家发卡记录"></xh-header>
        <!-- <el-table border :data="dataList" style="width: 100%,min-height:300px">
            <el-table-column prop="id" label="订单号"></el-table-column>
            <el-table-column prop="num" label="数量"></el-table-column>
            <el-table-column prop="type" label="赠送类型"></el-table-column>
            <el-table-column prop="from.id" label="赠送方ID"></el-table-column>
            <el-table-column prop="from.uname" label="赠送方账号"></el-table-column>
            <el-table-column prop="to" label="接受方ID"></el-table-column>
            <el-table-column prop="to.uname" label="接受方账号"></el-table-column>
            <el-table-column prop="from.name" label="赠送人"></el-table-column>
            <el-table-column prop="time" label="赠送时间"></el-table-column>
            
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
                "txnId": "",
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
        async init(){
            let res = await api.sendRecord({page:this.search.pageIndex , type:'player'})
            // if (res.code != 0) {
            //     this.$alert(res.retinfo,"提示")
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
        }
    }

}

</script>
