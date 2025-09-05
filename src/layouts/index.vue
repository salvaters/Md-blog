<template>
  <div class='layout-main'>
    <a-config-provider :theme='themes'>
      <LeftMenu />
      <MainPage />
    </a-config-provider>
  </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import { theme } from 'ant-design-vue'
import LeftMenu from './default/LeftMenu/index.vue'
import MainPage from './default/MainPage/index.vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter.ts'

const store = useCounterStore()
const { isDark } = storeToRefs(store)
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
}
</style>
