import request from '@/utils/request'

export function getSale(params) {
  return request({
    url: '/admin/statistics/sale',
    method: 'get',
    params
  })
}
export function getGood(params) {
  return request({
    url: '/admin/statistics/good',
    method: 'get',
    params
  })
}