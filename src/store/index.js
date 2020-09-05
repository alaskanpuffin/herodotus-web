import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'

Vue.use(Vuex)
Vue.use(VueCookies)

export default new Vuex.Store({
  state: {
    userAuthenticated: Vue.$cookies.isKey('token'),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
