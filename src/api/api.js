import axios from 'axios'
import {Message} from 'element-ui'
const querystring = require('querystring')

// axios.defaults.baseURL = 'http://127.0.0.1:8085'
axios.defaults.withCredentials = true
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = (data, headers) => { return headers['Content-Type'] === 'application/json' ? data : querystring.stringify(data) }

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  console.log(error)
  Message.error('接口错误，请重试')
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  console.log(error)
  Message.error('接口错误，请重试')
  return Promise.reject(error)
})
// 登录接口
export const login = params => { return axios.post(`/api/blog/admin/login`, params) }
// 获取所有管理员用户信息
export const getAdminUsers = params => { return axios.post(`/api/blog/admin/get_user_list`, params) }
// 保存编辑的管理员信息
export const setAdminInfo = params => { return axios.post(`/api/blog/admin/set_user_detail`, params) }
// 注册账号
export const register = params => { return axios.post(`/api/blog/user/register`, params) }
// 获取管理员信息
export const getAdminInfo = () => { return axios.get(`/api/blog/admin/getAdminInfo`) }

// 获取网站区域的浏览信息
export const getPageViewDate = params => { return axios.post(`/api/blog/admin/getPageViewDate`, params) }
/** ********************* 文章  **************************/
// 保存文章
export const saveArticle = params => { return axios.post(`/api/blog/admin/article_save`, params) }
// 文章分类
export const kindArticle = params => { return axios.post(`/api/blog/admin/article_kind`, params) }
// 改变文字分类状态
export const changeArticleStatus = params => { return axios.post(`/api/blog/admin/article_kind_status_change`, params) }
// 删除分类
export const delArticleKind = params => { return axios.post(`/api/blog/admin/article_del_kind`, params) }

export const removeUser = params => { return axios.get(`/user/remove`, { params: params }) }

export const batchRemoveUser = params => { return axios.get(`/user/batchremove`, { params: params }) }

export const editUser = params => { return axios.get(`/user/edit`, { params: params }) }

export const addUser = params => { return axios.get(`/user/add`, { params: params }) }

export const getcitydata = () => { return axios.get('../../static/data/area.json') }
