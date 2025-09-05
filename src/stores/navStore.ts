import { ref } from 'vue'
import { defineStore } from 'pinia'
// import { computed, ref } from 'vue'
// import { useColorMode } from '@vueuse/core'

export const navStore = defineStore('navStore', () => {

  let currentNav = ref({})

  // 设置当前导航
  const setCurrentNav = (val: any) => {
    currentNav.value = val
  }


  return {
    currentNav,
    setCurrentNav
  }
}, { persist: true })
