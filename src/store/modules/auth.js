import {
  getSysAdminListByCompanyId,
  addOrUpateUserAdmin,
  deleteUserByUserId
} from '@/api/app/auth'
const state = {
  list: {},
}
const mutations = {
  SET_LIST: (state, data) => {
    state.list = data
  },
}
const actions = {
  getList({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getSysAdminListByCompanyId(params).then(response => {
        commit('SET_LIST', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveForm({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      addOrUpateUserAdmin(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  removeRow({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      deleteUserByUserId(params).then(response => {
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
