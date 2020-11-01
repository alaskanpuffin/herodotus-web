import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCookies from 'vue-cookies';
import '@fortawesome/fontawesome-free/css/all.css';
import 'toastr/build/toastr.css';
import 'selectize/dist/css/selectize.default.css';
import vueDebounce from 'vue-debounce'
import {VueMasonryPlugin} from 'vue-masonry';

Vue.config.productionTip = false;

Vue.use(VueCookies)
Vue.use(vueDebounce)
Vue.use(VueMasonryPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
