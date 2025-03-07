// 参数类型:  element-plus Table-column API

import type { TableColumnCtx } from 'element-plus'
import type { VNode } from 'vue'
import { h } from 'vue'

interface ColumnItem {
  type?: 'default' | 'selection' | 'index' | 'expand'
  prop?: string
  label?: string
  width?: number
  useDynamicSlot?: boolean // 是否启用动态插槽, 插槽名为prop的值 prop='name' slot='name'
  formatter?: (
    // 自定义渲染内容，内容不复杂使用，复杂使用动态插槽
    row: any,
    column: TableColumnCtx<any>,
    cellValue: any,
    index: number,
  ) => string | VNode
  [key: string]: any
}

const TestTableColumns: ColumnItem[] = [
  {
    type: 'selection',
    width: 55,
  },
  {
    prop: 'date',
    label: 'date',
    formatter: (row) => {
      return row.date + row.name
    },
  },
  {
    prop: 'address',
    label: 'Address',
    formatter: (row) => {
      return h('div', {}, row.address + row.name)
    },
  },
  {
    prop: 'name',
    label: 'Address+22121212',
    useDynamicSlot: true,
  },
  {
    prop: 'test',
    label: 'testData',
  },
]

const EquipmentLogColumns: ColumnItem[] = [
  {
    prop: 'index',
    label: '序号',
    formatter: (row, column, val, index) => {
      return (index + 1).toString()
    },
  },
  {
    prop: 'name',
    label: '设备名称',
  },
  {
    prop: 'sn',
    label: '设备SN',
  },
  {
    prop: 'type',
    label: '事件类型',
  },
  {
    prop: 'val',
    label: '数值',
  },
  {
    prop: 'date',
    label: '时间日期',
  },
  {
    prop: 'remake',
    label: '备注',
  },
]
const AcquisitionRecordColumns: ColumnItem[] = [
  {
    prop: 'index',
    label: '序号',
    formatter: (row, column, val, index) => {
      return (index + 1).toString()
    },
  },
  {
    prop: 'date',
    label: '记录时间',
  },
  {
    prop: 'name',
    label: '提交用户',
  },
  {
    prop: 'eleEar',
    label: '电子耳号',
  },
  {
    prop: 'ear',
    label: '耳号',
  },
]

export enum ColumnsType {
  /** 测试 */
  Test = 'test',
  /**设备日志 */
  EquipmentLog = 'equipmentLog',
  /** 采集记录 */
  AcquisitionRecord = 'acquisitionRecord',
}

export const ColumnsMap = {
  [ColumnsType.Test]: TestTableColumns,
  [ColumnsType.EquipmentLog]: EquipmentLogColumns,
  [ColumnsType.AcquisitionRecord]: AcquisitionRecordColumns,
}
