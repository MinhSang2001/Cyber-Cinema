import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import routes from './routes.js'
import api from './services/api.js'
import 'regenerator-runtime/runtime'
import Carousel3d from 'vue-carousel-3d'
import store from './store/store.js'
Vue.use
Vue.use(Carousel3d)
Vue.prototype.$http = api;
Vue.use(VueAxios, axios)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  router: routes,
  store,
  render: h => h(App)
})
