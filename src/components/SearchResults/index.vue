<template>
  <div class='search-results' v-if='searchResults.length > 0'>
    <div class='search-header'>
      <h3>找到 {{ searchResults.length }} 篇相关文章</h3>
    </div>

    <div class='search-list'>
      <div
        v-for='result in searchResults'
        :key='`${result.category}-${result.id}`'
        class='search-item'
        @click='navigateToArticle(result)'
      >
        <div class='item-header'>
          <h4 v-html='highlightSearchTerm(result.title, searchTerm)'></h4>
          <div class='item-meta'>
            <span class='category'>{{ getCategoryDisplayName(result.category) }}</span>
            <span v-if='result.date' class='date'>{{ formatDate(result.date) }}</span>
          </div>
        </div>

        <p
          v-if='result.description'
          class='description'
          v-html='highlightSearchTerm(result.description, searchTerm)'
        ></p>

        <div class='content-preview'>
          <div v-html='getContentPreview(result.content, searchTerm)'></div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if='hasSearched' class='no-results'>
    <div class='no-results-icon'>🔍</div>
    <h4>未找到相关文章</h4>
    <p>尝试使用其他关键词搜索</p>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { getCategoryDisplayName, highlightSearchTerm } from '/utils/articleUtils'

interface SearchResult {
  id: string
  category: string
  title: string
  description: string
  date: string
  content: string
  path: string
}

