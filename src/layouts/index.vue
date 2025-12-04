<template>
  <div class='layout-main'>
    <a-config-provider :theme='themes'>
      <!-- 桌面端显示LeftMenu -->
      <LeftMenu v-if='!isMobile' />
      <MainPage />
    </a-config-provider>
  </div>
</template>

<script lang='ts' setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { theme } from 'ant-design-vue'
import LeftMenu from './default/LeftMenu/index.vue'
import MainPage from './default/MainPage/index.vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter.ts'

const store = useCounterStore()
const { isDark } = storeToRefs(store)

// 移动端检测
const isMobile = ref(false)

// 检测是否为移动端
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// 监听窗口大小变化
const handleResize = () => {
  checkMobile()
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const themes = computed(() => ({
  algorithm: isDark.value === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
  token: {
    colorPrimary: 'rgba(249, 202, 191, 1)'
  }
}))
</script>

<style lang='less'>
.layout-main {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0);
  display: flex;

  // 左侧导航宽度
  --navWidth: 260px;
  --layoutMargin: 10px;

  // 移动端布局调整
  @media (max-width: 768px) {
    flex-direction: column;
    --layoutMargin: 5px;
  }
}
</style>
