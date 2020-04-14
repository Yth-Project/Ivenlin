import {
  getRoutes
} from "@/api/menu";
import {
  StaticRouterMap
} from "@/router";
import {
  getToken
} from '@/utils/auth'

const state = {
  routes: [],
  menus: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes;
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus;
  }
};

const actions = {
  setRouterList({
    commit
  }, routerList) {
    // 进行路由拼接并存储
    commit("SET_ROUTES", StaticRouterMap.concat(routerList));
  },
  setMenusList({
    commit
  }, menus) {
    commit("SET_MENUS", menus);
  },

  getRoutesByRule({
    commit,
    state,
    dispatch
  }, menus) {
    return new Promise((resolve, reject) => {
      /* const obj = { menus: menus }
      resolve(obj) */
      const data = {
        token: getToken()
      }
      getRoutes(data).then(response => {
        const {
          menus
        } = response

        delete response.menus
        dispatch('user/getInfo', response, {
          root: true
        })
        resolve(menus)
      }).catch(error => {
        reject(error)
      })
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