const props = defineProps<{
  searchResults: SearchResult[]
  searchTerm: string
  hasSearched: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()

const formatDate = (date: string) => {
  return moment(date).format('YYYY-MM-DD')
}

const navigateToArticle = (result: SearchResult) => {
  router.push(`/article/${result.id}`)
  emit('close')
}

const getContentPreview = (content: string, searchTerm: string) => {
  if (!searchTerm.trim()) return ''

  // 移除HTML标签，获取纯文本
  const plainText = content.replace(/<[^>]*>/g, '')

  // 查找搜索词在内容中的位置
  const searchTermLower = searchTerm.toLowerCase()
  const contentLower = plainText.toLowerCase()
  const index = contentLower.indexOf(searchTermLower)

  if (index === -1) return ''

  // 获取搜索词周围的内容（前后各50个字符）
  const start = Math.max(0, index - 50)
  const end = Math.min(plainText.length, index + searchTerm.length + 50)

  let preview = plainText.substring(start, end)

  // 如果不是从开头开始，添加省略号
  if (start > 0) {
    preview = '...' + preview
  }

  // 如果不是到结尾结束，添加省略号
  if (end < plainText.length) {
    preview = preview + '...'
  }

  // 高亮搜索词
  return highlightSearchTerm(preview, searchTerm)
}
</script>

<style lang='less' scoped>
.search-results {
  max-height: 420px;
  overflow-y: auto;
  background: var(--color-bg-container, #fbf8ed);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(143, 85, 208, 0.08);
  border: 1px solid var(--color-border, #ded0f2);
  backdrop-filter: blur(10px);

  .search-header {
    padding: 18px 24px;
    border-bottom: 1px solid var(--color-border, #ded0f2);
    background: linear-gradient(135deg,
      rgba(143, 85, 208, 0.05),
      rgba(71, 101, 167, 0.05)
    );

    h3 {
      margin: 0;
      color: var(--color-heading, #2c2c2c);
      font-size: 15px;
      font-weight: 600;
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  .search-list {
    .search-item {
      padding: 18px 24px;
      border-bottom: 1px solid var(--color-border, #ded0f2);
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 3px;
        height: 100%;
        background: var(--gradient-secondary);
        transform: translateX(-100%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: linear-gradient(135deg,
          rgba(143, 85, 208, 0.08),
          rgba(97, 62, 151, 0.08)
        );

        &::before {
          transform: translateX(0);
        }
      }

      .item-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 10px;

        h4 {
          margin: 0;
          color: var(--color-heading, #2c2c2c);
          font-size: 16px;
          font-weight: 600;
          line-height: 1.5;
          flex: 1;
          margin-right: 12px;
          transition: color 0.3s ease;

          &:hover {
            color: var(--color-secondary, #8f55d0);
          }

          :deep(mark) {
            background: var(--gradient-strong);
            color: white;
            padding: 2px 4px;
            border-radius: 4px;
            font-weight: 700;
            box-shadow: 0 2px 8px rgba(105, 0, 255, 0.2);
          }
        }

        .item-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-end;
          flex-shrink: 0;

          .category {
            background: var(--gradient-primary);
            color: white;
            padding: 3px 10px;
            border-radius: 14px;
            font-size: 11px;
            font-weight: 500;
            box-shadow: 0 2px 8px rgba(97, 62, 151, 0.2);
            transition: all 0.3s ease;

            &:hover {
              background: var(--gradient-secondary);
              transform: scale(1.05);
              box-shadow: 0 4px 12px rgba(143, 85, 208, 0.3);
            }
          }

          .date {
            color: var(--color-text-secondary, #888);
            font-size: 11px;
            font-weight: 500;
            opacity: 0.8;
          }
        }
      }

      .description {
        margin: 0 0 12px 0;
        color: var(--color-text, #333333);
        font-size: 14px;
        line-height: 1.6;

        :deep(mark) {
          background: var(--gradient-strong);
          color: white;
          padding: 2px 4px;
          border-radius: 3px;
          font-weight: 500;
          box-shadow: 0 1px 6px rgba(105, 0, 255, 0.15);
        }
      }

      .content-preview {
        font-size: 13px;
        color: var(--color-text, #333333);
        line-height: 1.5;
        font-style: italic;
        opacity: 0.85;

        :deep(mark) {
          background: var(--gradient-strong);
          color: white;
          padding: 1px 3px;
          border-radius: 2px;
          font-weight: 500;
          box-shadow: 0 1px 4px rgba(105, 0, 255, 0.1);
        }
      }
    }
  }
}

.no-results {
  text-align: center;
  padding: 48px 24px;
  background: var(--color-bg-container, #fbf8ed);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(143, 85, 208, 0.08);
  border: 1px solid var(--color-border, #ded0f2);

  .no-results-icon {
    font-size: 3.5em;
    margin-bottom: 20px;
    opacity: 0.4;
    filter: hue-rotate(250deg) saturate(150%);
  }

  h4 {
    margin: 0 0 12px 0;
    color: var(--color-heading, #2c2c2c);
    font-size: 17px;
    font-weight: 600;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    margin: 0;
    color: var(--color-text, #333333);
    font-size: 14px;
    opacity: 0.85;
  }
}

// 滚动条样式 - 柔和设计
.search-results::-webkit-scrollbar {
  width: 6px;
}

.search-results::-webkit-scrollbar-track {
  background: rgba(143, 85, 208, 0.05);
  border-radius: 8px;
  margin: 8px 0;
}

.search-results::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #8f55d0, #613e97);
  border-radius: 8px;
  border: none;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #613e97, #4765a7);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

// 暗黑模式适配
:global([data-theme='dark']) {
  .search-results {
    background: var(--color-bg-container, #1a1a1a);
    border-color: var(--color-border, #3a3a3a);
    box-shadow: 0 8px 32px rgba(143, 85, 208, 0.15);

    .search-header {
      border-color: var(--color-border, #3a3a3a);
      background: linear-gradient(135deg,
        rgba(71, 101, 167, 0.1),
        rgba(97, 62, 151, 0.1)
      );

      h3 {
        color: var(--color-heading, #ffffff);
      }
    }

    .search-list {
      .search-item {
        border-color: var(--color-border, #3a3a3a);

        &:hover {
          background: linear-gradient(135deg,
            rgba(71, 101, 167, 0.15),
            rgba(97, 62, 151, 0.15)
          );
        }

        .item-header {
          h4 {
            color: var(--color-heading, #ffffff);

            &:hover {
              color: var(--color-secondary, #8f55d0);
            }
          }

          .item-meta {
            .date {
              color: var(--color-text-secondary, #b8b8b8);
            }
          }
        }

        .description {
          color: var(--color-text-secondary, #b8b8b8);
        }

        .content-preview {
          color: var(--color-text-tertiary, #888888);
        }
      }
    }
  }

  .no-results {
    background: var(--color-bg-container, #1a1a1a);
    border-color: var(--color-border, #3a3a3a);
    box-shadow: 0 8px 32px rgba(143, 85, 208, 0.15);

    h4 {
      color: var(--color-heading, #ffffff);
    }

    p {
      color: var(--color-text-secondary, #b8b8b8);
    }
  }

  .search-results::-webkit-scrollbar-track {
    background: rgba(71, 101, 167, 0.1);
  }

  .search-results::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #4765a7, #613e97);

    &:hover {
      background: linear-gradient(135deg, #613e97, #8f55d0);
    }
  }
}
</style>