import request from '@/utils/request'

export function getContractFinanceListByCompanyId(data) {
  return request({
    url: '/contract/getContractFinanceListByCompanyId',
    method: 'post',
    data
  })
}
