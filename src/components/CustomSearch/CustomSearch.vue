<template>
  <div ref="searchRef" class="search-container">
    <el-form ref="formRef" :model="formData" inline label-position="right">
      <el-form-item
        v-for="item in searchConfig"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
      >
        <!-- 动态组件渲染 -->
        <component
          :is="getComponentType(item.type as ComponentType)"
          v-bind="item.options"
          v-model="formData[item.prop]"
        />
      </el-form-item>
      <!-- 占位内容 -->
      <el-form-item v-for="(item, index) in placeholderArr" :key="item + index"></el-form-item>
      <!-- 操作按钮 -->
      <el-form-item class="option-item" label=" ">
        <el-button @click="queryData" type="primary">查询</el-button>
        <el-button @click="clearData">重置</el-button>
        <el-button v-if="!hideExport" @click="exportData">导出</el-button>
        <!-- 自定义操作按钮 -->
        <slot name="custom"></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { onMounted, onUnmounted, ref, type PropType } from 'vue'
import type { ComponentType } from './config'
import { getComponentType } from './config'

interface SearchItem {
  type: string
  prop: string
  label: string
  options?: { [key: string]: any } // 组件参数
  defaultValue?: any //默认值
}

const props = defineProps({
  searchConfig: { type: Array as PropType<SearchItem[]>, required: true },
  hideExport: { type: Boolean, default: false },
})

const emit = defineEmits(['query', 'clear', 'export'])

const getFormData = () => {
  const defaultFormData = {} as any
  props.searchConfig.map((i) => {
    defaultFormData[i.prop] = i.defaultValue || ''
  })

  return defaultFormData
}

const formData = ref(getFormData())
const formRef = ref<InstanceType<typeof ElForm>>()
const searchRef = ref(null)
const placeholderArr = ref<any[]>([])
let observer = null as any

const clearData = () => {
  formRef.value?.resetFields()
  emit('clear', formData.value)
}

const queryData = () => {
  emit('query', formData.value)
}

const exportData = () => {
  emit('export', formData.value)
}

onMounted(() => {
  observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width } = entry.contentRect
      const len = Math.floor(width / 310)
      const formLength = props.searchConfig.length + 1
      let arr = []
      if (formLength <= len) {
        arr = new Array(len - formLength).fill('1')
      } else {
        arr = new Array(len - (formLength % len)).fill('1')
      }
      if (arr.length === placeholderArr.value.length) {
        return
      } else {
        placeholderArr.value = arr
      }
    }
  })
  observer.observe(searchRef.value) // 开始观察元素‌:ml-citation{ref="1,2" data="citationList"}
})

onUnmounted(() => {
  if (observer) observer.disconnect() // 组件卸载时取消监听‌:ml-citation{ref="1,2" data="citationList"}
})
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
}

:deep(.el-form-item) {
  min-width: 310px !important;
  margin-right: 0px !important;
}

:deep(.el-form-item__label) {
  width: 90px !important;
}
</style>
