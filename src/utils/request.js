import axios from 'axios'
import store from '@/store'
import router from '@/router'
// baseURL设置/超时时间设置
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 全局注入token
instance.interceptors.request.use(config => {
  // 1. 获取token
  const { token } = store.state.user.profile
  // 2. 请求头设置token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, e => Promise.reject(e))

// token失效跳回到登录页
instance.interceptors.response.use(
  res => res.data,
  e => {
    if (e.response && e.response.status === 401) {
      // encodeURIComponent 转换uri编码，防止解析地址出问题
      const redirectUrl = encodeURIComponent(router.currentRoute.value.fullPath)
      router.replace('/login?redirectUrl=' + redirectUrl)
    }
    return Promise.reject(e)
  }
)

const request = (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
