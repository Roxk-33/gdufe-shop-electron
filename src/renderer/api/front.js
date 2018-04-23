import request from '@/utils/request'


export function cleanCart(data) {
  return request({
    url: '/front/good/clean',
    method: 'post',
    data
  })
}
export function addVip(data) {
  return request({
    url: '/front/vip/add',
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

export function updateCart(data) {
  return request({
    url: '/front/cart/update',
    method: 'post',
    data
  })
}

