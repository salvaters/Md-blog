<template>
  <div class='navPage'>
    <div class='navList'>
      <!-- 文章分类导航 -->
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
import { ref, onMounted } from 'vue'
import Icon from '@/components/Icon/index.vue'
import { getFilePath } from '@/layouts/default/LeftMenu/nav/index.ts'
import { navStore } from '@/stores/navStore.ts'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = navStore()
const { currentNav } = storeToRefs(store)

// 响应式数据
let navList = ref<any[]>([])
let categories = ref<string[]>([])

// 点击导航
const handleNav = (item: any) => {
  store.setCurrentNav(item)
  // 跳转到文章列表页显示对应的文章分类
  router.push({ name: 'articles' })
}

// 加载导航数据
const loadNavigation = async () => {
  try {
    const result = await getFilePath()
    navList.value = result.navList
    categories.value = result.categories
  } catch (error) {
    console.error('加载导航数据失败:', error)
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadNavigation()
})
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
        opacity: 0.8;
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
