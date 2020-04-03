export const getType = state => {
  return atob(state.type)
}
export const getPower = state => {
  return atob(state.power)
}
export const getUserName = state => {
  return state.userName
}
export const getAvatar = state => {
  return state.avatar
}
