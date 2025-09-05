<template>
  <span class='IconSpan' v-bind='props' v-html='svgValue' />
</template>

<script lang='ts' setup>
import { onBeforeMount, ref, watchEffect } from 'vue'

let svgValue = ref('')

let props = defineProps({ url: { type: String, default: '' } })


onBeforeMount(() => {
  watchEffect(() => {
    let _url = props.url
    if (_url) {
      svgUrl(_url)
    }
  })
})

const svgUrl = async (val: string) => {
  const res = await fetch(val)
  let svg = await res.text()
  svgValue.value = svg
  return svg
}
</script>

<style lang='less'>
.IconSpan {
  width: 35px;
  height: 35px;
  fill: inherit;

  svg {
    width: inherit;
    height: inherit;
    fill: inherit;
  }
}
</style>
