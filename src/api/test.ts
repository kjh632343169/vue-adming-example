import request from '@/utils/request'
import data from './testMenu.json'

console.log(data)

// 测试相关接口
export const TestAPI = {
  // 获取用户列表
  getTestData() {
    return request<{ [props: string]: string | number }>('/', {
      baseURL: 'https://international.v1.hitokoto.cn',
      method: 'GET',
    })
  },
  // 模拟后台菜单数据返回
  getUserMenu() {
    return data
  },
}
