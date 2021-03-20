
import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin, ImagePlugin } from 'bootstrap-vue';
import VueHtmlToPaper from 'vue-html-to-paper';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueSocketIO from 'vue-socket.io'
import VueConfirmDialog from 'vue-confirm-dialog'
import VueSweetalert2 from 'vue-sweetalert2';
import VueDropdown from 'vue-dynamic-dropdown';
import { BSkeleton } from 'bootstrap-vue'
import { SkeletonPlugin } from 'bootstrap-vue'


import 'sweetalert2/dist/sweetalert2.min.css';



Vue.config.productionTip = false
Vue.use(new VueSocketIO({
  connection: 'http://192.168.1.3:3006',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
}))


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ImagePlugin)
Vue.use(SkeletonPlugin)
Vue.use(VueHtmlToPaper);
Vue.use(VueConfirmDialog)
Vue.use(VueSweetalert2);


Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Vue.component('vue-dropdown', VueDropdown);
Vue.component('b-skeleton', BSkeleton)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
