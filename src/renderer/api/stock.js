import request from '@/utils/request'

export function goodINstock(data) {
  return request({
    url: '/stock/in',
    method: 'post',
    data
  })
}