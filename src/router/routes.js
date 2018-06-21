import HelloWorld from '../components/HelloWorld'
import upload from '../components/Upload'
import Home from '../views/Home'
import setting from '../views/account/setting'
import accountList from '../views/account/list'
import Login from '../views/login'

export default[
// {path: '/hello', component: HelloWorld, name: 'hello'},
// {path: '/404', component: NotFound, name: '', hidden: true},
  {
    path: '/blog/home',
    component: Home,
    name: '主页',
    children: [
      { path: '/blog/home/upload', component: upload, name: 'upload', hidden: true },
      { path: '/blog/home/hello', component: HelloWorld, name: 'hello' },
      { path: '/blog/home/', component: HelloWorld, name: 'empty' },
      { path: '/blog/home/setting', component: setting, name: '个人中心' },
      { path: '/blog/home/accountList', component: accountList, name: '用户列表' }
    ]
  },
  {path: '/blog/login', component: Login, name: '登录'},
  {path: '/blog', redirect: '/blog/home'},
  {path: '*', hidden: true, redirect: { path: '/404' }}
]
