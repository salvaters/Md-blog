<template>
  <div class='headerPage'>
    <div class='left-nav'>
    </div>
    <div class='right-nav'>
      <div class='IconPage' @click='store.toggleTheme'>
        <Icon :url='IconUrl' />
      </div>
      <div class='timePage'>
        {{ formattedDate }}
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useCounterStore } from '@/stores/counter.ts'
import Icon from '@/components/Icon/index.vue'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, ref } from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

const store = useCounterStore()
const { isDark, isLightTheme } = storeToRefs(store)

// 暗黑 白天 切换
let IconUrl = computed(() => isDark.value === 'dark' ? '/src/assets/svg/light.svg' : '/src/assets/svg/dark.svg')

// 获取当前时间
let currentDate = () => {
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  const dayOfWeek = weekdays[moment().day()]
  return moment().format(`MM月DD日 周${dayOfWeek} HH:mm`)
}

let formattedDate = ref(currentDate())

onBeforeMount(() => {
  setInterval(() => {
    formattedDate.value = currentDate()
  }, 1000)
})
</script>


<style lang='less'>
.headerPage {
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;

  .right-nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0 15px;

    .IconPage {
      //border: 1px solid red;
      fill: var(--color-text);
      padding: 3px;
      border-radius: 5px;
      cursor: pointer;

      svg {
        width: 28px;
        height: 28px;
      }
    }

    .timePage {

    }
  }


}
</style>
