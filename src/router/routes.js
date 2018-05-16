import HelloWorld from '../components/HelloWorld'
import upload from '../components/Upload'
import Home from '../views/Home'
import setting from '../views/account/setting'
import Login from '../views/login'

export default[
// {path: '/hello', component: HelloWorld, name: 'hello'},
  {
    path: '/blog/home',
    component: Home,
    name: '主页',
    children: [
      { path: '/blog/home/upload', component: upload, name: 'upload', hidden: true },
      { path: '/blog/home/hello', component: HelloWorld, name: 'hello' },
      { path: '/blog/home/', component: HelloWorld, name: 'empty' },
      { path: '/blog/home/setting', component: setting, name: '个人中心' }
    ]
  },
  {path: '/blog/login', component: Login, name: '登录'}
]
