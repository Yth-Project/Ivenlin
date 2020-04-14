const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  userObj: state => state.user.obj,
  permission_routes: state => state.permission.routes,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  routes: state => state.menu.routes,
  dept: state => state.dept, // 部门
  home: state => state.home, // 物料管理系统
  employee: state => state.employee, // 员工
  auth: state => state.auth, // 全选
  finance: state => state.finance, // 财务
  contract: state => state.contract, // 合同
  phy: state => state.phy, // 员工体检
  pageObj: state => state.app.pageObj
}
export default getters
