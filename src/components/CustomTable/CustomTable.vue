<template>
  <div class="table-warper">
    <el-table
      ref="tableRef"
      border
      stripe
      :data="data"
      v-bind="tableParam"
      @selection-change="handleSelectionChange"
    >
      <template v-for="item in columnsList" :key="item.prop">
        <el-table-column v-if="!item.useDynamicSlot" v-bind="item"> </el-table-column>
        <slot v-else :name="item.prop" :prop="item"></slot>
      </template>
    </el-table>
    <el-pagination
      style="justify-content: flex-end"
      layout="prev, pager, next"
      hide-on-single-page
      :total="total"
      @change="pageChange"
      :page-size="pageSize"
    />
  </div>
</template>

<script lang="ts" setup>
import { ColumnsMap, ColumnsType } from '@/components/CustomTable/config'
import { computed, ref } from 'vue'
interface Props {
  data: any[]
  tableParam?: {
    [key: string]: any
  }
  columnsKey?: ColumnsType
  total: number
  pageSize?: number
  multipleSelection?: any[]
}

const props = withDefaults(defineProps<Props>(), {
  total: 0,
  pageSize: 10,
})

const tableRef = ref(null)

const emit = defineEmits(['pageChange', 'tableSelectChange'])

const multipleSelectionList = ref<any[]>(props.multipleSelection || [])

const columnsList = computed(() => {
  return props.columnsKey ? ColumnsMap[props.columnsKey] : []
})

const handleSelectionChange = (val: any[]) => {
  multipleSelectionList.value = val
  emit('tableSelectChange', val)
}

const pageChange = (currentPage: number, pageSize: number) => {
  emit('pageChange', currentPage, pageSize)
}

defineExpose({
  tableRef,
})
</script>
