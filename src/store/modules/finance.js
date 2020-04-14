import {getContractFinanceListByCompanyId} from '@/api/app/finance'
const state = {
  list: {}
}
const mutations = {
  SET_LIST: (state, data) => {
    state.list = data
  }
}
const actions = {
  getList({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
        getContractFinanceListByCompanyId(params).then(response => {
          commit('SET_LIST', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
