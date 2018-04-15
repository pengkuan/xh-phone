<template>
  <div id="app">
  	<loading v-model="loading.status" :text='loading.text' ></loading>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {Loading,Toast} from 'vux'
import {mapGetters} from 'vuex'
export default {
  name: 'app',
  components: {
    Loading,
    Toast
  },
  computed: {
    ...mapGetters({
      loading: 'common/isloading',
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
