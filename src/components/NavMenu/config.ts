import { Edit, Calendar, Tickets } from '@element-plus/icons-vue'

interface MenuItem {
  index: string
  icon: string
  title: string
  children?: MenuItem[]
}

const IconMap = {
  Edit,
  Calendar,
  Tickets,
}

export type { MenuItem }
export { IconMap }
