import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://cnodejs.org/api/v1',
  timeout: 5000
})

instance.interceptors.response.use(response => {
  console.log('响应===', response)
  if (response.status === 200) {
    return response.data
  }
}, error => {
  console.log('响应错误===', error)
})

export const get = (url, params) => instance.get(url, { params })

export const post = (url, data) => instance.post(url, data)

export default instance
