// 在指令文件中增加 watch 逻辑
import { watch } from 'vue'
import { useUserStore } from '@/stores/userStore'

function checkPermission(el: HTMLElement, value: string, store: ReturnType<typeof useUserStore>) {
  if (store.buttonPermissions.length === 0) {
    // 权限未加载时隐藏元素
    el.style.visibility = 'hidden'
    return
  }

  if (!store.hasPermission(value)) {
    el.style.display = 'none'
  } else {
    // 恢复显示
    el.style.display = ''
    el.style.visibility = 'visible'
  }
}

export const vHas = {
  mounted(el: HTMLElement, binding: any, vnode: any) {
    const store = useUserStore()

    const unwatch = watch(
      () => store.buttonPermissions,
      () => checkPermission(el, binding.value, store),
      { deep: true, immediate: true },
    )

    // 在卸载时自动清理监听
    vnode.el._unwatch = unwatch
  },
  unmounted(el: HTMLElement, binding: any, vnode: any) {
    if (vnode.el._unwatch) {
      vnode.el._unwatch()
    }
  },
}
