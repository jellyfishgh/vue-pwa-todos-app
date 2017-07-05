import Vue from 'vue'
import Meta from 'vue-meta'

Vue.use(Meta)

import App from './App'
import router from './router'
import store from './components/TodoApp/store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
