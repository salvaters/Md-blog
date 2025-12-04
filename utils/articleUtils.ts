// 文章工具函数

// 获取所有文章分类目录
export const getArticleCategories = async () => {
  try {
    // 扫描所有包含 config.yaml 的目录
    // @ts-ignore
    const configGlob = import.meta.glob('/src/article/**/config.yaml', { eager: true })
    const categories: string[] = []

    Object.keys(configGlob).forEach(path => {
      // 从路径中提取分类名: /src/article/JavaScript/config.yaml -> JavaScript
      const categoryName = path.replace('/src/article/', '').replace('/config.yaml', '').split('/')[0]
      if (categoryName && !categories.includes(categoryName)) {
        categories.push(categoryName)
      }
    })

    return categories.sort() // 按字母顺序排序
  } catch (error) {
    console.error('获取文章分类失败:', error)
    return []
  }
}

// 动态生成文章加载路径
export const generateArticlePaths = (articleId: string, categories: string[]) => {
  const paths: string[] = []

  // 为每个分类生成路径
  categories.forEach(category => {
    paths.push(`/src/article/${category}/${articleId}.md`)
  })

  // 添加根目录路径作为最后的尝试
  paths.push(`/src/article/${articleId}.md`)

  return paths
}

// 检测文章所属分类
export const detectArticleCategory = async (articleId: string, categories: string[]) => {
  for (const category of categories) {
    try {
      const path = `/src/article/${category}/${articleId}.md`
      await import(/* @vite-ignore */ path)
      return category
    } catch (e) {
      // 继续尝试下一个分类
    }
  }

  try {
    // 尝试根目录
    await import(/* @vite-ignore */ `/src/article/${articleId}.md`)
    return 'root'
  } catch (e) {
    return ''
  }
}

// 搜索文章
export const searchArticles = async (query: string) => {
  if (!query.trim()) return []

  try {
    const searchResults: any[] = []

    // 静态获取所有文章文件
    // @ts-ignore
    const allArticlesGlob = import.meta.glob('/src/article/**/*.md', { eager: true })

    Object.entries(allArticlesGlob).forEach(([path, module]: [string, any]) => {
      const articleData = module.default

      if (articleData && articleData.frontmatter && articleData.html) {
        const searchText = `
          ${articleData.frontmatter.title || ''}
          ${articleData.frontmatter.description || ''}
          ${articleData.html}
        `.toLowerCase()

        const queryLower = query.toLowerCase()

        // 检查是否匹配
        if (searchText.includes(queryLower)) {
          // 解析路径获取分类和文章ID
          const pathParts = path.replace('/src/article/', '').split('/')

          let category = 'root'
          let articleId = ''

          if (pathParts.length === 2) {
            // 根目录文章: /src/article/article.md
            articleId = pathParts[1].replace('.md', '')
          } else if (pathParts.length === 3) {
            // 分类目录文章: /src/article/category/article.md
            category = pathParts[0]
            articleId = pathParts[1].replace('.md', '')
          }

          searchResults.push({
            id: articleId,
            category: category,
            title: articleData.frontmatter.title || articleId,
            description: articleData.frontmatter.description || '',
            date: articleData.frontmatter.date || '',
            content: articleData.html,
            path: path
          })
        }
      }
    })

    // 按日期排序（最新的在前）
    return searchResults.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })

  } catch (error) {
    console.error('搜索文章失败:', error)
    return []
  }
}

// 高亮搜索关键词
export const highlightSearchTerm = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) return text

  const regex = new RegExp(`(${searchTerm})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

// 获取分类的显示名称
export const getCategoryDisplayName = (category: string) => {
  const displayNames: { [key: string]: string } = {
    'JavaScript': 'JavaScript',
    'Css': 'CSS',
    'Html': 'HTML',
    'TypeScript': 'TypeScript',
    'Vue': 'Vue.js',
    'React': 'React',
    'Node': 'Node.js',
    'Python': 'Python',
    'Java': 'Java',
    'Go': 'Go',
    'Rust': 'Rust',
    'Docker': 'Docker',
    'Git': 'Git',
    'Linux': 'Linux',
    'Database': '数据库',
    'Algorithm': '算法',
    'Design': '设计',
    'Tool': '工具',
    'root': '其他'
  }

  return displayNames[category] || category
}
