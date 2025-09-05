<template>
  <div v-html='props.content' />
</template>

<script lang='ts' setup>
import { onMounted } from 'vue'
import { setCopyButtonClick } from './index.ts'

let props = defineProps({
  content: {
    type: String,
    require: true
  }
})
onMounted(() => setCopyButtonClick())
</script>

<style lang='less'>
@import '@/assets/md';
@import 'highlight.js/styles/atom-one-dark.min.css';
</style>
