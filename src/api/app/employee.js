import request from "@/utils/request"

export function getEmployeeTree(data = {}) {
  return request({
    url: '/member/getbindMemberInfo',
    method: 'post',
    params: data
  })
}
export function setEmployeeTree(data = {}) {
  return request({
    url: '/employee/setEmployeeTree',
    method: 'post',
    data
  })
}

export function getEmployeeTable(data = {}) {
  return request({
    url: '/member/getNobindMemberInfo',
    method: 'post',
    data
  })
}

export function setEmployeeTable(data = {}) {
  return request({
    url: '/employee/setEmployeeTable',
    method: 'post',
    data
  })
}

// 绑定员工 type:0 解绑 1绑定
export function bindMemberBy(data = {}) {
  return request({
    url: '/member/bindMemberBy',
    method: 'post',
    data
  })
}

// 创建员工
export function createMember(data = {}) {
  return request({
    url: '/member/createMember',
    method: 'post',
    data
  })
}

// 批量员工删除
export function memberBatchDelete(data) {
  return request({
    url: '/member/memberBatchDelete',
    method: 'post',
    params: data
  })
}

// 批量导入
export function matchImportMemberInfo(data) {
  return request({
    url: '/member/matchImportMemberInfo',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  })
}

// 批量导出 - 1
export function exportMemberInfo(data) {
  return request({
    url: '/member/exportMemberInfo',
    method: 'post',
    params: data
  })
}

// 批量导出 - 2
export function exportMemberInfo2(data) {
  return request({
    url: '/common/download/web',
    method: 'post',
    params: data
  })
}