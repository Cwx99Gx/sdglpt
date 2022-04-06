import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueParticles from 'vue-particles'
import './assets/gloable.css'
import request from './utils/request'

Vue.use(VueParticles)
Vue.use(ElementUI)
Vue.config.http = request

Vue.prototype.request = request
Vue.config.productionTip = false
new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
