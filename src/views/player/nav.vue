<template>
	<group>
	    <cell-box is-link link="./index">玩家列表</cell-box>
	    <cell-box is-link link="./cardRecord">玩家发卡记录</cell-box>
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