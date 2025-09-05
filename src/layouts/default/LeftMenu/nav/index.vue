<template>
  <div class='navPage'>
    <div class='navList'>
      <div v-for='item in navList'
           :class="`item-nav ${ item.tag === currentNav.tag ? 'item-nav-active' : ''}`"
           @click='handleNav(item)'>
        <div class='img'>
          <Icon :url='item.img' />
        </div>
        <div class='titles'> {{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Icon from '@/components/Icon/index.vue'
import { getFilePath } from '@/layouts/default/LeftMenu/nav/index.ts'
import { navStore } from '@/stores/navStore.ts'
import { storeToRefs } from 'pinia'

let { navList } = getFilePath()

const store = navStore()

const { currentNav } = storeToRefs(store)

// 点击
const handleNav = (item: any) => {
  store.setCurrentNav(item)
}


</script>

<style lang='less' scoped>
.navPage {
  margin-top: 10px;

  .navList {

    .item-nav {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-bottom: 10px;
      padding: 1px 6px;
      border-radius: 6px;
      border: 1px solid rgba(0, 0, 0, 0);
      user-select: none;


      &:hover {
        background-color: var(--color-border-hover);
      }

      .img {
        margin-right: 5px;

        .IconSpan {
          width: 22px;
          color: var(--color-text);
          fill: var(--color-text);
        }
      }
    }

    .item-nav-active {
      border: 1px solid red;
    }
  }
}
</style>
