import request from "@/utils/request"

export function memberContractPackDeptList(data) {
  return request({
    url: '/member/memberContractPackDeptList',
    method: 'post',
    data
  })
}

export function getPackByCompanyId(data) {
    return request({
        url: '/member/getPackByCompanyId',
        method: 'post',
        params: data
      })
}
