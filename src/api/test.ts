import request from '@/utils/request'

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
    return [
      {
        path: '/testPageA',
        name: 'TestPageA',
        // component: () => import('@/views/testA/index.vue'),
        meta: {
          keepAlive: true,
          icon: 'Calendar',
          title: '测试页面A',
        },
        component: '',
        redirect: '/testPageB',
        children: [
          {
            path: '/testPageB',
            name: 'TestPageB',
            component: '../views/testB/index.vue',
            meta: {
              keepAlive: true,
              icon: 'Edit',
              title: '测试页面B',
            },
          },
          {
            path: '/testPageC',
            name: 'TestPageC',
            component: '../views/testA/index.vue',
            meta: {
              keepAlive: true,
              icon: 'Calendar',
              title: '测试页面C',
            },
          },
        ],
      },
    ]
  },
}
