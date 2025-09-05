// @ts-ignore
import { groupBy } from '/utils/data.ts'

export const getFilePath = () => {
  let modules: any[] = []
  let navList: any[] = []

  // 获取 src/views 下所有.vue文件（包含子目录）
  let glob = import.meta.glob('/src/article/**/**/**/**', { eager: true })

  // 动态加载组件示例
  Object.entries(glob).forEach(([path, module]) => {
    let file = path.replace('/src/article/', '').split('/').filter(p => !p.endsWith('.md'))
    let MdFile = path.replace('/src/article/', '').split('/').filter(p => p.endsWith('.md'))
    let yaml = path.replace('/src/article/', '').split('/').filter(p => p.endsWith('.yaml'))

    // 导航分类
    if (file.length !== 0 && yaml[0]) {
      // @ts-ignore
      let val: any = module.default
      navList.push({ title: file[0], ...val, path, module, file, tag: file[0], yaml })
    }

    // 文件分解
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
    navList: menu
  }
}
