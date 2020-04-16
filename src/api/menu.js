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
      /*getRoutes(data).then(response => {
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
      })*/
      const menus = [{
        id:1,
        path:'/test/1',
        name:'test1',
        meta:{
          title:'物料清单1',
          icon:''
        }
      },
      {
        id:2,
        path:'/test/2',
        name:'test2',
        meta:{
          title:'物料清单2',
          icon:''
        }
      },
      {
        id:3,
        path:'/test/3',
        name:'test3',
        meta:{
          title:'物料清单3',
          icon:''
        }
      },]
      resolve(menus)
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};