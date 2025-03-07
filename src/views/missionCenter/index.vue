<template>
  <div class="mission-warper">
    <el-card class="card-item">
      <div class="create-item">
        <el-icon size="50"><Plus /></el-icon>
        新增任务表单
      </div>
    </el-card>
    <el-card class="card-item">
      <div>1111111</div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { RouteName } from '@/router/config'
defineOptions({ name: RouteName.MissionCenter })
</script>

<style scoped>
.mission-warper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.card-item {
  width: 250px;
  height: 200px;
}

:deep(.el-card__body) {
  height: 100%;
}

.create-item {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
}
</style>
