import request from '@/utils/request'


export function addGoodInfo(data) {
  return request({
    url: '/admin/good/info',
    method: 'post',
    data
  })
}

export function fetchGood(params) {
  return request({
    url: '/admin/good/ajax/goodInfo',
    method: 'get',
    params
  })
}