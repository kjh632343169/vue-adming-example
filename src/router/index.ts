import { createRouter, createWebHistory } from 'vue-router'

import { useCacheStore } from '@/stores/routeCache'
import { useUserStore } from '@/stores/userStore'

import { TestAPI } from '@/api/test'

enum RouteName {
  Home = 'Home',
  Product = 'Product',
  Login = 'Login',
  TestPageA = 'TestPageA',
  TestPageB = 'TestPageB',
  TestPageC = 'TestPageC',
}

const routes = [
  {
    path: '/',
    name: RouteName.Home,
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      keepAlive: true,
      hideMenu: true,
    },
  },
  {
    path: '/login',
    name: RouteName.Login,
    component: () => import('@/views/login/index.vue'),
    meta: {
      layout: false,
      hideMenu: true,
      title: '登录',
      // keepAlive: true,
    },
  },
  // 动态路由配置
  // {
  //   path: '/product/:id',
  //   name: RouteName.Product,
  //   component: () => import('@/views/AboutView.vue'),
  //   meta: {
  //     keepAlive: true,
  //     keyStrategy: 'path', // 动态参数路由使用 path 作为缓存 key
  //     hideMenu: true,
  //   },
  // },
  // {
  //   path: '/testPageA',
  //   name: RouteName.TestPageA,
  //   // component: () => import('@/views/testA/index.vue'),
  //   meta: {
  //     keepAlive: true,
  //     icon: 'Calendar',
  //     title: '测试页面A',
  //   },
  //   redirect: '/testPageB',
  //   children: [
  //     {
  //       path: '/testPageB',
  //       name: RouteName.TestPageB,
  //       component: () => import('@/views/testB/index.vue'),
  //       meta: {
  //         keepAlive: true,
  //         icon: 'Edit',
  //         title: '测试页面B',
  //       },
  //     },
  //     {
  //       path: '/testPageC',
  //       name: RouteName.TestPageC,
  //       component: () => import('@/views/testA/index.vue'),
  //       meta: {
  //         keepAlive: true,
  //         icon: 'Calendar',
  //         title: '测试页面C',
  //       },
  //     },
  //   ],
  // },
]

// const FlatRouteMap: {
//   [prop: string]: RouteRecordRaw
// } = {}

// function getRouteParams(routeArr: RouteRecordRaw[]) {
//   routeArr.map((item) => {
//     if (item.name && item.path) {
//       FlatRouteMap[item.name as string] = {
//         redirect: item.redirect as string,
//         path: item.path,
//         name: item.name,
//         meta: {
//           ...item.meta,
//         },
//       }
//     }
//     if (item.children) {
//       getRouteParams(item.children)
//     }
//     return ''
//   })
// }

// getRouteParams(routes)

// console.log('flatRouteMap', FlatRouteMap)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const loopRoute = (dataList: any[], routeList: any[]) => {
  dataList.forEach((item) => {
    let route = {
      redirect: item.redirect || '',
      path: item.path,
      name: item.name,
      component: item.component ? () => import(item.component) : null,
      meta: item.meta,
      children: [],
    }
    if (item.children && item.children.length) {
      loopRoute(item.children, route.children)
    }
    routeList.push(route)
  })
}

router.beforeEach(async (to, from, next) => {
  const cacheStore = useCacheStore()
  const userStore = useUserStore()
  cacheStore.setCurRouteName(to.name as string)

  if (!userStore.checkIsMenuLoaded()) {
    const data = await TestAPI.getUserMenu() // 请求后端接口
    console.log(data)
    const routeList = [] as any[]
    loopRoute(data, routeList)
    console.log(routeList)
    routeList.map((i) => {
      router.addRoute(i)
    })
    userStore.setMenuLoaded(data)
    next({ ...to, replace: true }) // 重定向确保路由生效
  }

  // 自动添加缓存
  if (to.meta.keepAlive) {
    cacheStore.addView(to as never)
  }
  // 处理需要刷新的路由
  if (from.meta.refreshOnLeave) {
    cacheStore.triggerReload(cacheStore.generateKey(from as never) as never)
  }
  next()
})

export default router

export { RouteName, routes }
