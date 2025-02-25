<script setup lang="ts">
import { onActivated, onDeactivated, ref } from 'vue'

defineOptions({ name: 'Home' })

const test = ref('')
onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时

  console.log('onActivated')
})

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
  console.log('onDeactivated')
})
</script>

<template>
  <main>
    <el-button>1111</el-button>
    <el-input v-model="test"></el-input>
  </main>
</template>
