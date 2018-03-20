import request from '@/utils/request'


export function getAccountList() {
  return request({
    url: '/admin/account/list',
    method: 'get'
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

