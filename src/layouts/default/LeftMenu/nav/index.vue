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
      padding: 2px 8px;
      border-radius: 6px;
      user-select: none;
      transition: all 0.3s;


      &:hover {
        background-color: var(--left-menu-hover-attr);
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
      transition: all 0.3s;
      background: linear-gradient(45deg, var(--left-menu-active-attr-1), var(--left-menu-active-attr-3), var(--left-menu-active-attr-2));
    }
  }
}
</style>
