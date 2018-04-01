import request from '@/utils/request'


export function getAccountList(params) {
  return request({
    url: '/admin/account/list',
    method: 'get',
    params
  })
}
export function addAccount(data) {
  return request({
    url: '/admin/account/add',
    method: 'post',
    data
  })
}
export function editAccount(data) {
  return request({
    url: '/admin/account/edit',
    method: 'post',
    data
  })
}
export function delAccount(params) {
  return request({
    url: '/admin/account/delete',
    method: 'get',
    params
  })
}

