<template>
    <div>
        <div v-if="isHighest">
            <div id="bar1" style="width: 100%;height: 400px;"></div>
            <div id="bar2" style="width: 100%;height: 400px;"></div>
            <div id="bar3" style="width: 100%;height: 400px;"></div>
            <div id="bar4" style="width: 100%;height: 400px;"></div>
        </div>
        <div v-else>暂只支持总代查看运营数据</div>
    </div>
</template>
<script>
import echarts from 'echarts'
import api from '@/api/index'
import merge from '@/util/merge'
export default {
    name: '',
    data() {
        return {
            isHighest:this._Util.getCookie('xh-level') == '0',
            getCard:[],//进卡
            agentBuyCard:[],//代理购卡
            playerBuyCard:[],//玩家购卡
            useCard:[],//房卡消耗
            mostOnline:[],//最高在线
            newAddUser:[],//新增用户
            loginUser:[],//登录用户
            /**公共数据**/
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid:{
                left: '3%',
                right: '18%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: [] //日期
            },
            yAxis:{
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            legend:{
                align: 'right',
                right: "10",
                top: "middle",
                orient: 'vertical',
                
            },
            series:{
                type: 'bar',
                // barWidth:'20%',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                itemStyle:{
                    normal:{
                        color:'#0099FF'
                    }
                }
            },
            bar1: {
                legendData:{data: ['进卡', '代理','玩家']}
            },
             bar3: {
                legendData:{data: ['房卡消耗','当天登录']}
            }
        }
    },
    computed:{
        legend1(){
            return merge({},this.legend,this.bar1.legendData)
        },
        legend3(){
            return merge({},this.legend,this.bar3.legendData)
        },
    },
    methods: {
        async init(){
            if(!this.isHighest) return
            let res = await api.operateData({})
            // if (res.code != '0') {
            //     this.$alert(res.msg,"提示")
            //     return
            // }
            const list = res.list
            list.forEach(item=>{
                this.xAxis.data.push(item.date.slice(4,6)+'/'+item.date.slice(6,8))
                this.getCard.push(item.agent.s2a_card)
                this.agentBuyCard.push(item.agent.a2a_card)
                this.playerBuyCard.push(item.agent.a2u_card)
                this.useCard.push(item.card)
                this.mostOnline.push(item.online)
                this.newAddUser.push(item.user)
                this.loginUser.push(item.login )
            })
            this.drawBar1('bar1')
            this.drawBar2('bar2')
            this.drawBar3('bar3')
            this.drawBar4('bar4')
        },
        drawBar1(id) {
            const bar = echarts.init(document.getElementById(id))
            bar.setOption({
                title: {
                    text: '房卡销售',
                    left: "center",
                },
                tooltip:this.tooltip,
                legend: this.legend1,
                grid: this.grid,
                xAxis: this.xAxis,
                yAxis: this.yAxis,
                series: [
                    merge({},this.series,{name:'进卡',data:this.getCard}),
                    merge({},this.series,{name:'代理',data:this.agentBuyCard,itemStyle:{normal:{color:'#33CC66'}}}),
                    merge({},this.series,{name:'玩家',data:this.playerBuyCard,itemStyle:{normal:{color:'#242424'}}})
                ]
            })
        },
        drawBar2(id) {
            const bar = echarts.init(document.getElementById(id))
            bar.setOption({
                title: {
                    text: '近七天新玩家注册人数',
                    left: "center",
                },
                tooltip:this.tooltip,
                legend: this.legend,
                grid: this.grid,
                xAxis: this.xAxis,
                yAxis: this.yAxis,
                series: [
                    merge({},this.series,{barWidth:'50%',data:this.newAddUser,itemStyle:{normal:{color:'#FF9933'}}})
                ]
            })
        },
        drawBar3(id) {
            const bar = echarts.init(document.getElementById(id))
            bar.setOption({
                title: {
                    text: '近七天的房卡消耗和登录玩家',
                    left: "center",
                },
                tooltip: this.tooltip,
                legend: this.legend3,
                grid: this.grid,
                xAxis: this.yAxis,
                yAxis: this.xAxis,
                series: [
                    merge({},this.series,{name:'房卡消耗',data:this.useCard,label:{normal:{position:'right',show:true}}}),
                    merge({},this.series,{name:'当天登录',data:this.loginUser,label:{normal:{position:'right',show:true}},itemStyle:{normal:{color:'#33CC66'}}})
                ]
            })
        },
        drawBar4(id) {
            const bar = echarts.init(document.getElementById(id))
            bar.setOption({
                title: {
                    text: '近7天每日在线峰值',
                    left: "center",
                },
                tooltip: this.tooltip,
                legend: this.legend,
                grid: this.grid,
                xAxis: this.xAxis,
                yAxis: this.yAxis,
                series: [
                    merge({},this.series,{barWidth:'50%',data:this.mostOnline,itemStyle:{normal:{color:'#FF3300'}}})
                ]
            })
        },
    },
    //调用
    mounted() {
        this.init()
    }
}

</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
}

</style>
