// 按照字段对数组进行分类
export const groupBy = (arr, key) => arr.reduce((acc, obj) => {
  const groupKey = obj[key];
  (acc[groupKey] = acc[groupKey] || []).push(obj)
  return acc
}, {})

