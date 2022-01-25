import { get } from '@/utils/request.js'

// 获取主题列表
export const getTopicsList = (params) => {
  return get('/topics', params)
}
