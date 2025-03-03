<template>
  <el-upload
    v-model:file-list="innerFileList"
    :action="actionUrl"
    :accept="acceptTypes"
    :multiple="multiple"
    :limit="maxCount"
    :before-upload="beforeUploadHandler"
    :http-request="customRequest"
    :on-exceed="handleExceed"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :list-type="listType"
    class="custom-uploader"
    :class="{ 'hide-upload': shouldHideUpload }"
  >
    <div v-if="$slots.default">
      <slot />
    </div>
    <el-button v-else type="primary">上传文件</el-button>
    <template #tip>
      <div class="el-upload__tip" v-if="showTips">
        支持格式：{{ acceptTypes }}，单文件不超过 {{ formatFileSize(maxSize) }}，最多上传
        {{ maxCount }} 个
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { UploadProps, UploadFile, UploadRequestHandler } from 'element-plus'
import { ElMessage } from 'element-plus'

interface Props {
  acceptTypes?: string // 例如 "image/png,image/jpeg"
  maxSize?: number // 单位字节
  maxCount?: number
  multiple?: boolean
  actionUrl?: string // 实际接口地址
  listType?: string
  showTips?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  acceptTypes: '*',
  maxSize: 5 * 1024 * 1024, // 默认5MB
  maxCount: 5,
  multiple: false,
  actionUrl: import.meta.url + '/upload',
  listType: 'picture',
  showTips: false,
})

const emit = defineEmits(['success', 'error', 'exceed'])

const innerFileList = ref<UploadFile[]>([])

// 计算是否隐藏上传按钮[9](@ref)
const shouldHideUpload = computed(() => innerFileList.value.length >= props.maxCount)

// 文件上传前校验[4,7](@ref)
const beforeUploadHandler: UploadProps['beforeUpload'] = (file) => {
  // 类型校验
  if (!validateFileType(file)) {
    ElMessage.error(`不支持 ${file.type} 格式`)
    return false
  }

  // 大小校验
  if (file.size > props.maxSize) {
    ElMessage.error(`文件大小不得超过 ${formatFileSize(props.maxSize)}`)
    return false
  }

  return true
}

// 自定义上传逻辑[6,4](@ref)
const customRequest: UploadRequestHandler = async (options) => {
  try {
    const formData = new FormData()
    formData.append('file', options.file)

    // 这里调用实际的上传接口
    const response = await fetch(props.actionUrl, {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      options.onSuccess?.(await response.json())
    } else {
      options.onError?.(new Error('Upload failed') as never)
    }
  } catch (error) {
    options.onError?.(error as Error as never)
  }
}

// 文件类型验证[5,7](@ref)
const validateFileType = (file: File): boolean => {
  const allowedTypes = props.acceptTypes.split(',').map((t) => t.trim())
  if (props.acceptTypes === '*' || allowedTypes.includes(file.type)) return true

  // 更严格的二进制验证（需要安装 file-type 库）
  // 此处可扩展真实类型验证逻辑
  return false
}

// 辅助方法：格式化文件大小[8](@ref)
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 事件处理[6,4](@ref)
const handleExceed: UploadProps['onExceed'] = () => {
  ElMessage.warning(`最多只能上传 ${props.maxCount} 个文件`)
  emit('exceed')
}

const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile, uploadFiles) => {
  emit('success', response, uploadFile, uploadFiles)
}

const handleError: UploadProps['onError'] = (error) => {
  emit('error', error)
}

const handleRemove: UploadProps['onRemove'] = (file) => {
  innerFileList.value = innerFileList.value.filter((f) => f.uid !== file.uid)
}
</script>

<style scoped>
.hide-upload :deep(.el-upload--picture-card) {
  display: none;
}
</style>
