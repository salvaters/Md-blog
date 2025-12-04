---
title: Vue3组合式API实战
date: 2024-11-15
description: 深入了解Vue3组合式API的使用方法和最佳实践
---

# Vue3组合式API实战

Vue3的组合式API为我们提供了更灵活的代码组织方式，让我们能够更好地复用逻辑和构建可维护的应用程序。

## 核心概念

### 1. setup() 函数

```vue
<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// 响应式数据
const count = ref(0)
const user = reactive({ name: 'John', age: 30 })

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 生命周期
onMounted(() => {
  console.log('组件已挂载')
})
</script>
```

### 2. 响应式系统

- **ref()**: 用于基础类型的响应式数据
- **reactive()**: 用于对象类型的响应式数据
- **computed()**: 创建计算属性
- **watch()**: 监听数据变化

### 3. 逻辑复用

组合式API最大的优势在于逻辑复用：

```javascript
// useCounter.js
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue

  return {
    count,
    increment,
    decrement,
    reset
  }
}
```

## 最佳实践

1. **逻辑分离**: 将相关的逻辑组合在一起
2. **可复用性**: 创建可复用的组合函数
3. **类型安全**: 充分利用TypeScript的类型检查
4. **性能优化**: 合理使用computed和watch

组合式API让我们能够构建更加模块化和可维护的Vue应用。