<template>
  <CustomSearch :searchConfig="searchConfig" />
  <CustomTable
    :data="testData"
    :columnsKey="ColumnsType.EquipmentLog"
    :total="1"
    @tableSelectChange="tableSelectChange"
    ref="customTable"
  >
  </CustomTable>
</template>

<script lang="ts" setup>
import { RouteName } from '@/router/config.ts'
import { ref } from 'vue'
import CustomTable from '@/components/CustomTable/CustomTable.vue'
import CustomSearch from '@/components/CustomSearch/CustomSearch.vue'
import { ColumnsType } from '@/components/CustomTable/config'
import { AcquisitionRecordOptions } from '@/config/SelectOptionsMap'

defineOptions({ name: RouteName.EquipmentLog })

const searchConfig = ref([
  {
    type: 'select',
    label: '事件类型',
    prop: 'type',
    options: {
      optionsList: AcquisitionRecordOptions,
    },
  },
  {
    type: 'date',
    label: '事件日期',
    prop: 'date',
    options: {
      type: 'daterange',
    },
  },
])

const testData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    type: 'No. 189, Grove St, Los Angeles',
    sn: '2221111213123',
    remake: 'hahha',
    val: '21323',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    type: 'No. 189, Grove St, Los Angeles',
    sn: '2222312412412',
    remake: '2e2113121',
    val: '213131',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    type: 'No. 189, Grove St, Los Angeles',
    sn: '222231241242143',
    remake: '12412341341',
    val: '1321313',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    type: 'No. 189, Grove St, Los Angeles',
    sn: '22224141241',
    remake: '213123123',
    val: '1231312',
  },
])

const customTable = ref(null)

const tableSelectChange = (val: any[]) => {
  console.log(val)
}
</script>
