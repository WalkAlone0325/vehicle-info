export type CascaderOption = {
  mergerName: string
  name: string
  code: string
  children?: CascaderOption[]
}

export function findChildrenByCode(data: CascaderOption[], code?: string, dataSource?: CascaderOption[]): CascaderOption[] | null {
  if (!code) {
    return data
  }
  for (const item of data) {
    if (item.code === code) {
      item.children = dataSource
      return item.children || null
    }
    if (item.children) {
      const childrenResult = findChildrenByCode(item.children, code)
      if (childrenResult) {
        return childrenResult
      }
    }
  }
  return null
}
