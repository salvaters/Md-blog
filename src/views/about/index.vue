<template>
  <div :style='themeVars' class='about-container'>
    <div class='about-content'>
      <!-- 个人信息卡片 -->
      <div class='profile-card'>
        <div class='avatar-section'>
          <div class='avatar-wrapper'>
            <img alt='Profile' class='avatar' src='../../assets/images/user.jpg' />
            <div class='avatar-ring'></div>
          </div>
          <h1 class='name'>salvater</h1>
          <p class='title'>个人博客创作者</p>
          <div class='social-links'>
            <a class='social-link' href='#'>
              <Icon url='/src/assets/svg/github.svg' />
            </a>
            <a class='social-link' href='#'>
              <Icon url='/src/assets/svg/email.svg' />
            </a>
          </div>
        </div>

        <div class='motto-section'>
          <p class='motto'>
            "不自重者，取辱。不自长者，取祸。<br>
            不自满者，受益。不自足者，博闻。"
          </p>
        </div>
      </div>

      <!-- 关于内容 -->
      <div class='about-sections'>
        <section class='section'>
          <h2 class='section-title'>
            <Icon url='/src/assets/svg/book.svg' />
            关于本博客
          </h2>
          <div class='section-content'>
            <p>
              欢迎来到我的个人博客！这里是我记录学习心得、分享技术见解、探索编程世界的乐园。
              通过这个平台，我希望能够与更多志同道合的朋友交流学习，共同进步。
            </p>
            <p>
              博客主要涵盖前端开发、后端技术、编程思想等内容，
              我致力于将复杂的技术概念用简单易懂的方式呈现出来。
            </p>
          </div>
        </section>

        <section class='section'>
          <h2 class='section-title'>
            <Icon url='/src/assets/svg/code.svg' />
            技术栈
          </h2>
          <div class='section-content'>
            <div class='tech-grid'>
              <div v-for='(item, index) in technoLogList' :key='index' class='tech-item'>
                <div class='tech-icon vue'>
                  <Icon :url='item.icon' />
                </div>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>
        </section>

        <section class='section'>
          <h2 class='section-title'>
            <Icon url='/src/assets/svg/heart.svg' />
            兴趣爱好
          </h2>
          <div class='section-content'>
            <div class='hobby-list'>
              <div class='hobby-item'>
                <span class='hobby-icon'>📚</span>
                <div class='hobby-info'>
                  <h4>阅读</h4>
                  <p>技术书籍、哲学思考、科幻小说</p>
                </div>
              </div>
              <div class='hobby-item'>
                <span class='hobby-icon'>💻</span>
                <div class='hobby-info'>
                  <h4>编程</h4>
                  <p>探索新技术、开发有趣的项目</p>
                </div>
              </div>
              <div class='hobby-item'>
                <span class='hobby-icon'>🎮</span>
                <div class='hobby-info'>
                  <h4>游戏</h4>
                  <p>策略游戏、独立游戏</p>
                </div>
              </div>
              <div class='hobby-item'>
                <span class='hobby-icon'>🎵</span>
                <div class='hobby-info'>
                  <h4>音乐</h4>
                  <p>古典音乐、电子音乐</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class='section'>
          <h2 class='section-title'>
            <Icon url='/src/assets/svg/contact.svg' />
            联系方式
          </h2>
          <div class='section-content'>
            <div class='contact-info'>
              <div class='contact-item'>
                <span class='contact-icon'>📧</span>
                <div class='contact-details'>
                  <h4>邮箱</h4>
                  <a href='mailto:salvater@foxmail.com'>salvater@foxmail.com</a>
                </div>
              </div>
              <div class='contact-item'>
                <span class='contact-icon'>🔗</span>
                <div class='contact-details'>
                  <h4>GitHub</h4>
                  <a href='https://github.com/salvaters'>https://github.com/salvaters</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed, ref } from 'vue'
import Icon from '@/components/Icon/index.vue'
import { useCounterStore } from '@/stores/counter.ts'
import { storeToRefs } from 'pinia'

const store = useCounterStore()
const { isDark } = storeToRefs(store)

// 计算主题相关的CSS变量
const themeVars = computed(() => {
  return isDark.value === 'dark' ? {
    // '--color-bg-primary': '#1a1a1a',
    // '--color-text-tertiary': '#888888',
    // '--gradient-secondary': 'linear-gradient(135deg, #613e97, #8f55d0)',
    '--color-bg-secondary': '#52559c',
    '--color-primary': '#4765a7',
    '--color-border': '#404040',
    '--color-text-primary': '#e8e8e8',
    '--color-text-secondary': '#b8b8b8',
    '--color-heading': '#ffffff',
    '--color-secondary': '#613e97',
    '--color-accent': '#8f55d0',
    '--gradient-primary': 'linear-gradient(135deg, #4765a7, #613e97)',
    '--shadow-primary': '0 8px 32px rgba(71, 101, 167, 0.3)',
    '--shadow-secondary': '0 8px 32px rgba(97, 62, 151, 0.3)'
  } : {
    // '--color-bg-primary': '#fbf8ed',
    // '--color-accent': '#4765a7',
    // '--color-text-tertiary': '#999999',
    // '--gradient-secondary': 'linear-gradient(135deg, #f7e8cf, #ded0f2)',
    '--color-bg-secondary': '#efe7f2',
    '--color-primary': '#613e97',
    '--color-border': '#ded0f2',
    '--color-text-primary': '#333333',
    '--color-text-secondary': '#666666',
    '--color-heading': '#2c2c2c',
    '--color-secondary': '#8f55d0',
    '--gradient-primary': 'linear-gradient(135deg, #613e97, #8f55d0)',
    '--shadow-primary': '0 8px 32px rgba(97, 62, 151, 0.15)',
    '--shadow-secondary': '0 8px 32px rgba(143, 85, 208, 0.15)'
  }
})


