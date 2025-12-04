// @ts-ignore
import { groupBy } from '/utils/data.ts'
// @ts-ignore
import { getArticleCategories } from '/utils/articleUtils.ts'

export const getFilePath = async () => {
  let modules: any[] = []
  let navList: any[] = []

  // 获取所有文章分类
  const categories = await getArticleCategories()

  // 获取所有文章文件
  let glob = import.meta.glob([
    '/src/article/**/*.md',
    '/src/article/**/*.yaml'
  ], { eager: true })

  // 动态加载组件示例
  Object.entries(glob).forEach(([path, module]) => {
    let file = path.replace('/src/article/', '').split('/').filter(p => !p.endsWith('.md'))
    let MdFile = path.replace('/src/article/', '').split('/').filter(p => p.endsWith('.md'))
    let yaml = path.replace('/src/article/', '').split('/').filter(p => p.endsWith('.yaml'))

    // 导航分类 - 只处理有 config.yaml 的分类
    if (file.length !== 0 && yaml[0]) {
      const categoryName = file[0]
      // @ts-ignore
      let val: any = module.default
      navList.push({
        title: val.title || categoryName,
        ...val,
        path,
        module,
        file,
        tag: categoryName,
        yaml,
        categoryName // 添加原始分类名
      })
    }

    // 文件分解 - 只处理 .md 文件
    if (file.length !== 0 && MdFile.length !== 0) {
      let tag = file[0]
      modules.push({ tag, MdFile, path, text: module })
    }
  })

  let groupData = groupBy(modules, 'tag')

  let menu = navList.map(item => {
    return { ...item, children: groupData[item.tag] }
  })

  return {
    modules: groupData,
    navList: menu,
    categories // 返回所有可用分类
  }
}
