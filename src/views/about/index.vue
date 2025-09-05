<template>
  <div class='aboutPage'>

    <!--    <VideoText
          fontSize='150'
          src='https://cdn.magicui.design/ocean-small.webm'
          style='width: 100%; height: 500px'
        >
          salvater
        </VideoText>-->

    <BlurReveal
      :delay='0.2'
      :duration='0.75'
      class='p-8'
    >
      <!--      <h2 class='text-3xl font-bold tracking-tighter xl:text-6xl/none sm:text-5xl'>salvater👋</h2>-->
      <!--      <img alt='' src='../assets/images/about.png'>-->
      <img alt='' src='../assets/images/user.jpg'>
      <h2>salvater</h2>
      不自重者，取辱。不自长者，取祸。
      不自满者，受益。不自足者，博闻。
      <!--      <span class='text-pretty text-xl tracking-tighter xl:text-4xl/none sm:text-3xl'>-->

      <!--      </span>-->
    </BlurReveal>
  </div>
</template>

<script lang='ts' setup>
import BlurReveal from '@/components/motion/BlurReveal/index.vue'
</script>


<style lang='less'>
.aboutPage {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
