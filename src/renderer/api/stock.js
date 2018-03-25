import request from '@/utils/request'

export function goodINstock(data) {
  return request({
    url: '/stock/in',
    method: 'post',
    data
  })
}
export function getStockList(params) {
  return request({
    url: '/admin/stock/list',
    method: 'get',
    params
  })
}