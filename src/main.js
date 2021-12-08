import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
// import FastCilck from 'fastclick'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
// FastCilck.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')