const technoLogList = ref([
  { name: 'Vue.js', icon: '/src/assets/svg/vue.svg' },
  { name: 'TypeScript', icon: '/src/assets/svg/ts.svg' },
  { name: 'Node.js', icon: '/src/assets/svg/node.svg' },
  { name: 'CSS', icon: '/src/assets/svg/css.svg' },
  { name: 'HTML', icon: '/src/assets/svg/html.svg' },
  { name: 'JavaScript', icon: '/src/assets/svg/js.svg' }
])


</script>

<style lang='less' scoped>
.about-container {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;


  .about-content {
    margin: 0 auto;
    padding: 80px 20px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 60px;

    @media (min-width: 768px) {
      grid-template-columns: 400px 1fr;
      gap: 80px;
    }
  }

  .profile-card {
    border-radius: 20px;
    padding: 40px;
    text-align: center;
    box-shadow: var(--shadow-primary);
    border: 1px solid var(--color-border);
    height: fit-content;

    .avatar-section {
      margin-bottom: 30px;

      .avatar-wrapper {
        position: relative;
        display: inline-block;
        margin-bottom: 20px;

        .avatar {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid var(--color-border);
          position: relative;
          z-index: 1;
        }

        .avatar-ring {
          position: absolute;
          top: -8px;
          left: -8px;
          width: 166px;
          height: 166px;
          border-radius: 50%;
          background: var(--gradient-primary);
          animation: pulse 3s ease-in-out infinite;
        }
      }

      .name {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--color-heading);
        margin-bottom: 8px;
        background: var(--gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .title {
        font-size: 1.2rem;
        color: var(--color-text-secondary);
        margin-bottom: 25px;
      }

      .social-links {
        display: flex;
        justify-content: center;
        gap: 15px;

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: var(--color-bg-secondary);
          border-radius: 50%;
          text-decoration: none;
          transition: all 0.3s ease;

          &:hover {
            background: var(--gradient-primary);
            transform: translateY(-2px);
          }

          .IconSpan {
            width: 18px;
            height: 18px;
            fill: var(--color-text-primary);
          }
        }
      }
    }

    .motto-section {
      .motto {
        font-size: 1.1rem;
        line-height: 1.8;
        color: var(--color-text-primary);
        font-style: italic;
        position: relative;
        padding: 20px 0;
        border-top: 1px solid var(--color-border);
        margin: 0;

        &::before {
          content: '"';
          position: absolute;
          left: 20px;
          top: 10px;
          font-size: 3em;
          color: var(--color-secondary);
          opacity: 0.3;
          font-family: Georgia, serif;
        }
      }
    }
  }

  .about-sections {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .section {
    border-radius: 20px;
    padding: 30px;
    box-shadow: var(--shadow-primary);
    border: 1px solid var(--color-border);

    .section-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-heading);
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid var(--color-border);

      .IconSpan {
        width: 24px;
        height: 24px;
        fill: var(--color-primary);
      }
    }

    .section-content {
      color: var(--color-text-primary);
      line-height: 1.8;

      p {
        margin-bottom: 15px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 20px;

    .tech-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 20px;
      background: var(--color-bg-secondary);
      border-radius: 12px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-secondary);
      }

      .tech-icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;

        &.vue {
          background: #41B883;
        }

        &.ts {
          background: #3178C6;
        }

        &.node {
          background: #339933;
        }

        &.css {
          background: #1572B6;
        }

        &.html {
          background: #E34C26;
        }

        &.js {
          background: #F7DF1E;
        }

        .IconSpan {
          width: 24px;
          height: 24px;
          fill: white;
        }
      }

      span {
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--color-text-primary);
      }
    }
  }

  .hobby-list {
    display: grid;
    gap: 20px;

    .hobby-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px;
      background: var(--color-bg-secondary);
      border-radius: 12px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateX(5px);
        box-shadow: var(--shadow-secondary);
      }

      .hobby-icon {
        font-size: 2rem;
        width: 60px;
        text-align: center;
      }

      .hobby-info {
        flex: 1;

        h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-heading);
          margin-bottom: 5px;
        }

        p {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          margin: 0;
        }
      }
    }
  }

  .contact-info {
    display: grid;
    gap: 20px;

    .contact-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px;
      background: var(--color-bg-secondary);
      border-radius: 12px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateX(5px);
        box-shadow: var(--shadow-secondary);
      }

      .contact-icon {
        font-size: 1.5rem;
        width: 50px;
        text-align: center;
      }

      .contact-details {
        flex: 1;

        h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-heading);
          margin-bottom: 5px;
        }

        a {
          text-decoration: none;
          transition: color 0.3s ease;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.1;
    }
  }

  // 响应式设计
  @media (max-width: 768px) {
    .about-content {
      padding: 40px 15px;
      gap: 40px;
    }

    .profile-card {
      padding: 30px 20px;

      .avatar-section {
        .avatar-wrapper .avatar {
          width: 120px;
          height: 120px;
        }

        .avatar-wrapper .avatar-ring {
          width: 136px;
          height: 136px;
          top: -8px;
          left: -8px;
        }

        .name {
          font-size: 2rem;
        }
      }
    }

    .section {
      padding: 25px 20px;
    }

    .tech-grid {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 15px;
    }

    .hobby-list .hobby-item,
    .contact-info .contact-item {
      flex-direction: column;
      text-align: center;
      gap: 15px;

      .hobby-icon,
      .contact-icon {
        width: auto;
      }
    }
  }
}
</style>

