import request from '@/utils/request'


export function addGoodInfo(data) {
  return request({
    url: '/admin/good/info',
    method: 'post',
    data
  })
}