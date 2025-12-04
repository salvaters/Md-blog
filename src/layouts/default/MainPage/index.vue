<template>
  <div class='MainPage'>
    <!--    <GlowBorder :border-radius='10' :color="['#FFBE7B', '#FE8FB5', '#A07CFE']" :duration='5' />-->
    <TagHeader />
    <div class='RouterViewMainPage'>
      <RouterView class='RouterView' />
    </div>
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
  flex: 1;
  border: 1px rgba(47, 204, 36, 0.2) solid;

  .RouterViewMainPage {
    height: calc(100% - 50px);

    .RouterView {
      overflow: auto;
      height: 100%;
    }
  }

  // 移动端布局调整
  @media (max-width: 768px) {
    height: calc(100% - 10px);
    margin: 5px;
    border-radius: 8px;

    .RouterViewMainPage {
      height: calc(100% - 60px); // 移动端header稍高
    }
  }
}
</style>
