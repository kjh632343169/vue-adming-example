import { ElInput, ElSelect, ElDatePicker } from 'element-plus'

export type ComponentType = 'input' | 'select' | 'date'

const getComponentType = (type: ComponentType) => {
  const componentMap = {
    input: ElInput,
    select: ElSelect,
    date: ElDatePicker,
  }
  return componentMap[type] || ElInput
}

export { getComponentType }
