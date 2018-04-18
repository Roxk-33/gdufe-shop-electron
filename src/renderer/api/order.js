import request from '@/utils/request'


export function getOrderList(params) {
  return request({
    url: '/order/list',
    method: 'get',
    params
  })
}
export function getOrderDetail(params) {
  return request({
    url: '/order/detail',
    method: 'get',
    params
  })
}
export function deleteOrder(params) {
  return request({
    url: '/order/delete',
    method: 'get',
    params
  })
}