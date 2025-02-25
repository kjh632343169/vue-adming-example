import { useCacheStore } from '@/stores/routeCache'
import { createRouter, createWebHistory } from 'vue-router'
import { type RouteRecordRaw } from 'vue-router'

enum RouteName {
  Home = 'Home',
  Product = 'Product',
}

const routes = [
  {
    path: '/',
    name: RouteName.Home,
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '首页',
      keepAlive: true,
    },
  },
  {
    path: '/product/:id',
    name: RouteName.Product,
    component: () => import('@/views/AboutView.vue'),
    meta: {
      keepAlive: true,
      keyStrategy: 'path', // 动态参数路由使用 path 作为缓存 key
      refreshOnLeave: true, // 离开路由时自动刷新
    },
  },
]

const FlatRouteMap: {
  [prop: string]: RouteRecordRaw
} = {}

function getRouteParams(routeArr: RouteRecordRaw[]) {
  routeArr.map((item) => {
    if (item.name && item.path) {
      FlatRouteMap[item.name as string] = {
        redirect: '',
        path: item.path,
        name: item.name,
        meta: {
          ...item.meta,
        },
      }
    }
    if (item.children) {
      getRouteParams(item.children)
    }
    return ''
  })
}

getRouteParams(routes)

console.log('flatRouteMap', FlatRouteMap)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const cacheStore = useCacheStore()
  cacheStore.setCurRouteName(to.name as string)

  // 自动添加缓存
  if (to.meta.keepAlive) {
    cacheStore.addView(to as any)
  }

  // 处理需要刷新的路由
  if (from.meta.refreshOnLeave) {
    cacheStore.triggerReload(cacheStore.generateKey(from as any) as any)
  }
})

export default router

export { FlatRouteMap, RouteName }
