<template>
  <CustomSearch :searchConfig="searchConfig" />
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
  <el-input v-model="testValue"></el-input>
  <div v-has="'admin'">admin</div>
  <div v-has="'test'">Test</div>
</template>

<script lang="ts" setup>
import { RouteName } from '@/router/config.ts'
import { ref } from 'vue'
import CustomTable from '@/components/CustomTable/CustomTable.vue'
import CustomSearch from '@/components/CustomSearch/CustomSearch.vue'
import { ColumnsType } from '@/components/CustomTable/config'

defineOptions({ name: RouteName.TestPageB })

const searchConfig = ref([
  {
    type: 'input',
    label: '姓名',
    prop: 'name',
  },
  {
    type: 'input',
    label: '姓名',
    prop: 'name1',
  },
  {
    type: 'input',
    label: '姓名',
    prop: 'name2',
  },
  {
    type: 'input',
    label: '姓名',
    prop: 'name3',
  },
  {
    type: 'input',
    label: '姓名姓名行',
    prop: 'name4',
  },
  {
    type: 'date',
    label: '时间',
    prop: 'name5',
  },
])

const testValue = ref('')

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
