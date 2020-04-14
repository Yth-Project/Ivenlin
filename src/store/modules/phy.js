  import {
    memberContractPackDeptList,
    getPackByCompanyId
  } from '@/api/app/phy'

  import {
    getDeptList
  } from '@/api/app/dept'

  const state = {
    list: {},
    options_dept: [], // 部门下拉
    options_package: [] // 套餐下拉
  }
  const mutations = {
    SET_LIST: (state, data) => {
      state.list = data
    },
    SET_OPTIONS_DEPT: (state, data) => {
      state.options_dept = data
    },
    SET_OPTIONS_PACKAGE: (state, data) => {
      state.options_package = data
    }
  }
  const actions = {
    getDeptOptions({
        commit
      }, params) {
        return new Promise((resolve, reject) => {
          getDeptList(params).then(response => {
            const arr = []
            response.dataList.map(item => {
              arr.push({
                id: item.id,
                name: item.deptName
              })
            })
            commit('SET_OPTIONS_DEPT', arr)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
    getPackageOptions({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        getPackByCompanyId(params).then(response => {
          commit('SET_OPTIONS_PACKAGE', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getList({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        memberContractPackDeptList(params).then(response => {
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
