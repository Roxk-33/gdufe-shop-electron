import request from '@/utils/request'


export function fetchVipList(params) {
  return request({
    url:'/vip/list',
    method: 'get',
    params
  })
}
export function deleteVip(params) {
  return request({
    url:'/vip/delete',
    method: 'get',
    params
  })
}