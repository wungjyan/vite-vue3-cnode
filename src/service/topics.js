import { get } from '@/utils/request.js'

// 获取主题列表
export const getTopicsList = (params) => {
  return get('/topics', params)
}

// 获取主题详情
export const getTopicDetail = (id, params) => {
  return get('/topic/' + id, params)
}
