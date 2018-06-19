// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// import element-ui
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// font-awesome icon
import 'font-awesome/css/font-awesome.min.css'
// import {getCookie, delCookie} from './common/js/base.js'

Vue.config.productionTip = false
Vue.use(elementui)
Vue.use(router)

axios.defaults.withCredentials = true
Vue.prototype.$http = axios

// router.beforeEach((to, from, next) => {
// if (to.path === '/login') {
//  delCookie('NODESESSIONID')
// }
// let user = getCookie('NODESESSIONID')
// if (!user && to.path !== '/login') {
//  next({
//    path: '/login'
//  })
// } else {
//  next()
// }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')

// 默认跳到hellow页面
router.push('/blog/login')
