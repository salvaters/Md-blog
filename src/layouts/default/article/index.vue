<template>
  <div :style='themeVars' class='article-container'>
    <!-- 阅读进度条 -->
    <div :style='{ width: readingProgress + "%" }' class='reading-progress'></div>

    <div v-if='articleData' class='article-header'>
      <h1>{{ articleData.frontmatter.title }}</h1>
      <div class='article-meta'>
        <span class='date'>{{ formatDate(articleData.frontmatter.date) }}</span>
        <span v-if='articleData.frontmatter.description' class='description'>
          {{ articleData.frontmatter.description }}
        </span>
        <span class='reading-info'>
          <span class='reading-time'>⏱️ {{ readingTime }}分钟阅读</span>
          <span class='word-count'>📄 {{ wordCount }}字</span>
        </span>
      </div>
    </div>
    <div v-if='articleData' ref='articleContent' class='article-content markdown-content'
         v-html='articleData.html'></div>
    <div v-else-if='loading' class='loading'>
      <div class='loading-spinner'></div>
      <p>加载中...</p>
    </div>
    <div v-else-if='error' class='error'>{{ error }}</div>
  </div>
</template>


<script lang='ts' setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import moment from 'moment'
import { useCounterStore } from '@/stores/counter.ts'
import { storeToRefs } from 'pinia'
// @ts-ignore
import { generateArticlePaths, getArticleCategories } from '/utils/articleUtils'
// @ts-ignore
import { setCopyButtonClick } from '/utils/clipboard3.ts'

const route = useRoute()
const store = useCounterStore()
const { isDark } = storeToRefs(store)

const articleData = ref<any>(null)
const loading = ref(false)
const error = ref('')


// 阅读进度和统计
const readingProgress = ref(0)
const readingTime = ref(0)
const wordCount = ref(0)
const articleContent = ref<HTMLElement | null>(null)

// 计算主题相关的CSS变量
const themeVars = computed(() => {
  return isDark.value === 'dark' ? {
    '--color-bg-container': '#1a1a1a',
    '--color-bg-elevated': '#252525',
    '--color-border': '#3a3a3a',
    '--color-text': '#e8e8e8',
    '--color-text-secondary': '#b8b8b8',
    '--color-text-tertiary': '#888888',
    '--color-heading': '#ffffff',
    '--color-primary': '#4765a7',
    '--color-secondary': '#613e97',
    '--color-accent': '#8f55d0',
    '--color-error': '#ff7875',
    '--gradient-primary': 'linear-gradient(135deg, #4765a7, #613e97)',
    '--gradient-secondary': 'linear-gradient(135deg, #613e97, #8f55d0)',
    '--shadow-primary': '0 4px 20px rgba(71, 101, 167, 0.3)',
    '--shadow-secondary': '0 4px 20px rgba(97, 62, 151, 0.3)',
    '--gradient-strong': 'linear-gradient(135deg, #6900ff, #ff9f00)'
  } : {
    '--color-bg-container': '#fbf8ed',
    '--color-bg-elevated': '#f7e8cf',
    '--color-border': '#ded0f2',
    '--color-text': '#333333',
    '--color-text-secondary': '#666666',
    '--color-text-tertiary': '#999999',
    '--color-heading': '#2c2c2c',
    '--color-primary': '#613e97',
    '--color-secondary': '#8f55d0',
    '--color-accent': '#4765a7',
    '--color-error': '#ff4d4f',
    '--gradient-primary': 'linear-gradient(135deg, #613e97, #8f55d0)',
    '--gradient-secondary': 'linear-gradient(135deg, #f7e8cf, #ded0f2)',
    '--shadow-primary': '0 4px 20px rgba(97, 62, 151, 0.15)',
    '--shadow-secondary': '0 4px 20px rgba(143, 85, 208, 0.15)',
    '--gradient-strong': 'linear-gradient(135deg, #6900ff, #ff9f00)'
  }
})

// 格式化日期
const formatDate = (date: string) => {
  return moment(date).format('YYYY年MM月DD日')
}

// 计算阅读时间
const calculateReadingTime = (text: string) => {
  const wordsPerMinute = 200 // 中文阅读速度
  const chineseChars = text.length
  return Math.ceil(chineseChars / wordsPerMinute)
}

// 计算字数
const calculateWordCount = (text: string) => {
  // 移除HTML标签
  const plainText = text.replace(/<[^>]*>/g, '')
  return plainText.length
}

// 更新阅读进度
const updateReadingProgress = () => {
  if (!articleContent.value) return

  const container = articleContent.value.closest('.RouterView') as HTMLElement
  if (!container) return

  const scrollTop = container.scrollTop
  const scrollHeight = container.scrollHeight
  const clientHeight = container.clientHeight
  const scrollableHeight = scrollHeight - clientHeight

  readingProgress.value = scrollableHeight > 0
    ? Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100))
    : 0
}

// 监听滚动事件
const handleScroll = () => {
  updateReadingProgress()
}

