import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useColorMode } from '@vueuse/core'

export const useCounterStore = defineStore('counter', () => {
  // 响应式地跟踪系统主题偏好
  const systemIsDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

  // 监听系统主题变化
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const updateSystemTheme = (e: any) => {
    systemIsDark.value = e.matches
  }

  mediaQuery.addEventListener('change', updateSystemTheme)

  // 用户选择的主题
  const isDark = useColorMode({
    initialValue: systemIsDark.value ? 'dark' : 'light'
  })

  // 计算属性：当前是否是浅色主题
  const isLightTheme = computed(() => isDark.value === 'light')

  // 切换主题
  const toggleTheme = () => {
    isDark.value = isDark.value === 'dark' ? 'light' : 'dark'
  }

  // 在store销毁时移除监听器
  const onCleanup = () => {
    mediaQuery.removeEventListener('change', updateSystemTheme)
  }

  return {
    systemIsDark,
    isLightTheme,
    toggleTheme,
    onCleanup,
    isDark
  }
})
