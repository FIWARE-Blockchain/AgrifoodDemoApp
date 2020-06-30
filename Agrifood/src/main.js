import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {EagleModal} from 'vue-eagle-modal'
import UUID from 'vue-uuid'
import storage from './services/storage';
import dlt from './services/dlt';
 
import 'bootstrap/dist/css/bootstrap.min.css'


Vue.use(EagleModal)
Vue.use(UUID)
Vue.config.productionTip = false

// clear storage on bootstrap
storage.clearStorage()
//create accounts for user
dlt.createAccounts()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
