<template>
  <div class='homePage'>
    <!-- 欢迎区域 - 当没有选择分类时显示 -->
    <div v-if='!hasSelectedCategory' class='welcome-section' data-aos='fade-up'>
      <div class='welcome-content'>
        <div class='welcome-header'>
          <div class='welcome-icon'>
            <Icon :url='book' class='welcome-book-icon' />
          </div>
          <h1 class='welcome-title'>欢迎来到我的技术博客</h1>
          <p class='welcome-subtitle'>探索前端技术的奇妙世界，记录学习路上的点点滴滴</p>
        </div>

        <div class='stats-container'>
          <div class='stat-item' data-aos='zoom-in' data-aos-delay='100'>
            <div class='stat-number'>{{ totalArticles }}</div>
            <div class='stat-label'>技术文章</div>
          </div>
          <div class='stat-item' data-aos='zoom-in' data-aos-delay='200'>
            <div class='stat-number'>{{ totalCategories }}</div>
            <div class='stat-label'>技术分类</div>
          </div>
          <div class='stat-item' data-aos='zoom-in' data-aos-delay='300'>
            <div class='stat-number'>{{ recentArticles.length }}</div>
            <div class='stat-label'>最近更新</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分类提示 -->
    <div v-if='!hasSelectedCategory' class='category-hint' data-aos='fade-up' data-aos-delay='400'>
      <h2>📚 请从左侧导航选择一个技术分类开始浏览</h2>
      <p>或者直接查看最近的几篇文章：</p>
    </div>

    <!-- 分类标题 -->
    <div v-if='hasSelectedCategory' class='category-header' data-aos='fade-down'>
      <h2>{{ currentCategoryTitle }}</h2>
      <p>共 {{ children.length }} 篇文章</p>
    </div>

    <!-- 文章网格 -->
    <div v-if='displayArticles.length > 0' class='children-box'>
      <div v-for='item in displayArticles' class='book-box' data-aos='zoom-in-down'>
        <div class='item-box'>
          <Book :color="isLightTheme ? 'orange' : 'dark'" :duration='300'
                class='Book-main book-clickable'
                shadowSize='sm' size='sm' @click='handleBook(item)'>
            <BookHeader>
              <Icon :url='book' style='color: #fbf8f2' />
            </BookHeader>
            <BookTitle>
              <h1>{{ frontmatter(item).title }}</h1>
            </BookTitle>
            <BookDescription>
              <div>{{ frontmatter(item).date }}</div>
              <div>{{ frontmatter(item).description }}</div>
            </BookDescription>
          </Book>
        </div>
      </div>
    </div>

    <!-- 空状态提示 -->
    <div v-else-if='hasSelectedCategory' class='empty-state' data-aos='fade-up'>
      <div class='empty-icon'>
        <Icon :url='book' />
      </div>
      <h3>该分类暂无文章</h3>
      <p>请选择其他分类或稍后再来查看</p>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon/index.vue'
import book from '@/assets/svg/book.svg'
import { Book, BookDescription, BookHeader, BookTitle } from '@/components/motion/3dBook/index'
import { storeToRefs } from 'pinia'
import { navStore } from '@/stores/navStore.ts'
import { useCounterStore } from '@/stores/counter.ts'
import { getFilePath } from '@/layouts/default/LeftMenu/nav/index'
import moment from 'moment'
// @ts-ignore
import AOS from 'aos'
import 'aos/dist/aos.css'

const router = useRouter()
const store = navStore()
const storeTheme = useCounterStore()
const { currentNav } = storeToRefs(store)
const { isLightTheme } = storeToRefs(storeTheme)

// 响应式数据
const allArticles = ref<any[]>([])
const allCategories = ref<any[]>([])

AOS.init()

// 检查是否选择了分类
const hasSelectedCategory = computed(() => {
  return currentNav.value && currentNav.value.tag && Object.keys(currentNav.value).length > 0
})

// 当前分类标题
const currentCategoryTitle = computed(() => {
  return hasSelectedCategory.value ? (currentNav.value.title || currentNav.value.tag) : ''
})

// 当前分类下的文章
let children = computed(() => {
  const map = new Map()
  // @ts-ignore - currentNav 可能有 children 属性
  let children = currentNav.value.children || []
  map.set('value', children)
  AOS.refresh()
  return map.get('value')
})

// 显示的文章（有分类显示分类文章，没分类显示最近文章）
const displayArticles = computed(() => {
  if (hasSelectedCategory.value) {
    return children.value
  } else {
    // 显示最近6篇文章
    return recentArticles.value.slice(0, 6)
  }
})

// 统计数据
const totalArticles = computed(() => {
  return allArticles.value.length
})

const totalCategories = computed(() => {
  return allCategories.value.length
})

// 最近文章（按日期排序）
const recentArticles = computed(() => {
  return allArticles.value
    .filter(item => item.text && item.text.default && item.text.default.frontmatter)
    .sort((a, b) => {
      const dateA = new Date(a.text.default.frontmatter.date || 0).getTime()
      const dateB = new Date(b.text.default.frontmatter.date || 0).getTime()
      return dateB - dateA
    })
})

// 加载所有文章数据
const loadAllArticles = async () => {
  try {
    const result = await getFilePath()
    allCategories.value = result.navList

    // 收集所有文章
    const articles: any[] = []
    Object.values(result.modules).forEach((categoryArticles: any) => {
      if (Array.isArray(categoryArticles)) {
        articles.push(...categoryArticles)
      }
    })

    allArticles.value = articles
  } catch (error) {
    console.error('加载文章数据失败:', error)
  }
}

// 文本标签描述
const frontmatter = (item: any) => {
  let matter = item.text.default.frontmatter
  return {
    ...matter,
    date: moment(matter.date).format('YYYY-MM-DD')
  }
}

