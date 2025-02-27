import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { ElMessage, ElLoading } from 'element-plus'

interface ResponseData<T = any> {
  code: number
  data: T
  message?: string
}

console.log('环境变量')
console.log(import.meta.env.VITE_APP_ENV)
console.log(import.meta.env.VITE_API_BASE)

// 创建 Axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

// 全局 Loading 控制
// let loadingInstance: ReturnType<typeof ElLoading.service>
// let requestCount = 0

// const showLoading = () => {
//   if (requestCount === 0) {
//     loadingInstance = ElLoading.service({
//       lock: true,
//       text: '加载中...',
//       background: 'rgba(0, 0, 0, 0.5)',
//     })
//   }
//   requestCount++
// }

// const hideLoading = () => {
//   requestCount--
//   if (requestCount === 0) loadingInstance?.close()
// }

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // showLoading()
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // hideLoading()
    const { code, data, message, id } = response.data as ResponseData

    //  可自定义业务数据正常返回结构和内容
    if (code === 200 || id) return response.data
    else {
      ElMessage.error(message || '请求错误')
      return Promise.reject(new Error(message || 'Error'))
    }
  },
  (error) => {
    // hideLoading()
    const status = error.response?.status
    const errorMap: { [key: number]: string } = {
      400: '请求参数错误',
      401: '登录过期，请重新登录',
      403: '拒绝访问',
      404: `请求地址出错: ${error.config.url}`,
      500: '服务器内部错误',
    }
    ElMessage.error(errorMap[status] || error.message)
    return Promise.reject(error)
  },
)

// 封装请求方法
async function request<T = any>(
  url: string,
  config: AxiosRequestConfig = {},
): Promise<AxiosResponse<T, any>['data']> {
  try {
    const result = await service.request<any, T>({
      url,
      ...config,
      // 自定义请求头内容
      headers: {
        Authorization: `Bearer ${''}`,
        Timestamp: Date.now(),
        ...config.headers,
      },
    })
    return result
  } catch (err: any) {
    // todo 错误处理
    console.log(err)
    return Promise.reject(err)
  }
}

export default request
