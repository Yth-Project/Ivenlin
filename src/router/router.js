export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  '/dept': () => import('@/views/app/dept/index'),
  '/employee': () => import('@/views/app/employee/index'),
  '/contract': () => import('@/views/app/contract/index'),
  '/finance': () => import('@/views/app/finance/index'),
  '/auth': () => import('@/views/app/auth/index'),
  '/phy': () => import('@/views/app/phy/index')
}
