import HelloWorld from '../components/HelloWorld'
import upload from '../components/Upload'
import Home from '../views/Home'
import AccountSetting from '../views/account/setting'
import Account from '../views/account/index'
import AccountAdd from '../views/account/register'
import Login from '../views/login'
import NotFound from '../views/404'
import Register from '../views/register'
import ArticleDetail from '../views/article/detail'
import Article from '../views/article/index'
import PageView from '../views/analysis/pageview'
import ArticleKind from '../views/article/kind'

export default[
// {path: '/hello', component: HelloWorld, name: 'hello'},
  {path: '/404', component: NotFound, name: '', hidden: true},
  {
    path: '/blog/home',
    component: Home,
    name: '主页',
    children: [
      { path: '/blog/home/upload', component: upload, name: 'upload', hidden: true },
      { path: '/blog/home/hello', component: HelloWorld, name: 'hello' },
      { path: '/blog/home/', component: HelloWorld, name: 'empty' },
      { path: '/blog/home/account/setting', component: AccountSetting, name: '个人中心' },
      { path: '/blog/home/account/index', component: Account, name: '管理员列表' },
      { path: '/blog/home/account/add', component: AccountAdd, name: '新增管理员' },
      { path: '/blog/home/article/detail', component: ArticleDetail, name: '文章编辑或添加' },
      { path: '/blog/home/article/index', component: Article, name: '文章列表' },
      { path: '/blog/home/article/kind', component: ArticleKind, name: '文章分类' },
      { path: '/blog/home/analysis/pageview', component: PageView, name: '浏览量统计' }
    ]
  },
  {path: '/blog/home/login', component: Login, name: '登录'},
  {path: '/blog/home/register', component: Register, name: '注册'},
  {path: '/blog', redirect: '/blog/home'},
  {path: '*', hidden: true, redirect: { path: '/404' }}
]
