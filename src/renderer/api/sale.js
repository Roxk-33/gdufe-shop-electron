import request from '@/utils/request'

export function addGood(params) {
  return request({
    url: '/front/good/in',
    method: 'get',
    params
  })
}
export function cleanCart(data) {
  return request({
    url: '/front/good/clean',
    method: 'post',
    data
  })
}
export function addVip(data) {
  return request({
    url: '/font/vip/add',
    method: 'post',
    data
  })
}
export function checkVip(params) {
  return request({
    url: '/front/vip/check',
    method: 'get',
    params
  })
}