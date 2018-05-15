import HelloWorld from '../components/HelloWorld'
import upload from '../components/Upload'
import Home from '../views/Home'
import setting from '../views/account/setting'
import Login from '../views/login'

export default[
// {path: '/hello', component: HelloWorld, name: 'hello'},
  {
    path: '/home',
    component: Home,
    name: '主页',
    children: [
      { path: 'upload', component: upload, name: 'upload', hidden: true },
      { path: 'hello', component: HelloWorld, name: 'hello' },
      { path: '', component: HelloWorld, name: 'empty' },
      { path: 'setting', component: setting, name: '个人中心' }
    ]
  },
  {path: '/login', component: Login, name: '登录'},
  {path: '/', redirect: '/home', name: '主页'}
]
