<template>
  <div class='homePage'>
    {{ children }}
    <!--    <div v-for='item in children'>-->
    <!--      {{ item }}-->
    <!--    </div>-->
  </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { navStore } from '@/stores/navStore.ts'

const store = navStore()

const { currentNav } = storeToRefs(store)

let children = computed(() => {
  const map = new Map()
  let children = currentNav.value.children || []
  map.set(children, 'value')
  console.log('map', map)
  return map
})


console.log(children.value)
</script>


<style lang='less'>
.homePage {
  //display: flex;
  //align-items: center;
  //justify-content: center;
  //height: 100%;
}
</style>
