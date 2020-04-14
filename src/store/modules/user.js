import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  getErrCount,
  setErrCount,
  removeErrCount
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'
import {
  getRoutes
} from "@/api/menu";
const state = {
  token: getToken(),
  name: '',
  avatar: require('@/assets/defaultHeader.jpg'),
  introduction: '',
  roles: [],
  errCount: getErrCount(),
  routes: [],
  obj: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_ERRCOUNT: (state, errCount) => {
    state.errCount = errCount
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_MENUS: (state, routes) => {
    state.routes = routes
  },
  SET_OBJ: (state, obj) => {
    state.obj = obj
  }
}


const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      account,
      password
    } = userInfo
    // JSON.stringify()
    return new Promise((resolve, reject) => {
      login({
        account: account.trim(),
        password: password
      }).then(response => {
        /* commit('SET_TOKEN', response.accessToken)
        setToken(response.accessToken) */
        setToken(response)
        commit('SET_TOKEN', response)
        removeErrCount()
        resolve()
      }).catch(error => {
        const errCount = !(!(Number(getErrCount())) && 1) && Number(getErrCount()) + 1;
        const ec = !errCount ? 1 : errCount
        commit('SET_ERRCOUNT', ec)
        setErrCount(ec)
        reject(error)
      })
    })
  },
  // get user info
  getInfo({
    commit,
    state,
    dispatch
  }, obj) {
    return new Promise((resolve, reject) => {
      /* const obj = { menus: menus }
      resolve(obj) */
      const data = {
        token: state.token
      }
      // 获取路由和用户静态资源
      getRoutes(data).then(response => {
        dispatch('menu/setMenusList', response.menus, {
          root: true
        })
        delete response.menus
        commit('SET_OBJ', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
    /*  return new Promise((resolve, reject) => {

       getInfo(state.token).then(response => {
         if (!response) {
           reject('获取用户信息，请重新登录')
         }
         const { roles, name, avatar, introduction } = response
         commit('SET_ROLES', roles)
         commit('SET_NAME', name)
         commit('SET_AVATAR', avatar)
         commit('SET_INTRODUCTION', introduction)
         resolve(response)
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     }) */
  },

  // user logout
  logout({
    commit,
    state,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()

        dispatch('tagsView/delAllViews', null, {
          root: true
        })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
