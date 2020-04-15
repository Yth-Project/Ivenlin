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
      // getRoutes(data).then(response => {
      //   const {
      //     menus
      //   } = response

      //   delete response.menus
      //   dispatch('user/getInfo', response, {
      //     root: true
      //   })
      //   resolve(menus)
      // }).catch(error => {
      //   reject(error)
      // })
      const menus = [
        {
        id:1,
        path:'/dept',
        name:'Dept',
        meta:{
          title :'物料类目管理',
          icon:'dashboard'
        }
        },
      {
        id:2,
        path:'/employee',
        name:'Employee',
        meta:{
          title :'供应商资料管理',
          icon:'dashboard'
        }
      },
      {
        id:3,
        path:'/finance',
        name:'Finance',
        meta:{
          title :'成品销售订单管理',
          icon:'dashboard'
        }
      },
        {
          id:4,
          path:'/phy',
        name:'Phy',
        meta:{
          title :'未发货订单',
          icon:'dashboard'
          }
          },
        {
          id:5,
          path:'/contract',
          name:'Contract',
          meta:{
            title :'已发货订单',
            icon:'dashboard'
          }
        },
        {
          id:6,
          path:'/auth',
          name:'Auth',
          meta:{
            title :'客户资料管理',
            icon:'dashboard'
          }
      }
    ]
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
