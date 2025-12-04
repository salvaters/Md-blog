<template>
  <div class='homePage'>
    <div class='children-box'>
      <div v-for='item in children' class='book-box' data-aos='zoom-in-down'>
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
  </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon/index.vue'
import book from '@/assets/svg/book.svg'
import { Book, BookDescription, BookHeader, BookTitle } from '@/components/motion/3dBook/index'
import { storeToRefs } from 'pinia'
import { navStore } from '@/stores/navStore.ts'
import { useCounterStore } from '@/stores/counter.ts'
import moment from 'moment'
// @ts-ignore
import AOS from 'aos'
import 'aos/dist/aos.css'

const router = useRouter()
const store = navStore()
const storeTheme = useCounterStore()
const { currentNav } = storeToRefs(store)
const { isLightTheme } = storeToRefs(storeTheme)
AOS.init()


let children = computed(() => {
  const map = new Map()
  // @ts-ignore - currentNav 可能有 children 属性
  let children = currentNav.value.children || []
  map.set('value', children)
  AOS.refresh()
  return map.get('value')
})

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

</script>


<style lang='less'>
.homePage {

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
}
</style>
