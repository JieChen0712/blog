import axios from 'axios'
const querystring = require('querystring')

// axios.defaults.baseURL = 'http://127.0.0.1:8085'
axios.defaults.withCredentials = true
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = (data, headers) => { return headers['Content-Type'] === 'application/json' ? data : querystring.stringify(data) }

export const login = params => { return axios.post(`/api/blog/login`, params) }

export const requestLogin = params => { return axios.post(`/login`, params).then(res => res.data) }

export const getUserList = params => { return axios.get(`/user/list`, { params: params }) }

export const getUserListPage = params => { return axios.get(`/user/listpage`, { params: params }) }

export const removeUser = params => { return axios.get(`/user/remove`, { params: params }) }

export const batchRemoveUser = params => { return axios.get(`/user/batchremove`, { params: params }) }

export const editUser = params => { return axios.get(`/user/edit`, { params: params }) }

export const addUser = params => { return axios.get(`/user/add`, { params: params }) }

export const getcitydata = () => { return axios.get('../../static/data/area.json') }
