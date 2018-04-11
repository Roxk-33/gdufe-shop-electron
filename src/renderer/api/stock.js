import request from '@/utils/request'


export function fetchStockList(params) {
  return request({
    url:'/stock/inventory/list',
    method: 'get',
    params
  })
}
export function fetchGoodType() {
  return request({
    url: '/stock/inventory/type',
    method: 'get',
  })
}

//损耗API

export function addLossList(data) {
  return request({
    url: '/stock/loss/add',
    method: 'post',
    data
  })
}

export function getLossList(params) {
  return request({
    url: '/stock/loss/list',
    method: 'get',
    params
  })
}
export function getLossDetail(params) {
  return request({
    url: '/stock/loss/detail',
    method: 'get',
    params
  })
}
