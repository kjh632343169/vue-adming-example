<template>
  <div class="nav-menu">
    <div class="nav-menu-header">
      <el-icon size="18"><ElementPlus /></el-icon>
      <span v-if="changeToggleMenu">表型数据平台</span>
    </div>
    <el-menu
      class="nav-menu-content"
      @open="handleOpen"
      @close="handleClose"
      :collapse="toggleMenu"
      :default-active="curRouteName"
      router
    >
      <RecursiveMenu :menu-list="menuList" />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import RecursiveMenu from './RecursiveMenu.vue'
import { useCacheStore } from '@/stores/routeCache'
import { useUserStore } from '@/stores/userStore'
import { ref, watch } from 'vue'

const cacheStore = useCacheStore()
const userStore = useUserStore()

const { curRouteName } = storeToRefs(cacheStore)
const { menuList, toggleMenu } = storeToRefs(userStore)
const changeToggleMenu = ref(true)

watch(
  () => toggleMenu.value,
  () => {
    if (toggleMenu.value) {
      changeToggleMenu.value = false
    } else {
      setTimeout(() => {
        changeToggleMenu.value = true
      }, 300)
    }
  },
)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.nav-menu-header {
  height: 60px;
  border-bottom: 1px solid rgb(239, 239, 245);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.nav-menu {
  background: #fff;
  height: 100%;
}

.menu-icon {
  display: flex;
  justify-content: end;
}
</style>
