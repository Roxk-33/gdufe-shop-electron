import request from '@/utils/request'

    
export function fetchList(params) {
  return request({
    url: '/admin/purchase/list',
    method: 'get',
    params
  })
}
export function fetchListDetail(params) {
  return request({
    url: '/admin/purchase/detail',
    method: 'get',
    params
  })
}
export function delList(params) {
  return request({
    url: '/admin/purchase/del',
    method: 'get',
    params
  })
}

