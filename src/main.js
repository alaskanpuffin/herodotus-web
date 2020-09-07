import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCookies from 'vue-cookies';
import 'bootstrap/dist/css/bootstrap-grid.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'toastr/build/toastr.css';
import vueDebounce from 'vue-debounce'

Vue.config.productionTip = false;

Vue.use(VueCookies)
Vue.use(vueDebounce)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
