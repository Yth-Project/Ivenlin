import {
  getContractByCompanyId,
  toPdfFile,
  getContractListByCompanyId
} from '@/api/app/contract'
const state = {
  list: [],
  listById: []
}
const mutations = {
  SET_LIST: (state, data) => {
    state.list = data
  },
  SET_LISTBYID: (state, data) => {
    state.listById = data
  }
}
const actions = {
  fetchList({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getContractListByCompanyId(params).then(response => {
        commit('SET_LIST', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchListById({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getContractByCompanyId(params).then(response => {
        commit('SET_LISTBYID', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getPreviewPdf({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      toPdfFile(params).then(response => {
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
