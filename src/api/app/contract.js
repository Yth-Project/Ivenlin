import request from '@/utils/request'

/**
 *  通过公司id获取合同 - 首页
 *  */
export function getContractByCompanyId(data = {}) {
  return request({
    url: '/contract/getContractByCompanyId',
    method: 'post',
    params: data
  })
}

// 通过合同ID获取套餐下拉
export function getPackByContractId(data = {}) {
  return request({
    url: '/contract/getPackByContractId',
    method: 'get',
    params: data
  })
}

export function toPdfFile(data = {}) {
  return request({
    url: '/contract/pdfContractFile',
    method: 'get',
    timeout: (60 * 1000),
    responseType: 'arraybuffer', // 设置返回数据格式
    params: data
  })
}

export function getContractListByCompanyId(data = {}) {
  return request({
    url: '/contract/getContractListByCompanyId',
    method: 'post',
    data
  })
}
