import {
  getContractByCompanyId
} from '@/api/app/contract'

const state = {
  list: []
}
const mutations = {
  SET_LIST: (state, data) => {
    state.list = data
  }
}
const actions = {
  fetchList({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getContractByCompanyId(params).then(response => {
        commit('SET_LIST', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
