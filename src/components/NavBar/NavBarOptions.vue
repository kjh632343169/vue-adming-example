// navbar自定义内容位置 用户头像什么的
<template>
  <div class="nav-bar-options">
    <div>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon size="18"><ChromeFilled /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="userStore.logout()">退出登录</el-dropdown-item>
            <el-dropdown-item>其他按钮</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
</script>

<style scoped>
.nav-bar-options {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
