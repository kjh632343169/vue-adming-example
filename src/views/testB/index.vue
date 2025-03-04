<template>
  <CustomTable
    :data="testData"
    :columnsKey="ColumnsType.Test"
    :total="100"
    @tableSelectChange="tableSelectChange"
    ref="customTable"
  >
    <template #name="{ prop }">
      <el-table-column v-bind="prop">
        <template #default="scope">
          <el-button @click="testClick">{{ scope.row.name }}1111</el-button>
        </template>
      </el-table-column>
    </template>
  </CustomTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CustomTable from '@/components/CustomTable/CustomTable.vue'
import { ColumnsType } from '@/components/CustomTable/config'

const testData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])

const customTable = ref(null)

const testClick = () => {
  console.log('1111')
  // customTable.value.tableRef.clearSelection()
}

const tableSelectChange = (val: any[]) => {
  console.log(val)
}
</script>
