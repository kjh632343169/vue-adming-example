<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-input v-model="a"></el-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineOptions({ name: 'Product' })

const a = ref('')
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
