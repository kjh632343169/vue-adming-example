import { defineStore } from 'pinia'
import { nextTick, ref } from 'vue'

import { type RouteRecordRaw } from 'vue-router'
import { type cachedViewsItem } from './config'

export const useCacheStore = defineStore('cache', () => {
  const curRouteName = ref('')
  const cachedViews = ref<cachedViewsItem[]>([])
  const refreshMap = ref(new Map())

  const addView = (route: RouteRecordRaw) => {
    const name = route.name as string
    const key = generateKey(route) as string
    const title = (route.meta?.title || '') as string
    const index = cachedViews.value.findIndex((i) => {
      return i.name === name
    })

    if (index === -1) {
      cachedViews.value.push({
        name,
        key,
        title,
        scrollTop: 0,
      })
    } else {
      cachedViews.value[index].key = key
    }
  }

  const setCurRouteName = (name: string) => {
    curRouteName.value = name
  }

  const setScrollTop = (route: RouteRecordRaw) => {
    const key = generateKey(route) as string
    const index = cachedViews.value.findIndex((i) => i.key === key)
    if (index > -1) {
      const scrollContainer = document.querySelector('.page-view-content')
      cachedViews.value[index].scrollTop = scrollContainer?.scrollTop || 0
    }
  }

  const generateKey = (route: RouteRecordRaw) => {
    return route.meta?.keyStrategy === 'path' ? route.path : route.name
  }

  const removeView = (name: string) => {
    cachedViews.value = cachedViews.value.filter((v) => v.name !== name)
  }

  const shouldReload = (route: RouteRecordRaw) => {
    const key = generateKey(route)
    return refreshMap.value.get(key) ?? true
  }

  const triggerReload = (routeKey: string) => {
    refreshMap.value.set(routeKey, false)
    nextTick(() => {
      refreshMap.value.set(routeKey, true)
    })
  }

  return {
    curRouteName,
    cachedViews,
    refreshMap,
    addView,
    generateKey,
    removeView,
    shouldReload,
    triggerReload,
    setCurRouteName,
    setScrollTop,
  }
})
