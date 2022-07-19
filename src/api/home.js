import request from '@/utils/request'

export function home (data) {
  return request('/home/index', 'get', data)
}
