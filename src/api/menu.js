import request from '@/utils/request'

export function getRoutes(data) {
  return request({
    url: '/user/getResourceByToken',
    method: 'post',
    params: {
      token: data.token
    }
  })
}
