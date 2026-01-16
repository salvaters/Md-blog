<template>
  <div class='home-page-main'>
    <!-- 欢迎区域 -->
    <section class='hero-section' data-aos='fade-up'>
      <div class='hero-content'>
        <div class='hero-avatar'>
          <img alt='Salvater' class='avatar-image' src='/src/assets/images/user.jpg' />
          <div class='avatar-ring'></div>
        </div>

        <div class='hero-text'>
          <h1 class='hero-title'>
            <span class='gradient-text'>Hello, I'm Salvater</span>
          </h1>
          <p class='hero-subtitle'>前端开发工程师 · 技术博主 · 终身学习者</p>
          <p class='hero-description'>
            热爱前端技术，专注于Vue.js生态、用户体验设计和现代化Web开发。
            在这里记录学习历程，分享技术心得，探索代码的无限可能。
          </p>

          <div class='hero-actions'>
            <a-button
              class='action-btn primary-btn'
              data-aos-delay='200'
              size='large'
              type='primary'
              @click='navigateToArticles'
            >
              <template #icon>
                <ReadOutlined />
              </template>
              阅读文章
            </a-button>

            <a-button
              class='action-btn secondary-btn'
              data-aos-delay='300'
              size='large'
              @click='navigateToAbout'
            >
              <template #icon>
                <UserOutlined />
              </template>
              关于我
            </a-button>
          </div>
        </div>
      </div>

      <!-- 装饰元素 -->
      <div class='hero-decoration'>
        <div class='floating-element floating-1' data-aos='float' data-aos-delay='0'>
          <Icon :url='book' class='floating-icon' />
        </div>
        <div class='floating-element floating-2' data-aos='float' data-aos-delay='200'>
          <Icon :url='code' class='floating-icon' />
        </div>
        <div class='floating-element floating-3' data-aos='float' data-aos-delay='400'>
          <Icon :url='heart' class='floating-icon' />
        </div>
      </div>
    </section>

    <!-- 统计区域 -->
    <section class='stats-section' data-aos='fade-up' data-aos-delay='200'>
      <div class='stats-container'>
        <div v-for='stat in stats' :key='stat.label' :data-aos-delay='stat.delay' class='stat-item'
             data-aos='zoom-in'>
          <div class='stat-icon'>
            <Icon :url='stat.icon' class='stat-icon-svg' />
          </div>
          <div class='stat-content'>
            <div class='stat-number'>{{ stat.value }}</div>
            <div class='stat-label'>{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技能栈 -->
    <section class='skills-section'>
      <h2 class='section-title'>技术栈</h2>
      <div class='skills-grid'>
        <div
          v-for='skill in skills'
          :key='skill.name'
          :data-aos-delay='skill.delay'
          class='skill-item'
        >
          <div class='skill-icon'>
            <Icon :url='skill.icon' class='skill-icon-svg' />
          </div>
          <div class='skill-info'>
            <h3 class='skill-name'>{{ skill.name }}</h3>
            <div class='skill-level'>
              <div :style='{ width: skill.level + "%" }' class='skill-bar'></div>
            </div>
            <p class='skill-description'>{{ skill.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 最近文章预览 -->
    <section class='recent-articles-section'>
      <div class='section-header'>
        <h2 class='section-title'>最近文章</h2>
        <a-button class='view-all-btn' type='link' @click='navigateToArticles'>
          查看全部
          <ArrowRightOutlined />
        </a-button>
      </div>

      <div v-if='recentArticles.length > 0' class='articles-preview'>
        <div
          v-for='article in recentArticles.slice(0, 3)'
          :key='article.path'
          :data-aos-delay='article.delay'
          class='article-card'
          @click='handleArticleClick(article)'
        >
          <div class='article-meta'>
            <span class='article-category'>{{ getArticleCategory(article) }}</span>
            <span class='article-date'>{{ formatDate(getArticleFrontmatter(article).date) }}</span>
          </div>
          <h3 class='article-title'>{{ getArticleFrontmatter(article).title }}</h3>
          <p class='article-description'>{{ getArticleFrontmatter(article).description }}</p>

          <div class='article-footer'>
            <span class='read-more'>阅读更多</span>
            <ArrowRightOutlined class='read-arrow' />
          </div>
        </div>
      </div>

      <div v-else class='empty-articles'>
        <Icon :url='book' class='empty-icon' />
        <p>文章正在编写中，敬请期待...</p>
      </div>
    </section>
  </div>
</template>

<script lang='ts' setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRightOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons-vue'
import Icon from '@/components/Icon/index.vue'
import book from '@/assets/svg/book.svg'
import code from '@/assets/svg/code.svg'
import heart from '@/assets/svg/heart.svg'
import { getFilePath } from '@/layouts/default/LeftMenu/nav/index'
import moment from 'moment'
// @ts-ignore
import AOS from 'aos'
import 'aos/dist/aos.css'

const router = useRouter()

// 响应式数据
const allArticles = ref<any[]>([])
const allCategories = ref<any[]>([])

// 统计数据
const stats = computed(() => [
  {
    icon: book,
    value: allArticles.value.length,
    label: '技术文章',
    delay: 100
  },
  {
    icon: book,
    value: allCategories.value.length,
    label: '技术分类',
    delay: 200
  },
  {
    icon: code,
    value: skills.length,
    label: '技能标签',
    delay: 300
  },
  {
    icon: heart,
    value: '∞',
    label: '学习热情',
    delay: 400
  }
])

// 技能栈数据
const skills = [
  {
    name: 'Vue.js',
    icon: book,
    level: 90,
    description: 'Vue 2/3 + Composition API + Vuex/Pinia',
    delay: 100
  },
  {
    name: 'TypeScript',
    icon: book,
    level: 85,
    description: '类型系统 + 泛型 + 装饰器',
    delay: 200
  },
  {
    name: 'JavaScript',
    icon: book,
    level: 95,
    description: 'ES6+ + 异步编程 + 设计模式',
    delay: 300
  },
  {
    name: 'CSS/Less',
    icon: book,
    level: 88,
    description: '响应式设计 + 动画效果 + 预处理器',
    delay: 400
  },
  {
    name: 'Vite',
    icon: code,
    level: 82,
    description: '现代构建工具 + 插件开发',
    delay: 500
  },
  {
    name: 'Node.js',
    icon: book,
    level: 75,
    description: 'Express + API开发 + 中间件',
    delay: 600
  }
]

// 最近文章
const recentArticles = computed(() => {
  console.log('allArticles.value:', allArticles.value)
  console.log('allArticles.value.length:', allArticles.value.length)

  const filtered = allArticles.value.filter(item => {
    console.log('检查文章:', item.path, item.text)
    // 尝试多种可能的数据结构路径
    const hasFrontmatter =
      (item.text && item.text.default && item.text.default.frontmatter) ||
      (item.text && item.frontmatter) ||
      (item.frontmatter)

    console.log('hasFrontmatter:', hasFrontmatter)
    return hasFrontmatter
  })

  console.log('过滤后的文章数量:', filtered.length)

  const sorted = filtered.sort((a, b) => {
    // 尝试多种路径获取日期
    const dateA = new Date(
      (a.text?.default?.frontmatter?.date) ||
      (a.text?.frontmatter?.date) ||
      (a.frontmatter?.date) || 0
    ).getTime()

    const dateB = new Date(
      (b.text?.default?.frontmatter?.date) ||
      (b.text?.frontmatter?.date) ||
      (b.frontmatter?.date) || 0
    ).getTime()

    return dateB - dateA
  })

  const withDelay = sorted.map((article, index) => ({
    ...article,
    delay: 100 * (index + 1)
  }))

  console.log('最终最近文章:', withDelay)
  return withDelay
})

// 加载所有文章数据
const loadAllArticles = async () => {
  try {
    console.log('开始加载文章数据...')
    const result = await getFilePath()
    console.log('加载结果:', result)

    allCategories.value = result.navList
    console.log('分类数量:', allCategories.value.length)

    const articles: any[] = []
    Object.values(result.modules).forEach((categoryArticles: any) => {
      if (Array.isArray(categoryArticles)) {
        articles.push(...categoryArticles)
      }
    })

    allArticles.value = articles
    console.log('文章总数:', allArticles.value.length)
    console.log('最近文章:', recentArticles.value)
  } catch (error) {
    console.error('加载文章数据失败:', error)
  }
}

// 格式化日期
const formatDate = (date: string) => {
  return moment(date).format('YYYY-MM-DD')
}

// 获取文章分类
const getArticleCategory = (article: any) => {
  const pathParts = article.path.replace('/src/article/', '').split('/')
  return pathParts[0] || '未分类'
}

// 安全获取文章frontmatter数据
const getArticleFrontmatter = (article: any) => {
  return article.text?.default?.frontmatter ||
    article.text?.frontmatter ||
    article.frontmatter ||
    {}
}

// 导航函数
const navigateToArticles = () => {
  router.push({ name: 'articles' })
}

const navigateToAbout = () => {
  router.push({ name: 'about' })
}

const handleArticleClick = (article: any) => {
  const articleId = article.path.split('/').pop()?.replace('.md', '') || ''
  router.push({
    name: 'articleName',
    params: { id: articleId }
  })
}

// 初始化AOS动画
onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 50, // 提前50px触发动画
    delay: 0, // 初始延迟
    easing: 'ease-out-cubic',
    mirror: false // 是否在元素向下滚动时动画
  })

  // 添加自定义浮动动画
  const style = document.createElement('style')
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    [data-aos="float"] {
      animation: float 3s ease-in-out infinite;
    }
  `
  document.head.appendChild(style)

  loadAllArticles()
})
</script>

<style lang='less' scoped>
.home-page-main {
  min-height: 100vh;
  padding: 40px 20px;
  margin: 0 auto;

  .hero-section {
    text-align: center;
    padding: 60px 0;
    position: relative;
    overflow: hidden;

    .hero-content {
      position: relative;
      z-index: 2;
    }

    .hero-avatar {
      position: relative;
      margin: 0 auto 40px;
      width: 150px;
      height: 150px;

      .avatar-image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid rgba(249, 202, 191, 0.3);
      }

      .avatar-ring {
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border: 2px solid rgba(249, 202, 191, 0.6);
        border-radius: 50%;
        animation: pulse 2s infinite;
      }
    }

    .hero-text {
      .hero-title {
        font-size: 3.5rem;
        font-weight: bold;
        margin-bottom: 16px;

        .gradient-text {
          background: linear-gradient(45deg, rgba(249, 202, 191, 1), #8f55d0, #4765a7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 768px) {
          font-size: 2.5rem;
        }
      }

      .hero-subtitle {
        font-size: 1.3rem;
        opacity: 0.8;
        margin-bottom: 20px;

        @media (max-width: 768px) {
          font-size: 1.1rem;
        }
      }

      .hero-description {
        font-size: 1.1rem;
        opacity: 0.7;
        line-height: 1.8;
        max-width: 600px;
        margin: 0 auto 40px;

        @media (max-width: 768px) {
          font-size: 1rem;
        }
      }

      .hero-actions {
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;

        .action-btn {
          height: 50px;
          padding: 0 30px;
          font-size: 1.1rem;
          border-radius: 25px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;

          &.primary-btn {
            background: linear-gradient(45deg, rgba(249, 202, 191, 1), #8f55d0);
            border: none;

            &:hover {
              transform: translateY(-3px);
              box-shadow: 0 10px 25px rgba(143, 85, 208, 0.3);
            }
          }

          &.secondary-btn {
            border: 2px solid rgba(249, 202, 191, 1);
            color: var(--color-text);

            &:hover {
              background: rgba(249, 202, 191, 0.1);
              transform: translateY(-3px);
              color: var(--color-text);
            }
          }
        }
      }
    }

    .hero-decoration {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;

      .floating-element {
        position: absolute;

        .floating-icon {
          width: 40px;
          height: 40px;
          color: rgba(249, 202, 191, 0.3);
          fill: rgba(249, 202, 191, 0.3);
        }

        &.floating-1 {
          top: 20%;
          left: 10%;
        }

        &.floating-2 {
          top: 30%;
          right: 15%;
        }

        &.floating-3 {
          bottom: 30%;
          left: 20%;
        }
      }
    }
  }

  .stats-section {
    padding: 60px 0;
    background: linear-gradient(135deg, rgba(249, 202, 191, 0.1), rgba(143, 85, 208, 0.05));
    border-radius: 20px;
    margin: 40px 0;

    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 30px;
      max-width: 900px;
      margin: 0 auto;

      .stat-item {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 30px;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
        border-radius: 15px;
        border: 1px solid rgba(249, 202, 191, 0.8);
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
        }

        .stat-icon {
          .stat-icon-svg {
            width: 50px;
            height: 50px;
            color: rgba(249, 202, 191, 1);
            fill: rgba(249, 202, 191, 1);
          }
        }

        .stat-content {
          .stat-number {
            font-size: 2.5rem;
            font-weight: bold;
            color: rgba(249, 202, 191, 1);
            margin-bottom: 5px;
          }

          .stat-label {
            font-size: 0.9rem;
            color: var(--color-text, #333333);
            opacity: 0.7;
          }
        }
      }
    }
  }

  .skills-section {
    padding: 60px 0;

    .section-title {
      text-align: center;
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 50px;
      background: linear-gradient(45deg, rgba(249, 202, 191, 1), #8f55d0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;

      .skill-item {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 25px;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        border-radius: 15px;
        border: 1px solid rgba(249, 202, 191, 0.3);
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
        }

        .skill-icon {
          .skill-icon-svg {
            width: 60px;
            height: 60px;
            color: rgba(249, 202, 191, 1);
            fill: rgba(249, 202, 191, 1);
          }
        }

        .skill-info {
          flex: 1;

          .skill-name {
            font-size: 1.2rem;
            font-weight: bold;
            color: var(--color-text, #333333);
            margin-bottom: 10px;
          }

          .skill-level {
            height: 8px;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 10px;

            .skill-bar {
              height: 100%;
              background: linear-gradient(45deg, rgba(249, 202, 191, 1), #8f55d0);
              border-radius: 4px;
              transition: width 1s ease;
            }
          }

          .skill-description {
            font-size: 0.9rem;
            color: var(--color-text, #333333);
            opacity: 0.7;
            line-height: 1.4;
          }
        }
      }
    }
  }

  .recent-articles-section {
    padding: 60px 0;

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;

      .section-title {
        font-size: 2.5rem;
        font-weight: bold;
        background: linear-gradient(45deg, rgba(249, 202, 191, 1), #8f55d0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .view-all-btn {
        font-size: 1.1rem;
        color: rgba(249, 202, 191, 1);
      }
    }

    .articles-preview {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;

      .article-card {
        padding: 30px;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        border-radius: 15px;
        border: 1px solid rgba(249, 202, 191, 0.3);
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(143, 85, 208, 0.2);

          .read-arrow {
            transform: translateX(5px);
          }
        }

        .article-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;

          .article-category {
            background: rgba(249, 202, 191, 0.2);
            color: rgba(249, 202, 191, 1);
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
          }

          .article-date {
            color: var(--color-text, #333333);
            opacity: 0.6;
            font-size: 0.9rem;
          }
        }

        .article-title {
          font-size: 1.3rem;
          font-weight: bold;
          color: var(--color-text, #333333);
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .article-description {
          color: var(--color-text, #333333);
          opacity: 0.7;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .article-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(249, 202, 191, 1);
          font-weight: 500;

          .read-arrow {
            transition: transform 0.3s ease;
          }
        }
      }
    }

    .empty-articles {
      text-align: center;
      padding: 60px 20px;

      .empty-icon {
        width: 80px;
        height: 80px;
        color: var(--color-text, #333333);
        opacity: 0.3;
        margin-bottom: 20px;
      }

      p {
        color: var(--color-text, #333333);
        opacity: 0.6;
        font-size: 1.1rem;
      }
    }
  }
}

// 动画效果
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .home-page {
    padding: 20px 15px;

    .hero-section {
      padding: 40px 0;

      .hero-avatar {
        width: 120px;
        height: 120px;
      }

      .hero-actions {
        flex-direction: column;
        align-items: center;

        .action-btn {
          width: 200px;
        }
      }
    }

    .stats-section {
      .stats-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;

        .stat-item {
          padding: 20px;
          flex-direction: column;
          text-align: center;
        }
      }
    }

    .skills-section {
      .skills-grid {
        grid-template-columns: 1fr;
      }
    }

    .recent-articles-section {
      .articles-preview {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
