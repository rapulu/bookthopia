import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://www.googleapis.com/books/v1'
Vue.prototype.$axios = axios

// axios.interceptors.request.use(config => {
//   return config
// }, error => {
//   return Promise.reject(error)
// })

new Vue({
  render: h => h(App),
}).$mount('#app')
