import { ref } from 'vue'
import { defineStore } from 'pinia'

import { type MenuItem } from '@/components/NavMenu/config'

import { StorageType, removeLocalStorage } from '@/utils/storage'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const isMenuLoaded = ref(false)
  const menuList = ref<MenuItem[]>([])
  const toggleMenu = ref(false)
  const buttonPermissions = ref<string[]>([]) // 按钮权限列表

  const hasPermission = (val: string) => {
    return buttonPermissions.value.includes(val)
  }

  const checkIsMenuLoaded = () => {
    return isMenuLoaded.value
  }

  const setMenuLoaded = (data: any) => {
    isMenuLoaded.value = true
    //  跟根据后台返回配置菜单
    menuLoop(data, menuList.value)
  }

  const menuLoop = (routeArr: any[], routeListArr: MenuItem[]) => {
    routeArr.map((item) => {
      const obj = {} as MenuItem
      if (item.hideMenu) {
        return
      } else {
        obj.index = item.target as string
        obj.icon = (item.icon || '') as string
        obj.title = (item.name || '') as string
        if (item.children) {
          obj.children = []
          menuLoop(item.children, obj.children)
        }
        routeListArr.push(obj)
      }
    })
  }

  const logout = () => {
    console.log('退出登录逻辑')
    removeLocalStorage(StorageType.Token)
  }

  return {
    token,
    menuList,
    toggleMenu,
    buttonPermissions,
    checkIsMenuLoaded,
    setMenuLoaded,
    logout,
    hasPermission,
  }
})
