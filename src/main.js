import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin, ImagePlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@/assets/scss/main.scss'

Vue.config.productionTip = false



Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ImagePlugin)




new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')