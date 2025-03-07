interface SelectOption {
  label: string
  value: string
  disable?: boolean
}

export const AcquisitionRecordOptions: SelectOption[] = [
  {
    label: '全部',
    value: '0',
  },
  {
    label: '体重测量',
    value: '1',
  },
  {
    label: '体尺测量',
    value: '2',
  },
  {
    label: '电子耳号识别',
    value: '3',
  },
]
