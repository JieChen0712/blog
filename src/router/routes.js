import HelloWorld from '../components/HelloWorld'
import upload from '../components/Upload'
import Home from '../views/Home.vue'

export default[
  {path: '/hello', component: HelloWorld},
  // {path: '/upload', component: upload},
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/home/upload', component: upload, name: '主页', hidden: true }
    ]
  }
]
