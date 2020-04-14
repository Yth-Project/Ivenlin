import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { addRouter } from './utils/addRouter'// 格式化菜单data

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

var hasMenu = false // 是否有路由

router.beforeEach(async(to, from, next) => {
  // start progress bar 加载进度条
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // 判断是否有路由
      const hasRoutes = store.getters.routes
      if (hasRoutes.length) {
        // 判断是否有用户信息
        const hasGetUserCompanyId = store.getters.userObj.companyId
       
        const hasGetUserToken = store.getters.token
        if (hasGetUserCompanyId && hasGetUserToken) {
          store.dispatch('app/setPageSize', 5)
          store.dispatch('app/setPageCurrent', 1)
          next()
        }
        if (!hasGetUserCompanyId && hasGetUserToken) {
          try {
            // get user info
            await store.dispatch('user/getInfo')
            next()
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('user/resetToken')
            Message.error(error || 'Has Error')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        }
      } else {
         // hasMenu为false,一定没有获取动态路由,就跳转到获取动态路由的方法
         gotoRouter(to, next)
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

function gotoRouter(to, next) {
  store.dispatch('menu/getRoutesByRule', store.getters.token) // 使用useid获取路由
    .then(data => {
      const asyncRouter = addRouter(data) // 进行递归解析
      // 一定不能写在静态路由里面,否则会出现,访问动态路由404的情况.所以在这列添加
      asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
      return asyncRouter
    })
    .then(asyncRouter => {
      router.addRoutes(asyncRouter) // vue-router提供的addRouter方法进行路由拼接
      const { length } = router.options.routes
      for (var i = 0; i < asyncRouter.length; i++) {
        router.options.routes[length + i] = asyncRouter[i] // addRoutes不会更新视图
      }
      hasMenu = true // 记录路由获取状态
      store.dispatch('menu/setRouterList', asyncRouter) // 存储到vuex
      store.dispatch('permission/generateRoutes', router.options.routes)
      next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    })
    .catch(e => {
      console.log(e)
      store.dispatch('user/resetToken')
    })
}
