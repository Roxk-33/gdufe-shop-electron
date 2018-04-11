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
    url: '/admin/purchase/delete',
    method: 'get',
    params
  })
}

export function addList(data) {
  return request({
    url: '/admin/purchase/add',
    method: 'post',
    data
  })
}

export function updateList(data) {
  return request({
    url: '/admin/purchase/storage',
    method: 'post',
    data
  })
}