// 点击书本
const handleBook = (item: any) => {
  // 从文件路径中提取文章ID
  const articlePath = item.path
  const articleId = articlePath.split('/').pop()?.replace('.md', '') || ''

  // 跳转到文章详情页
  router.push({
    name: 'articleName',
    params: { id: articleId }
  })
}

// 组件挂载时加载所有文章数据
onMounted(() => {
  loadAllArticles()
})

</script>


<style lang='less'>
.homePage {
  padding: 20px;
  min-height: 100%;

  // 欢迎区域样式
  .welcome-section {
    text-align: center;
    margin-bottom: 40px;
    padding: 40px 20px;
    background: linear-gradient(135deg, rgba(249, 202, 191, 0.1), rgba(143, 85, 208, 0.1));
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(249, 202, 191, 0.2);

    .welcome-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .welcome-header {
      margin-bottom: 40px;

      .welcome-icon {
        margin-bottom: 20px;

        .welcome-book-icon {
          width: 80px;
          height: 80px;
          color: var(--color-primary, rgba(249, 202, 191, 1));
          fill: var(--color-primary, rgba(249, 202, 191, 1));
          animation: bounce 2s infinite;
        }
      }

      .welcome-title {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 16px;
        background: linear-gradient(45deg, var(--color-primary, rgba(249, 202, 191, 1)), var(--color-secondary, #8f55d0));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;

        @media (max-width: 768px) {
          font-size: 2rem;
        }
      }

      .welcome-subtitle {
        font-size: 1.2rem;
        color: var(--color-text, #333333);
        opacity: 0.8;
        line-height: 1.6;

        @media (max-width: 768px) {
          font-size: 1rem;
        }
      }
    }

    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 30px;
      max-width: 600px;
      margin: 0 auto;

      .stat-item {
        text-align: center;
        padding: 20px;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        border-radius: 15px;
        border: 1px solid rgba(249, 202, 191, 0.3);
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--color-primary, rgba(249, 202, 191, 1));
          margin-bottom: 8px;

          @media (max-width: 768px) {
            font-size: 2rem;
          }
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--color-text, #333333);
          opacity: 0.7;
          font-weight: 500;
        }
      }
    }
  }

  // 分类提示样式
  .category-hint {
    text-align: center;
    margin-bottom: 30px;
    padding: 30px 20px;
    background: linear-gradient(135deg, rgba(143, 85, 208, 0.05), rgba(71, 101, 167, 0.05));
    border-radius: 15px;
    border: 1px solid rgba(143, 85, 208, 0.2);

    h2 {
      font-size: 1.5rem;
      color: var(--color-text, #333333);
      margin-bottom: 10px;

      @media (max-width: 768px) {
        font-size: 1.2rem;
      }
    }

    p {
      font-size: 1rem;
      color: var(--color-text, #333333);
      opacity: 0.7;
    }
  }

  // 分类标题样式
  .category-header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px;
    background: linear-gradient(135deg, rgba(249, 202, 191, 0.1), rgba(143, 85, 208, 0.1));
    border-radius: 15px;
    border: 1px solid rgba(249, 202, 191, 0.3);

    h2 {
      font-size: 2rem;
      color: var(--color-text, #333333);
      margin-bottom: 8px;

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }

    p {
      font-size: 1rem;
      color: var(--color-text, #333333);
      opacity: 0.7;
    }
  }

  // 空状态样式
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, rgba(143, 85, 208, 0.05), rgba(71, 101, 167, 0.05));
    border-radius: 15px;
    border: 1px solid rgba(143, 85, 208, 0.2);

    .empty-icon {
      margin-bottom: 20px;

      .IconSpan {
        width: 60px;
        height: 60px;
        color: var(--color-text, #333333);
        opacity: 0.5;
      }
    }

    h3 {
      font-size: 1.5rem;
      color: var(--color-text, #333333);
      margin-bottom: 10px;
    }

    p {
      font-size: 1rem;
      color: var(--color-text, #333333);
      opacity: 0.7;
    }
  }

  .children-box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 40px;
    padding: 20px;
    justify-content: start;

    // 响应式布局优化
    @media (max-width: 1200px) {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 30px;
    }

    @media (max-width: 992px) {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 25px;
      padding: 18px;
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 20px;
      padding: 15px;
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      padding: 10px;
    }

    .book-box {
      // 确保AOS动画不影响布局
      &[data-aos="zoom-in-down"] {
        opacity: 1 !important;
        transform: none !important;

        &.aos-animate {
          animation: bookZoomInDown 0.6s ease-out;
        }
      }

      .item-box {
        display: flex;
        justify-content: center;

        .book-clickable {
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;

          &:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          }

          &:active {
            transform: translateY(-2px) scale(1.02);
          }

          // 在小屏幕上减少hover效果
          @media (max-width: 768px) {
            &:hover {
              transform: translateY(-3px) scale(1.02);
            }
          }

          @media (max-width: 480px) {
            &:hover {
              transform: translateY(-2px) scale(1.01);
            }
          }
        }

        .IconSpan {
          width: 25px;
          color: #f2f2f2;
          fill: #f2f2f2;
          //color: var(--color-text);
          //fill: var(--color-text);
        }
      }
    }
  }
}

// 自定义book动画
@keyframes bookZoomInDown {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-50px);
  }
  50% {
    opacity: 1;
    transform: scale(1.05) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

// 弹跳动画
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

// 确保在小屏幕上动画更简洁
@media (max-width: 768px) {
  @keyframes bookZoomInDown {
    0% {
      opacity: 0;
      transform: scale(0.5) translateY(-30px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .welcome-section {
    .welcome-header {
      .welcome-book-icon {
        width: 60px !important;
        height: 60px !important;
      }
    }
  }
}
</style>
