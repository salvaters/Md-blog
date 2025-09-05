<template>
  <div class='MainPage'>
    <!--    <GlowBorder :border-radius='10' :color="['#FFBE7B', '#FE8FB5', '#A07CFE']" :duration='5' />-->
    <TagHeader />
    <RouterView class='RouterView' />
  </div>
</template>
<script lang='ts' setup>
import { RouterView } from 'vue-router'
import TagHeader from './header/index.vue'
// import GlowBorder from '@/components/motion/GlowBorder/index.vue'
// console.log(counter)
</script>


<style lang='less' scoped>
.MainPage {
  height: calc(100% - 20px);
  position: relative;
  z-index: 1;
  backdrop-filter: blur(1px);
  border-radius: 10px;
  overflow: hidden;
  margin: var(--layoutMargin);
  padding: 0 20px 20px 20px;
  flex: 1;
  border: 1px rgba(47, 204, 36, 0.2) solid;

  .RouterView {
    overflow: auto;
    height: 100%;
  }
}
</style>
