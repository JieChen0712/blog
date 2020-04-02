import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    type: '',
    power: '',
    userName: '',
    avatar: '/static/img/user.e333137.jpg'
  }
}

// 应用初始状态
const state = getDefaultState()

// 定义所需的 mutations
const mutations = {
  setType (state, val) {
    state.type = val
  },
  setPower (state, val) {
    state.power = val
  },
  setUserName (state, val) {
    state.userName = val
  },
  setAvatar (state, val) {
    state.avatar = val
  },
  resetState (state) {
    Object.assign(state, getDefaultState())
  }
}

// 使用action this.$store.getters.getCount
// 同步（不可异步）使用mutations this.$store.commit('INCREMENT')
// 可异步使用dispatch this.$store.dispatch('INCREMENT')

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
