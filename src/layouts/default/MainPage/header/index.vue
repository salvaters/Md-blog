<template>
  <div class='headerPage'>
    <div class='left-nav'>
      <!-- 移动端菜单按钮 -->
      <div v-if='isMobile' class='menu-button' @click='toggleMobileMenu'>
        <Icon :url='menuIconUrl' />
      </div>

      <!-- 返回按钮 - 只在文章页面显示 -->
      <div v-if='showBackButton' class='back-button' title='返回首页' @click='goBack'>
        <Icon :url='backIconUrl' class='back-icon' />
        <span class='back-text'>返回</span>
        <span v-if='articleCategory' class='category-tag'>{{ articleCategory }}</span>
      </div>
    </div>

    <!-- 移动端快速导航 -->
    <div v-if='isMobile' class='mobile-quick-nav'>
      <div v-for='navItem in quickNavItems'
           :key='navItem.name'
           :class="`mobile-nav-item ${ currentRoute.name === navItem.name ? 'mobile-nav-active' : ''}`"
           @click='handleQuickNav(navItem)'>
        <Icon :url='navItem.icon' />
        <span>{{ navItem.label }}</span>
      </div>
    </div>

    <div class='right-nav'>
      <!-- 移动端搜索按钮 -->
      <div v-if='isMobile' class='mobile-search-button' @click='toggleMobileSearch'>
        <Icon :url='searchIconUrl' />
      </div>

      <!-- 主题切换按钮 -->
      <div :title='isDark === "dark" ? "切换到白天模式" : "切换到暗黑模式"' class='IconPage'
           @click='store.toggleTheme'>
        <Icon :url='IconUrl' />
      </div>
      <div class='timePage'>
        {{ formattedDate }}
      </div>
    </div>

    <!-- 移动端搜索弹窗 -->
    <div v-if='isMobile && showMobileSearch' class='mobile-search-overlay' @click='closeMobileSearch'>
      <div class='mobile-search-container' @click.stop>
        <div class='mobile-search-header'>
          <Icon :url='backIconUrl' class='close-search' @click='closeMobileSearch' />
          <span>站内搜索</span>
        </div>
        <div class='mobile-search-input'>
          <a-input
            v-model:value='searchName'
            placeholder='搜索文章...'
            @input='handleSearch'
            ref='mobileSearchInput'
          >
            <template #prefix>
              <SearchOutlined />
            </template>
          </a-input>
        </div>
        <!-- 移动端搜索结果 -->
        <div v-if='showSearchResults' class='mobile-search-results'>
          <SearchResults
            :has-searched='hasSearched'
            :search-results='searchResults'
            :search-term='searchName'
            @close='closeMobileSearch'
          />
        </div>
      </div>
    </div>

    <!-- 移动端侧边菜单 -->
    <div v-if='isMobile && showMobileMenu' class='mobile-menu-overlay' @click='closeMobileMenu'>
      <div class='mobile-menu-container' @click.stop>
        <div class='mobile-menu-header'>
          <div class='mobile-menu-user'>
            <div class='mobile-menu-avatar'>
              <img alt='' src='/src/assets/images/user.jpg'>
            </div>
            <div class='mobile-menu-name'>salvater</div>
          </div>
          <Icon :url='backIconUrl' class='close-menu' @click='closeMobileMenu' />
        </div>

  
        <!-- 移动端菜单导航 -->
        <div class='mobile-menu-nav'>
          <div v-for='item in mobileMenuNavList'
               :key='item.tag'
               :class="`mobile-menu-nav-item ${ item.tag === currentNav.tag ? 'mobile-menu-nav-active' : ''}`"
               @click='handleMobileMenuNavClick(item)'>
            <Icon :url='item.img' />
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useCounterStore } from '@/stores/counter.ts'
import Icon from '@/components/Icon/index.vue'
import { storeToRefs } from 'pinia'
// 监听路由变化，更新文章分类信息
import { computed, onBeforeMount, onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import moment from 'moment'
import { useRoute, useRouter } from 'vue-router'
import { SearchOutlined } from '@ant-design/icons-vue'
import SearchResults from '@/components/SearchResults/index.vue'
// @ts-ignore
import { searchArticles, getArticleCategories, generateArticlePaths } from '/utils/articleUtils'
import { getFilePath } from '@/layouts/default/LeftMenu/nav/index.ts'
import { navStore } from '@/stores/navStore.ts'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

const route = useRoute()
const router = useRouter()
const store = useCounterStore()
const navStoreInstance = navStore()
const { isDark } = storeToRefs(store)
const { currentNav } = storeToRefs(navStoreInstance)

// 移动端检测
const isMobile = ref(false)

// 移动端菜单和搜索状态
const showMobileMenu = ref(false)
const showMobileSearch = ref(false)


// 移动端菜单导航列表
const mobileMenuNavList = ref<any[]>([])

// 加载移动端菜单导航数据
const loadMobileMenuNav = async () => {
  try {
    const result = await getFilePath()
    mobileMenuNavList.value = result.navList
  } catch (error) {
    console.error('加载移动端菜单导航失败:', error)
  }
}

// 图标路径
const menuIconUrl = '/src/assets/svg/menu.svg'
const searchIconUrl = '/src/assets/svg/search.svg'

// 搜索相关变量
const searchName = ref('')
const searchResults = ref([])
const showSearchResults = ref(false)
const hasSearched = ref(false)
const mobileSearchInput = ref(null)

// 快速导航数据
const quickNavItems = ref([
  {
    name: 'home',
    label: '主页',
    icon: '/src/assets/svg/home.svg'
  },
  {
    name: 'about',
    label: '关于',
    icon: '/src/assets/svg/user.svg'
  }
])

// 当前路由
const currentRoute = computed(() => route)

// 检测是否为移动端
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// 监听窗口大小变化
const handleResize = () => {
  checkMobile()
}

// 切换移动端菜单
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

// 切换移动端搜索
const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value
  if (showMobileSearch.value) {
    nextTick(() => {
      mobileSearchInput.value?.focus()
    })
  }
}

