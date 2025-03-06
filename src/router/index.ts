import { createRouter, createWebHistory } from 'vue-router'
import { StorageType, setLocalStorage } from '@/utils/storage'

import { useCacheStore } from '@/stores/routeCache'
import { useUserStore } from '@/stores/userStore'

import { TestAPI } from '@/api/test'
import { RouteName } from './config'

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

//  该方法可自行调整内容
const loopRoute = (dataList: any[], routeList: any[]) => {
  dataList.forEach((item) => {
    const redirect = item.children?.[0]?.router || ''
    const route = {
      redirect: redirect ? '/' + redirect : '',
      path: item.router ? '/' + item.router : '',
      name: item.target || '',
      meta: {
        keepAlive: true,
        icon: item.icon,
        title: item.name || '',
      },
      children: [],
      component: null as any,
    }
    if (item.router) {
      route.component = () => import(/* @vite-ignore */ '../views/' + item.router + '/index.vue')
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
  let isGetNext = false

  if (!userStore.checkIsMenuLoaded()) {
    try {
      //  add 单点登录逻辑
      const token = to.query.token || ''
      if (token) {
        setLocalStorage(StorageType.Token, token)
      }

      const data = await TestAPI.getUserMenu() // 请求后端菜单接口
      const routeList = [] as any[]
      loopRoute(data, routeList)
      routeList.map((i) => {
        router.addRoute(i)
      })
      isGetNext = true
      userStore.setMenuLoaded(data) // 设置左侧菜单内容
      next({ ...to, replace: true }) // 重定向确保路由生效
    } catch (error) {
      console.log(error)
    }
  }

  // 自动添加缓存
  if (to.meta.keepAlive) {
    cacheStore.addView(to as never)
  }
  cacheStore.setScrollTop(from as never)
  // 处理需要刷新的路由
  if (from.meta.refreshOnLeave) {
    cacheStore.triggerReload(cacheStore.generateKey(from as never) as never)
  }

  if (!isGetNext) next()
})

export default router

export { routes }
