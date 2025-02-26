<template>
  <div class="nav-menu">
    <!-- <div>customHeader</div> -->
    <div @click="toggleFlag = !toggleFlag" class="menu-icon">
      <el-icon v-if="toggleFlag"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="toggleFlag"
      :default-active="curRouteName"
      router
    >
      <RecursiveMenu :menu-list="menuList" />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import RecursiveMenu from './RecursiveMenu.vue'
import { useCacheStore } from '@/stores/routeCache'
import { useUserStore } from '@/stores/userStore'

const cacheStore = useCacheStore()
const userStore = useUserStore()

const { curRouteName } = storeToRefs(cacheStore)
const { menuList } = storeToRefs(userStore)

const toggleFlag = ref(false)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.nav-menu {
  background: #fff;
  padding-top: 10px;
  height: 100%;
}

.menu-icon {
  display: flex;
  justify-content: end;
}
</style>
