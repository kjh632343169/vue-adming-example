import { ElInput, ElDatePicker } from 'element-plus'
import CustomSelect from './CustomSelect.vue'

export type ComponentType = 'input' | 'select' | 'date'

const getComponentType = (type: ComponentType) => {
  const componentMap = {
    input: ElInput,
    select: CustomSelect, // select内容项定义在 为options.optionsList里
    date: ElDatePicker,
  }
  return componentMap[type] || ElInput
}

export { getComponentType }
