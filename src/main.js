// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import '@/assets/fonts/iconfont.css'
import store from './store/index'
import Util from '@/util/index'
import xhHeader from '@/base/xh_header'
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.Util = Util
Vue.prototype.Config = Config
Vue.component('xhHeader',xhHeader)
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
