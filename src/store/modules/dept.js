import {
  getDeptList,
  saveForm,
  updateForm,
  deleteList
} from '@/api/app/dept'

import {
  getContractByCompanyId,
  getPackByContractId
} from '@/api/app/contract'

const state = {
  list: [],
  pack_options: [],
  contract_options: []
}
const mutations = {
  SET_LIST: (state, data) => {
    state.list = data
  },
  SET_PACK_OPTIONS: (state, data) => {
    state.pack_options = data
  },
  SET_CONTRACT_OPTIONS: (state, data) => {
    state.contract_options = data
  }
}
const actions = {
  addList({
    commit
  }, params) {
    return new Promise((reslove, reject) => {
      saveForm(params).then(response => {
        reslove()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateList({
    commit
  }, params) {
    return new Promise((reslove, reject) => {
      updateForm(params).then(response => {
        reslove()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteList({
    commit
  }, params) {
    return new Promise((reslove, reject) => {
      deleteList(params).then(response => {
        reslove()
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchList({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getDeptList(params).then(response => {
        commit('SET_LIST', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchContractOptions({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getContractByCompanyId(params).then(response => {
        const arr = []
        for (const item of response) {
          arr.push({
            name: item.contractName,
            id: item.id
          })
        }
        commit('SET_CONTRACT_OPTIONS', arr)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPackOptions({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getPackByContractId(params).then(response => {
        commit('SET_PACK_OPTIONS', response)

        resolve()
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