// 关闭移动端搜索
const closeMobileSearch = () => {
  showMobileSearch.value = false
  searchName.value = ''
  searchResults.value = []
  hasSearched.value = false
  showSearchResults.value = false
}

// 处理快速导航点击
const handleQuickNav = (navItem: any) => {
  router.push({ name: navItem.name })
}

// 处理搜索
const handleSearch = () => {
  const query = searchName.value.trim()

  if (!query) {
    searchResults.value = []
    hasSearched.value = false
    showSearchResults.value = false
    return
  }

  // 防抖搜索，500ms后执行
  setTimeout(async () => {
    try {
      const results = await searchArticles(query)
      searchResults.value = results
      hasSearched.value = true
      showSearchResults.value = true
    } catch (error) {
      console.error('搜索失败:', error)
      searchResults.value = []
      hasSearched.value = true
      showSearchResults.value = true
    }
  }, 500)
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  showMobileMenu.value = false
}

// 处理移动端菜单导航点击
const handleMobileMenuNav = (navItem: any) => {
  closeMobileMenu()
  router.push({ name: navItem.name })
}

// 处理移动端菜单导航分类点击
const handleMobileMenuNavClick = (item: any) => {
  closeMobileMenu()
  navStoreInstance.setCurrentNav(item)
  router.push({ name: 'home' })
}


