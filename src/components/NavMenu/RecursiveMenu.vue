<template>
  <template v-for="item in menuList" :key="item.index">
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.index.toString()">
      <template #title>
        <el-icon><component :is="getIconComponent(item.icon)" /></el-icon>
        <span>{{ item.title }}</span>
      </template>
      <!-- 递归调用自身渲染子菜单 -->
      <RecursiveMenu :menuList="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.index.toString()">
      <el-icon><component :is="getIconComponent(item.icon)" /></el-icon>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { type MenuItem } from './config'
import { IconMap } from './config'

defineProps<{
  menuList: MenuItem[]
}>()

// 定义一个函数，根据图标名称获取对应的图标组件
const getIconComponent = (iconName: string) => {
  return IconMap[iconName as keyof typeof IconMap] || null
}
</script>
