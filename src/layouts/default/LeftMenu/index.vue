<template>
  <div class='LeftMenuPage'>
    <GlowBorder :border-radius='10' :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" />

    <!-- logo -->
    <div class='top-log'>
      <div class='img'><img alt='' src='../../../assets/images/user.jpg'></div>
      <div
        class='name'>
        salvater
      </div>
    </div>

    <!-- quick-nav -->
    <div class='quick-nav'>
      <div class='nav-grid'>
        <div
          v-for='navItem in quickNavItems'
          :key='navItem.name'
          :class="`nav-item ${ currentRoute.name === navItem.name ? 'nav-item-active' : ''}`"
          @click='handleQuickNav(navItem)'>
          <div class='nav-icon'>
            <Icon :url='navItem.icon' />
          </div>
          <div class='nav-label'>{{ navItem.label }}</div>
        </div>
      </div>
    </div>

    <!-- search -->
    <div ref='searchContainer' class='search-div'>
      <div class='NeonBorder-main'>
        <NeonBorder animationType='full' class='NeonBorder'>
          <a-input
            v-model:value='searchName'
            class='input-search size-full'
            placeholder='站内搜索'
            @focus='handleSearch'
            @input='handleSearch'
          >
            <template #prefix>
              <SearchOutlined />
            </template>
          </a-input>
        </NeonBorder>
      </div>

      <!-- 搜索结果 -->
      <div v-if='showSearchResults' class='search-results-container'>
        <SearchResults
          :has-searched='hasSearched'
          :search-results='searchResults'
          :search-term='searchName'
          @close='closeSearchResults'
        />
      </div>
    </div>

    <!-- nav -->
    <navPage />
  </div>
</template>

<script lang='ts' setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import NeonBorder from '@/components/motion/NeonBorder/index.vue'
import GlowBorder from '@/components/motion/GlowBorder/index.vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import Icon from '@/components/Icon/index.vue'
import navPage from './nav/index.vue'
import SearchResults from '@/components/SearchResults/index.vue'
// @ts-ignore
import { searchArticles } from '/utils/articleUtils'
import { useRoute, useRouter } from 'vue-router'

let searchName = ref('')
const searchResults = ref([])
const showSearchResults = ref(false)
const hasSearched = ref(false)
const searchContainer = ref<HTMLElement | null>(null)
// @ts-ignore
let searchTimer: NodeJS.Timeout | null = null

const router = useRouter()
const route = useRoute()

// 快速导航数据
const quickNavItems = ref([
  {
    name: 'home',
    label: '首页',
    icon: '/src/assets/svg/home.svg'
  },
  {
    name: 'about',
    label: '关于',
    icon: '/src/assets/svg/user.svg'
  }
  // {
  //   name: 'articles',
  //   label: '文章',
  //   icon: '/src/assets/svg/book.svg'
  // },
  // {
  //   name: 'my',
  //   label: '我的',
  //   icon: '/src/assets/svg/profile.svg'
  // }
])

// 当前路由
const currentRoute = computed(() => route)