onMounted(() => {
  checkMobile()
  window.addEventListener('resize', handleResize)
  loadMobileMenuNav() // 加载移动端菜单导航数据
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// 暗黑 白天 切换
let IconUrl = computed(() => isDark.value === 'dark' ? '/src/assets/svg/light.svg' : '/src/assets/svg/dark.svg')

// 返回图标
const backIconUrl = '/src/assets/svg/back.svg'

// 当前文章分类
const articleCategory = ref('')

// 是否显示返回按钮（只在文章页面显示）
const showBackButton = computed(() => {
  return route.name === 'articleName'
})

// 返回首页
const goBack = () => {
  router.push({ name: 'home' })
}

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

watch(
  () => route.params.id,
  async (newId) => {
    if (newId && route.name === 'articleName') {
      try {
        // 获取所有文章分类
        const categories = await getArticleCategories()

        // 动态生成文章加载路径
        const articleId = newId as string
        const possiblePaths = generateArticlePaths(articleId, categories)

        let foundCategory = ''
        for (const path of possiblePaths) {
          try {
            await import(/* @vite-ignore */ path)
            foundCategory = path.split('/')[3] || ''
            break
          } catch (e) {

          }
        }

        articleCategory.value = foundCategory
      } catch (e) {
        console.error('检测文章分类失败:', e)
        articleCategory.value = ''
      }
    } else {
      articleCategory.value = ''
    }
  },
  { immediate: true }
)
</script>


<style lang='less'>
.headerPage {
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  background: var(--them-headerPage-background);
  box-shadow: 0 2px 6px 2px var(--them-headerPage-box-shadow);

  .left-nav {
    display: flex;
    align-items: center;

    .back-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: inherit;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid var(--left-menu-active-attr-1);
        border-radius: 20px;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }

      &:hover::before {
        opacity: 1;
      }

      &:hover {
        transform: translateX(-2px);
      }

      &:active {
        transform: translateY(0);
      }

      .back-icon {
        width: 16px;
        height: 16px;
        fill: var(--color-text, #333);
        transition: fill 0.3s ease;
      }

      .back-text {
        font-size: 13px;
        font-weight: 500;
        color: var(--color-text, #333);
        transition: color 0.3s ease;
        white-space: nowrap;
      }

      .category-tag {
        background: var(--left-menu-active-attr-1);
        padding: 2px 6px;
        border-radius: 8px;
        font-size: 11px;
        font-weight: 400;
        margin-left: 4px;
        backdrop-filter: blur(10px);
        border: 1px solid var(--left-menu-active-attr-1);
      }
    }
  }

  .right-nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0 15px;

    .IconPage {
      fill: var(--color-text);
      padding: 3px;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid transparent;

      &:hover {
        transform: scale(1.1);
      }

      svg {
        width: 28px;
        height: 28px;
      }
    }

    .timePage {
      font-size: 14px;
      white-space: nowrap;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .headerPage {
    .left-nav {
      .back-button {
        padding: 4px 8px;
        gap: 6px;

        .back-icon {
          width: 14px;
          height: 14px;
        }

        .back-text {
          font-size: 12px;
        }

        .category-tag {
          font-size: 10px;
          padding: 1px 4px;
          margin-left: 2px;
        }

        &:hover {
          transform: translateX(-2px);
        }
      }
    }

    .right-nav {
      gap: 0 10px;

      .IconPage {
        svg {
          width: 24px;
          height: 24px;
        }

        &:hover {
          transform: translateX(-2px);
        }
      }

      .timePage {
        font-size: 12px;
      }
    }

    // 菜单按钮
    .menu-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      background: linear-gradient(135deg, var(--left-menu-active-attr-1), var(--left-menu-active-attr-2));
      border: 1px solid var(--left-menu-active-attr-1);

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(143, 85, 208, 0.2);
      }

      svg {
        width: 18px;
        height: 18px;
        fill: var(--color-text);
      }
    }

    // 移动端快速导航
    .mobile-quick-nav {
      display: flex;
      align-items: center;
      gap: 8px;

      .mobile-nav-item {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 6px 12px;
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid transparent;

        &:hover {
          background: var(--left-menu-active-attr-1);
          transform: translateY(-1px);
        }

        &.mobile-nav-active {
          background: var(--left-menu-active-attr-1);
          border-color: var(--left-menu-active-attr-2);
        }

        svg {
          width: 16px;
          height: 16px;
          fill: var(--color-text);
        }

        span {
          font-size: 12px;
          color: var(--color-text);
          font-weight: 500;
          white-space: nowrap;
        }
      }
    }

    // 移动端搜索按钮
    .mobile-search-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      background: linear-gradient(135deg, var(--left-menu-active-attr-1), var(--left-menu-active-attr-2));
      border: 1px solid var(--left-menu-active-attr-1);

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(143, 85, 208, 0.2);
      }

      svg {
        width: 18px;
        height: 18px;
        fill: var(--color-text);
      }
    }

    // 移动端搜索弹窗
    .mobile-search-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 80px;
      backdrop-filter: blur(4px);

      .mobile-search-container {
        width: 90%;
        max-width: 400px;
        background: var(--color-background);
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        animation: slideUp 0.3s ease;

        .mobile-search-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: linear-gradient(135deg, var(--left-menu-active-attr-1), var(--left-menu-active-attr-2));
          border-bottom: 1px solid var(--color-border);

          .close-search {
            width: 20px;
            height: 20px;
            cursor: pointer;
            fill: var(--color-text);
            transition: transform 0.3s ease;

            &:hover {
              transform: rotate(90deg);
            }
          }

          span {
            font-size: 16px;
            font-weight: 600;
            color: var(--color-text);
          }
        }

        .mobile-search-input {
          padding: 16px 20px;

          .ant-input {
            border-radius: 12px;
            padding: 12px 16px;
            font-size: 16px;
            border: 2px solid var(--color-border);
            transition: border-color 0.3s ease;

            &:focus {
              border-color: var(--left-menu-active-attr-1);
              box-shadow: 0 0 0 3px rgba(143, 85, 208, 0.1);
            }
          }
        }

        .mobile-search-results {
          max-height: 400px;
          overflow-y: auto;
          padding: 0 20px 20px;
        }
      }
    }

    // 移动端侧边菜单
    .mobile-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      display: flex;
      backdrop-filter: blur(4px);

      .mobile-menu-container {
        width: 80%;
        max-width: 320px;
        height: 100%;
        background: var(--color-background);
        box-shadow: 2px 0 20px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        animation: slideInLeft 0.3s ease;
        display: flex;
        flex-direction: column;

        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          background: linear-gradient(135deg, var(--left-menu-active-attr-1), var(--left-menu-active-attr-2));
          border-bottom: 1px solid var(--color-border);

          .mobile-menu-user {
            display: flex;
            align-items: center;
            gap: 12px;

            .mobile-menu-avatar {
              width: 40px;
              height: 40px;
              border-radius: 20px;
              overflow: hidden;
              filter: drop-shadow(0 0 5px rgba(249, 202, 191, 1));

              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }

            .mobile-menu-name {
              font-size: 18px;
              font-weight: 600;
              color: var(--color-text);
            }
          }

          .close-menu {
            width: 24px;
            height: 24px;
            cursor: pointer;
            fill: var(--color-text);
            transition: transform 0.3s ease;

            &:hover {
              transform: rotate(90deg);
            }
          }
        }

  
        .mobile-menu-nav {
          flex: 1;
          overflow-y: auto;
          padding: 16px;

          .mobile-menu-nav-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            margin-bottom: 8px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid transparent;

            &:hover {
              background: var(--left-menu-active-attr-1);
              transform: translateX(4px);
            }

            &.mobile-menu-nav-active {
              background: linear-gradient(45deg, var(--left-menu-active-attr-1), var(--left-menu-active-attr-3), var(--left-menu-active-attr-2));
              border-color: var(--left-menu-active-attr-2);
            }

            svg {
              width: 22px;
              height: 22px;
              fill: var(--color-text);
            }

            span {
              font-size: 14px;
              color: var(--color-text);
              font-weight: 500;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .headerPage {
    .left-nav {
      .back-button {
        padding: 3px 6px;
        gap: 4px;

        .back-icon {
          width: 12px;
          height: 12px;
        }

        .back-text {
          font-size: 11px;
        }

        .category-tag {
          display: none;
        }
      }
    }

    .right-nav {
      gap: 0 8px;

      .IconPage {
        svg {
          width: 20px;
          height: 20px;
        }

        &:hover {
          transform: scale(1.02);
        }
      }

      .timePage {
        font-size: 11px;
      }
    }
  }
}

// 移动端菜单滑入动画
@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

// 移动端搜索弹窗动画
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
