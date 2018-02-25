<template>
	<group>
	    <cell-box is-link link="./index">代理列表</cell-box>
	    <cell-box is-link link="./add">新增代理</cell-box>
	    <cell-box is-link link="./cardRecord">代理发卡记录</cell-box>
	 </group>
</template>
<script>
import { CellBox,Group } from 'vux'
export default {
  components: {
    CellBox,
    Group
  }
}

</script>