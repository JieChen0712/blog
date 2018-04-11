import HelloWorld from '../components/HelloWorld'
import upload from '../components/Upload'
import Home from '../views/Home.vue'

export default[
// {path: '/hello', component: HelloWorld, name: 'hello'},
  {
    path: '/home',
    component: Home,
    name: '主页',
    children: [
      { path: 'upload', component: upload, name: 'upload', hidden: true },
      { path: 'hello', component: HelloWorld, name: 'hello' },
      { path: '', component: HelloWorld, name: 'empty' }
    ]
  },
  {path: '/', redirect: '/home', name: '主页'}
]
