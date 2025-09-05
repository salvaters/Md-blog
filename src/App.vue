<template>
  <div class='AppPage'>
    <layouts />
    <!--    <ParticlesBg-->
    <!--      :color="isDark === 'light' ? '#a100ff' : '#ffffff'"-->
    <!--      :ease='50'-->
    <!--      :quantity='250'-->
    <!--      :staticity='20'-->
    <!--      class='absolute inset-0'-->
    <!--      refresh-->
    <!--    />-->
  </div>
</template>

<script lang='ts' setup>
import layouts from './layouts/index.vue'
// import ParticlesBg from '@/components/motion/ParticlesBg/index.vue'
import { useCounterStore } from './stores/counter.ts'
import { storeToRefs } from 'pinia'

const store = useCounterStore()
const { isDark } = storeToRefs(store)
</script>

<style lang='less'>
.AppPage {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(90deg, #80808012 1px, transparent 0), linear-gradient(180deg, #80808012 1px, transparent 0);
  background-size: 50px 50px;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(0, 0, 0, 0);
}
</style>
