<template>
  <CustomSearch :searchConfig="searchConfig" />
  <CustomTable
    :data="testData"
    :columnsKey="ColumnsType.AcquisitionRecord"
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
import { RouteName } from '@/router/config.ts'
import { ref } from 'vue'
import CustomTable from '@/components/CustomTable/CustomTable.vue'
import CustomSearch from '@/components/CustomSearch/CustomSearch.vue'
import { ColumnsType } from '@/components/CustomTable/config'

defineOptions({ name: RouteName.AcquisitionRecord })

const searchConfig = ref([
  {
    type: 'date',
    label: '记录日期',
    prop: 'date',
    options: {
      type: 'daterange',
    },
  },
  {
    type: 'input',
    label: '提交用户',
    prop: 'user',
  },
  {
    type: 'select',
    label: '表单',
    prop: 'form',
    options: {
      optionsList: [
        {
          label: '默认表单',
          value: '1',
        },
      ],
    },
  },
])

const testData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    ear: 'No. 189, Grove St, Los Angeles',
    eleEar: '222',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    ear: 'No. 189, Grove St, Los Angeles',
    eleEar: '222',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    ear: 'No. 189, Grove St, Los Angeles',
    eleEar: '222',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    ear: 'No. 189, Grove St, Los Angeles',
    eleEar: '222',
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
