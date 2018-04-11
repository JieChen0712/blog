import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import routes from './routes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  name: 'JieChen',
  routes: routes,
  linkActiveClass: 'active' // 修改默认当前状态的类为active
})