// 加载文章
const loadArticle = async (articleId: string) => {
  if (!articleId) {
    error.value = '文章ID不存在'
    return
  }

  loading.value = true
  error.value = ''

  try {
    // 获取所有文章分类
    const categories = await getArticleCategories()

    // 动态生成文章加载路径
    const possiblePaths = generateArticlePaths(articleId, categories)

    let articleLoaded = false

    for (const path of possiblePaths) {
      try {
        // 使用动态导入加载 markdown 文件
        const module = await import(/* @vite-ignore */ path)
        articleData.value = module.default
        articleLoaded = true

        // 计算阅读统计信息
        const htmlContent = articleData.value.html
        wordCount.value = calculateWordCount(htmlContent)
        readingTime.value = calculateReadingTime(htmlContent)

        break
      } catch (e) {
        // 继续尝试下一个路径
      }
    }

    if (!articleLoaded) {
      error.value = '文章未找到'
    }
  } catch (e) {
    console.error('加载文章失败:', e)
    error.value = '加载文章失败'
  } finally {
    loading.value = false
  }
}

// 监听路由变化
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadArticle(newId as string)
    }
  },
  { immediate: true }
)

// 生命周期钩子
onMounted(() => {
  // 延迟添加滚动监听，确保DOM已渲染
  setTimeout(() => {
    const routerView = document.querySelector('.RouterView')
    if (routerView) {
      routerView.addEventListener('scroll', handleScroll, { passive: true })
      // 初始更新阅读进度
      updateReadingProgress()
      // 复制
      setCopyButtonClick()
    }
  }, 100)
})

onUnmounted(() => {
  // 移除滚动监听
  const routerView = document.querySelector('.RouterView')
  if (routerView) {
    routerView.removeEventListener('scroll', handleScroll)
  }
})
</script>


<style lang='less' scoped>
.article-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  //background: var(--color-bg-container, #fff);
  border-radius: 8px;
  position: relative;


  // 阅读进度条
  .reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: var(--gradient-strong);
    z-index: 1001;
    transition: width 0.3s ease;
    border-radius: 0 0 2px 2px;
    box-shadow: 0 2px 8px rgba(105, 0, 255, 0.3);

    // 添加光晕效果
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 30px;
      height: 100%;
      background: inherit;
      filter: blur(8px);
      opacity: 0.8;
    }
  }

  .article-header {
    margin-bottom: 30px;
    border-bottom: 1px solid var(--color-border, #e8e8e8);
    padding-bottom: 20px;

    h1 {
      font-size: 1.8em;
      margin: 0 0 10px 0;
      color: var(--color-heading, #000);
      font-weight: 600;
    }

    .article-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      align-items: center;
      font-size: 14px;
      color: var(--color-text-secondary, #666);

      .date {
        font-weight: 500;
      }

      .description {
        color: var(--color-text-tertiary, #999);
      }

      .reading-info {
        display: flex;
        gap: 15px;
        margin-left: auto;

        .reading-time,
        .word-count {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          background: var(--color-bg-elevated, #f6f8fa);
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }
      }
    }
  }

  .article-content {
    line-height: 1.8;
    font-size: 16px;
    color: var(--color-text, #333);

    // Markdown 内容样式
    :deep(h1) {
      font-size: 1.8em;
      margin: 20px 0 15px 0;
      color: var(--color-heading, #000);
      border-bottom: 2px solid var(--color-primary, #1890ff);
      padding-bottom: 5px;
    }

    :deep(h2) {
      font-size: 1.4em;
      margin: 18px 0 12px 0;
      color: var(--color-heading, #000);
    }

    :deep(h3) {
      font-size: 1.4em;
      margin: 15px 0 10px 0;
      color: var(--color-heading, #000);
    }

    :deep(p) {
      margin: 10px 0;
      text-align: justify;
    }

    :deep(pre) {
      overflow-x: auto;
      //background: var(--color-bg-elevated, #f6f8fa);
      //border: 1px solid var(--color-border, #e1e4e8);
      //border-radius: 6px;
      //padding: 16px;
      //margin: 15px 0;

      code {
        background: none;
        padding: 0;
        border-radius: 0;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      }
    }

    :deep(code) {
      background: var(--color-bg-elevated, #f6f8fa);
      padding: 2px 4px;
      border-radius: 3px;
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      font-size: 0.9em;
    }

    :deep(blockquote) {
      border-left: 4px solid var(--color-primary, #1890ff);
      padding: 10px 20px;
      margin: 15px 0;
      background: var(--color-bg-elevated, #f6f8fa);
      color: var(--color-text-secondary, #666);
    }

    :deep(ul), :deep(ol) {
      padding-left: 10px;
      margin: 10px 0;
    }

    :deep(li) {
      margin: 5px 0;
    }

    :deep(table) {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;

      th, td {
        border: 1px solid var(--color-border, #e1e4e8);
        padding: 8px 12px;
        text-align: left;
      }

      th {
        background: var(--color-bg-elevated, #f6f8fa);
        font-weight: 600;
      }
    }

    :deep(img) {
      max-width: 100%;
      height: auto;
      border-radius: 6px;
      margin: 10px 0;
    }
  }

  .loading {
    text-align: center;
    padding: 50px;
    font-size: 16px;
    color: var(--color-text-secondary, #666);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-bg-elevated, #f6f8fa);
      border-top: 3px solid var(--color-primary, #1890ff);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    p {
      margin: 0;
    }
  }

  .error {
    text-align: center;
    padding: 50px;
    font-size: 16px;
    color: var(--color-error, #ff4d4f);
  }

}
</style>


<style lang='less'>
@import '@/assets/md';
@import 'highlight.js/styles/atom-one-dark.min.css';
</style>

