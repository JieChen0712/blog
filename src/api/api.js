import axios from 'axios'
const querystring = require('querystring')

// axios.defaults.baseURL = 'http://127.0.0.1:8085'
axios.defaults.withCredentials = true
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = (data, headers) => { return headers['Content-Type'] === 'application/json' ? data : querystring.stringify(data) }
// 登录接口
export const login = params => { return axios.post(`/api/blog/admin/login`, params) }
// 获取所有用户信息
export const getUsers = params => { return axios.get(`/api/blog/getAccount?pageNum=${params.pageNum}`) }
// 注册账号
export const register = params => { return axios.post(`/api/blog/user/register`, params) }
// 获取管理员信息
export const getAdminInfo = () => { return axios.get(`/api/blog/admin/getAdminInfo`) }
// 保存编辑的管理员信息
export const setAdminInfo = params => { return axios.post(`/api/blog/admin/set_user_detail`, params) }
// 获取网站区域的浏览信息
export const getPageViewDate = params => { return axios.post(`/api/blog/admin/getPageViewDate`, params) }
// 保存文章
export const saveArticle = params => { return axios.post(`/api/blog/admin/save_article`, params) }

export const removeUser = params => { return axios.get(`/user/remove`, { params: params }) }

export const batchRemoveUser = params => { return axios.get(`/user/batchremove`, { params: params }) }

export const editUser = params => { return axios.get(`/user/edit`, { params: params }) }

export const addUser = params => { return axios.get(`/user/add`, { params: params }) }

export const getcitydata = () => { return axios.get('../../static/data/area.json') }