// 处理搜索
const handleSearch = () => {
  // 清除之前的定时器
  if (searchTimer) {
    clearTimeout(searchTimer)
  }

  const query = searchName.value.trim()

  if (!query) {
    searchResults.value = []
    hasSearched.value = false
    showSearchResults.value = false
    return
  }

  // 防抖搜索，500ms后执行
  searchTimer = setTimeout(async () => {
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

// 处理快速导航点击
const handleQuickNav = (navItem: any) => {
  router.push({ name: navItem.name })
}

// 关闭搜索结果
const closeSearchResults = () => {
  showSearchResults.value = false
  searchName.value = ''
  searchResults.value = []
  hasSearched.value = false
}

// 点击外部关闭搜索结果
const handleClickOutside = (event: MouseEvent) => {
  if (searchContainer.value && !searchContainer.value.contains(event.target as Node)) {
    showSearchResults.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
})
</script>


<style lang='less'>

.LeftMenuPage {
  height: calc(100% - 20px);
  position: relative;
  z-index: 1;
  backdrop-filter: blur(1px);
  border-radius: 10px;
  overflow: hidden;
  margin: var(--layoutMargin);
  width: var(--navWidth);
  padding: 20px;
  //box-shadow: 0 0 5px #ff9966,
  //0 0px 5px #ff5e62,
  //0 0px 5px #6a11cb;

  //box-shadow: 0 0 5px rgba(249, 202, 191, 1);


  .top-log {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    margin-bottom: 15px;

    .img {
      width: 40px;
      height: 40px;
      border-radius: 100px;
      overflow: hidden;
      margin-right: 8px;
      filter: drop-shadow(0 0 5px rgba(249, 202, 191, 1));

      img {
        width: 100%;
      }
    }

    .name {
      font-size: 22px;
      font-weight: bold;

    }
  }

  .quick-nav {
    margin-bottom: 20px;

    .nav-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;

      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        //aspect-ratio: 1;
        border-radius: 12px;
        //background: var(--color-bg-elevated, #f7e8cf);
        background: linear-gradient(45deg, var(--left-menu-active-attr-1), var(--left-menu-active-attr-3), var(--left-menu-active-attr-2));
        //border: 1px solid var(--color-border, #ded0f2);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        user-select: none;
        position: relative;
        overflow: hidden;
        padding: 10px 0;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient-primary);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(143, 85, 208, 0.15);

          .nav-icon {
            transform: scale(1.1);
          }

          .nav-label {
            //color: var(--color-secondary, #8f55d0);
            color: var(--color-text, #333333);
          }
        }

        &:active {
          transform: translateY(0);
        }
      }

      .nav-item-active {
        //background: var(--gradient-primary);
        //border-color: var(--color-accent, #4765a7);
        //box-shadow: 0 4px 12px rgba(143, 85, 208, 0.25);

        .nav-icon {
          color: var(--color-text, #333333);
        }

        .nav-label {
          color: var(--color-text, #333333);
          font-weight: 600;
        }
      }

      .nav-icon {
        width: 20px;
        height: 20px;
        color: var(--color-text, #333333);
        transition: all 0.3s ease;
        position: relative;
        z-index: 1;

        .IconSpan {
          width: 100%;
          height: 100%;
        }
      }

      .nav-label {
        font-size: 12px;
        font-weight: 500;
        color: var(--color-text, #333333);
        margin-top: 4px;
        transition: all 0.3s ease;
        position: relative;
        z-index: 1;
      }
    }
  }

  // 暗黑模式适配
  :global([data-theme='dark']) & {
    .quick-nav {
      .nav-grid {
        .nav-item {
          background: var(--color-bg-elevated, #252525);
          border-color: var(--color-border, #3a3a3a);

          &:hover {
            box-shadow: 0 4px 12px rgba(71, 101, 167, 0.25);

            .nav-label {
              color: var(--color-accent, #4765a7);
            }
          }

          .nav-item-active {
            border-color: var(--color-secondary, #613e97);
            box-shadow: 0 4px 12px rgba(71, 101, 167, 0.35);
          }

          .nav-icon {
            color: var(--color-text, #e8e8e8);
          }

          .nav-label {
            color: var(--color-text, #e8e8e8);
          }
        }
      }
    }
  }

  .search-div {
    user-select: none;
    position: relative;

    .NeonBorder-main {
      position: relative;

      .NeonBorder {
        border-radius: 100px;

        .input-search {
          border-radius: 100px;
          overflow: hidden;
          background: linear-gradient(var(--left-menu-search-attr-1), var(--left-menu-search-attr-2));

          .ant-input {
            background: rgba(0, 0, 0, 0);
          }
        }
      }
    }

    .search-results-container {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 1000;
      margin-top: 10px;
      animation: slideDown 0.3s ease;

      // 搜索结果容器样式覆盖
      :deep(.search-results) {
        background: linear-gradient(135deg, #f7e8cf, #fbf8ed, #ded0f2);
        border: 1px solid rgba(222, 208, 242, 0.5);
        box-shadow: 0 8px 32px rgba(143, 85, 208, 0.1);

        .search-header {
          background: linear-gradient(135deg,
          rgba(247, 232, 207, 0.8),
          rgba(251, 248, 237, 0.8),
          rgba(222, 208, 242, 0.8));
          border-color: rgba(222, 208, 242, 0.5);

          h3 {
            color: #000000 !important;
            background: none !important;
            -webkit-text-fill-color: #000000 !important;
          }
        }

        .search-list {
          .search-item {
            border-color: rgba(222, 208, 242, 0.3);

            .item-header {
              h4 {
                color: #000000 !important;

                &:hover {
                  color: #613e97 !important;
                }
              }

              .item-meta {
                .date {
                  color: #000000 !important;
                  opacity: 0.8;
                }
              }
            }

            .description {
              color: #000000 !important;
              opacity: 0.9;
            }

            .content-preview {
              color: #000000 !important;
              opacity: 0.8;
            }
          }
        }

        .no-results {
          background: linear-gradient(135deg, #f7e8cf, #fbf8ed, #ded0f2);
          border-color: rgba(222, 208, 242, 0.5);

          h4 {
            color: #000000 !important;
            background: none !important;
            -webkit-text-fill-color: #000000 !important;
          }

          p {
            color: #000000 !important;
            opacity: 0.8;
          }
        }

        // 滚动条样式
        &::-webkit-scrollbar-track {
          background: rgba(247, 232, 207, 0.3);
        }

        &::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #8f55d0, #613e97);
        }
      }

      // 暗黑模式覆盖
      :global([data-theme='dark']) & {
        :deep(.search-results) {
          background: linear-gradient(135deg, #8f55d0, #4765a7, #613e97);
          border: 1px solid rgba(143, 85, 208, 0.3);
          box-shadow: 0 8px 32px rgba(71, 101, 167, 0.3);

          .search-header {
            background: linear-gradient(135deg,
            rgba(143, 85, 208, 0.8),
            rgba(71, 101, 167, 0.8),
            rgba(97, 62, 151, 0.8));
            border-color: rgba(143, 85, 208, 0.3);

            h3 {
              color: #ffffff !important;
            }
          }

          .search-list {
            .search-item {
              border-color: rgba(143, 85, 208, 0.3);

              &:hover {
                background: linear-gradient(135deg,
                rgba(143, 85, 208, 0.2),
                rgba(71, 101, 167, 0.2));
              }

              .item-header {
                h4 {
                  color: #ffffff !important;

                  &:hover {
                    color: #f7e8cf !important;
                  }
                }

                .item-meta {
                  .date {
                    color: #ffffff !important;
                    opacity: 0.8;
                  }
                }
              }

              .description {
                color: #ffffff !important;
                opacity: 0.9;
              }

              .content-preview {
                color: #ffffff !important;
                opacity: 0.8;
              }
            }
          }

          .no-results {
            background: linear-gradient(135deg, #8f55d0, #4765a7, #613e97);
            border-color: rgba(143, 85, 208, 0.3);

            h4 {
              color: #ffffff !important;
            }

            p {
              color: #ffffff !important;
              opacity: 0.8;
            }
          }

          // 滚动条样式
          &::-webkit-scrollbar-track {
            background: rgba(71, 101, 167, 0.3);
          }

          &::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #4765a7, #8f55d0);
          }
        }
      }
    }
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
