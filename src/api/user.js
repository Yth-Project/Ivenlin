import request from '@/utils/request'
// /user/login
export function login(data) {
  return request({
    url: '/user/userLogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(data) {
  return request({
    url: '/user/loginOut',
    method: 'post',
    data
  })
}

