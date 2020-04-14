// import _router from '../router/router' // 获取组件的方法

// /**
//  * 生成路由
//  * @param {Array} routerlist 格式化路由
//  * @returns
//  */
// export function addRouter(routerlist) {
//   const router = []
//   console.log(routerlist)
//   routerlist.forEach(e => {
//     let e_new = {
//       path: e.path || 'norouter-' + e.id,
//       name: e.name,
//       component: e.type === 2 ? _router('Layout') : _router(e.name || 'error')
//     }
//     if (e.redirect) { // 重定向
//       e_new = Object.assign({}, e_new, { redirect: e.redirect })
//     }

//     if (e.meta) { // meta
//       e_new = Object.assign({}, e_new, {
//         meta: { title: e.meta.title, icon: e.meta.icon }
//       })
//     }

//     if (e.children.length) { // 下级
//       e_new = Object.assign({}, e_new, { children: addRouter(e.children) })
//     }

//     e_new.component = e_new.component || _router('error')
//     router.push(e_new)
//   })

//   return router
// }

import _router from '../router/router' // 获取组件的方法

/**
 * 生成路由
 * @param {Array} routerlist 格式化路由
 * @returns
 */
export function addRouter(routerlist) {
  const router = []
  routerlist.forEach(e => {
    let e_new = {
      path: `${e.path}`,
      name: e.name || '',
      component: _router('Layout'),
      redirect: `${e.path}/index`,
      children: [{
        path: `index`,
        name: `index${e.id}`,
        component: _router(`${e.path}` || 'error'),
        meta: { title: e.meta.title, icon: e.meta.icon }
      }]
    }
    /* if (e.redirect) { // 重定向
      e_new = Object.assign({}, e_new, { redirect: e.redirect })
    } */

    /* if (e.meta) { // meta
      e_new = Object.assign({}, e_new, {
        meta: { title: e.meta.title, icon: e.meta.icon }
      })
    } */

    if (e.children && e.children.length) { // 下级
      e_new = Object.assign({}, e_new, { children: addRouter(e.children) })
    }

    e_new.component = e_new.component || _router('error')
    router.push(e_new)
  })
  return router
}

