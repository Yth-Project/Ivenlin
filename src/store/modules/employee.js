import {
  getEmployeeTree,
  setEmployeeTree,
  getEmployeeTable,
  bindMemberBy,
  createMember,
  memberBatchDelete,
  matchImportMemberInfo,
  exportMemberInfo
} from '@/api/app/employee'

import {
  getDeptList
} from '@/api/app/dept'
// 通过部门获取员工
async function fetchMemberByDeptId(deptList, companyCode, dispatch) {
  const _this = this
    await Promise.all(deptList.map(item => (async () => {
      dispatch('employee/fetchEmployeeList', {
      deptId: item.id,
      companyCode: companyCode
    })
    .then(res => {
    })
    })()));
}
const state = {
  deptList: [],
  treeList: [],
  tableList: {}
}
const mutations = {
  SET_DEPTLIST: (state, data) => {
    state.deptList = data
  },
  SET_TREELIST: (state, data) => {
    state.treeList = data
  },
  SET_TABLELIST: (state, data) => {
    state.tableList = data
  }
}
const actions = {
  saveForm({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      createMember(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  exports({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      exportMemberInfo(params).then(response => {
        /* exportMemberInfo2({
          boolean: true,
          dowmType: 0,
          fileName: response
        }).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        }) */
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imports({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      matchImportMemberInfo(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delMember({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      memberBatchDelete(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchDeptList({
    commit,
    dispatch
  }, params) {
    return new Promise((resolve, reject) => {
      getDeptList(params).then(response => {
        const arr = []
        response.dataList.map(item => {
          arr.push({
            id: item.id,
            label: item.deptName,
            children: []
          })
        })
        // fetchMemberByDeptId(arr,params.companyCode,dispatch)
        commit('SET_DEPTLIST', arr)
        resolve(arr)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchEmployeeList({
    commit,
    state
  }, params) {
    const {
      deptId
    } = params
    return new Promise((resolve, reject) => {
      getEmployeeTree(params).then(response => {
        // deptId用来判断当前的部门node
        state.deptList.map(item => {
          // 匹配list 找到对应的下标数组
          if (deptId === item.id) {
            item.children = []
            response.map(child => {
              item.children.push({
                id: child.id,
                label: child.name,
                leaf: true,
                idCard: child.idCard
    
              })
            })
          }
        })
       // commit('SET_TREELIST', state.deptList)
        return
        const arr = []
        response.map(item => {
          arr.push({
            id: item.id,
            label: item.name,
            leaf: true,
            idCard: item.idCard

          })
        })
        commit('SET_TREELIST', arr)
        resolve(arr)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchTableList({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getEmployeeTable(params).then(response => {
        commit('SET_TABLELIST', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addTreeList({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      setEmployeeTree(params).then(response => {
        commit('SET_TREELIST', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  unBindEmployee({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      bindMemberBy(params).then(response => {
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
