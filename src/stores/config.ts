interface cachedViewsItem {
  name: string
  key: string
  title: string
  scrollTop: number
}

// 按钮权限配置  使用:v-has = ’ButtonPermission.Test‘
const enum ButtonPermissionMap {
  Test = 'test',
}

export { ButtonPermissionMap }
export { type cachedViewsItem }
