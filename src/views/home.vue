<template>
  <div id="home">
    <transition name="fade">
        <router-view class="router-class"></router-view>
    </transition>
    <tabbar>
      <tabbar-item selected link="/index">
        <img slot="icon" src="../assets/images/home_fill_light.png">
        <span slot="label">运营数据</span>
      </tabbar-item>
      <tabbar-item link="/agent/nav">
        <img slot="icon" src="../assets/images/friend_light.png">
        <span slot="label">代理</span>
      </tabbar-item>
      <tabbar-item  link="/player/nav">
        <img slot="icon" src="../assets/images/friend_light.png">
        <span slot="label">玩家</span>
      </tabbar-item>
      <tabbar-item link="/user/nav">
        <img slot="icon" src="../assets/images/settings_light.png">
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  }
}
</script>
<style type="text/css">
  #home {padding-bottom: 53px}
  #home .weui-tabbar{position: fixed;}
</style>
