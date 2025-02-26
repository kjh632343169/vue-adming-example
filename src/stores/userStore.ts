import { ref } from 'vue'
import { defineStore } from 'pinia'

import { type MenuItem } from '@/components/NavMenu/config'
import type { RouteRecordRaw } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const isMenuLoaded = ref(false)
  const menuList = ref<MenuItem[]>([])

  const checkIsMenuLoaded = () => {
    return isMenuLoaded.value
  }

  const setMenuLoaded = (data: any) => {
    isMenuLoaded.value = true
    //  跟根据后台返回配置菜单
    loop(data, menuList.value)
  }

  const loop = (routeArr: RouteRecordRaw[], routeListArr: MenuItem[]) => {
    routeArr.map((item) => {
      const obj = {} as MenuItem
      if (item.meta?.hideMenu) {
        return
      } else {
        obj.index = item.name as string
        obj.icon = (item.meta?.icon || '') as string
        obj.title = (item.meta?.title || '') as string
        if (item.children) {
          obj.children = []
          loop(item.children, obj.children)
        }
        routeListArr.push(obj)
      }
    })
  }

  return { token, menuList, checkIsMenuLoaded, setMenuLoaded }
})
