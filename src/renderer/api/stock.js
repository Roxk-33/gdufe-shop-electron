import request from '@/utils/request'

export function goodINstock(data) {
  return request({
    url: '/stock/in',
    method: 'post',
    data
  })
}
export function fetchStockList(params) {
  return request({
    url: '/admin/stock/list',
    method: 'get',
    params
  })
}
export function fetchGoodType() {
  return request({
    url: '/admin/stock/type',
    method: 'get',
  })
}