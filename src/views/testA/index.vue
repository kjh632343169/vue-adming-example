<template>
  <div>test Page A</div>
  <el-input v-model="value"></el-input>
</template>
<script lang="ts" setup>
import { RouteName } from '@/router/config.ts'
import { ref, onMounted } from 'vue'
import { TestAPI } from '@/api/test'

defineOptions({ name: RouteName.TestPageC })
const value = ref('')

const init = async () => {
  try {
    const result = await TestAPI.getTestData()
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  init()
})
</script>
