import request from '@/utils/request'

export function getSysAdminListByCompanyId(data) {
  return request({
    url: '/user/getSysAdminListByCompanyId',
    method: 'post',
    data
  })
}

export function addOrUpateUserAdmin(data) {
  return request({
    url: '/user/addOrUpateUserAdmin',
    method: 'post',
    data
  })
}

export function deleteUserByUserId(data) {
  return request({
    url: '/user/deleteUserByUserId',
    method: 'post',
    params: data
  })
}
