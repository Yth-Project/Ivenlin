import request from '@/utils/request'

export function getDeptList(data = {}) {
  return request({
    url: '/dept/getDeptListByCompanyId',
    method: 'post',
    data
  })
}

export function saveForm(data = {}) {
  return request({
    url: '/dept/addDept',
    method: 'post',
    data
  })
}

export function updateForm(data = {}) {
  return request({
    url: '/dept/updateDept',
    method: 'post',
    data
  })
}

export function deleteList(data = {}) {
  return request({
    url: '/dept/deleteDept',
    method: 'post',
    params: data
  })
}