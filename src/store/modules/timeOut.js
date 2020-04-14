import { getCurrentTimeOut, setCurrentTimeOut, removeCurrentTimeOut } from '@/utils/timeOut'

const state = {
  time: getCurrentTimeOut()
}

const mutations = {
  SET_CURRENTTIME: (state, currentTime) => {
    state.time = currentTime
  }
}

const actions = {
  // user login
  getCurrentTime() {
    getCurrentTimeOut()
  },
  setCurrentTime({ commit }, current) {
    commit('SET_CURRENTTIME', current)
    setCurrentTimeOut(current)
  },
  delCurrentTime() {
    removeCurrentTimeOut()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
