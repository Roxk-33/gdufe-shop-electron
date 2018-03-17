import request from '@/utils/request'

export function addGood(params) {
  return request({
    url: '/cart/in',
    method: 'get',
    params
  })
}
export function cleanCart(data) {
  return request({
    url: '/cart/clean',
    method: 'post',
    data
  })
}
export function addVip(data) {
  return request({
    url: '/vip/add',
    method: 'post',
    data
  })
}
export function checkVip(params) {
  return request({
    url: '/vip/check',
    method: 'get',
    params
  })
}