import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  pageObj: {
    size: 5, // 默认最大5页
    current: 1 // 默认第一页
  }
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_PAGEOBJ_SIZE: (state, size) => {
    state.pageObj.size = size
  },
  SET_PAGEOBJ_CURRENT: (state, current) => {
    state.pageObj.current = current
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setPageSize({ commit }, size) {
    commit('SET_PAGEOBJ_SIZE', size)
  },
  setPageCurrent({ commit }, current) {
    commit('SET_PAGEOBJ_CURRENT', current)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
