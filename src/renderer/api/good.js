import request from '@/utils/request'

export function fetchGood(params) {
  return request({
    url:'/good/info',
    method: 'get',
    params
  })
}
export function fetchGoodList(params) {
  return request({
    url:'/good/list',
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
export function updateGoodPriceMultiple(data) {
  return request({
    url: '/good/priceSetting/multiple',
    method: 'post',
    data
  })
}
export function updateGoodPriceSingle(data) {
  return request({
    url: '/good/priceSetting/single',
    method: 'post',
    data
  })
}
export function getPriceCurve(params) {
  return request({
    url: '/good/priceCurve',
    method: 'get',
    params
  })
}
export function editGoodInfo(data) {
  return request({
    url: '/good/modifyInfo',
    method: 'post',
    data
  })
}
