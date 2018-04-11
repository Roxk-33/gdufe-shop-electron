import request from '@/utils/request'

export function fetchGood(params) {
  return request({
    url:'/good/info',
    method: 'get',
    params
  })
}
export function addGoodInfo(data) {
  return request({
    url:'/good/addInfo',
    method: 'post',
    data
  })
}

export function fetchAjaxGood(params) {
  return request({
    url:'/good/ajax/goodInfo',
    method: 'get',
    params
  })
}
export function updateGoodPrice(data) {
  return request({
    url: '/good/priceSetting',
    method: 'post',
    data
  })
}
