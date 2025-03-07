<template>
  <el-select v-model="value" v-bind="$attrs">
    <el-option v-for="item in optionsList" :key="item.value" v-bind="item"></el-option>
  </el-select>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
const value = defineModel()
const attrs = useAttrs()
const optionsList = computed(() => {
  return (attrs.optionsList || []) as any[]
})
</script>
