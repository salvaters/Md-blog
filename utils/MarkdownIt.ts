import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { v4 as uuidV4 } from 'uuid'

export const mdConfig = () => {
  let md = new MarkdownIt({
    html: true, // 支持 HTML 标签
    xhtmlOut: true, // 使用 XHTML 语法
    breaks: true, // 支持换行符
    langPrefix: 'language-', // 代码块语言前缀
    linkify: true, // 自动识别链接
    typographer: true, // 启用一些智能标点符号转换
    quotes: '“”‘’', // 引号样式
    highlight: function(str, langs) {
      let lang = langs || 'plaintext' // 如果没有语言，默认显示 'plaintext'
      let codeContent = ''
      if (lang && hljs.getLanguage(lang)) {
        try {
          // 使用 highlight.js 高亮代码
          codeContent = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        } catch (error) {
          console.error('Highlight.js error:', error)
          // 高亮失败时，转义 HTML
          codeContent = md.utils.escapeHtml(str)
        }
      } else {
        // 无语言时，转义 HTML
        codeContent = md.utils.escapeHtml(str)
      }
      let uid = uuidV4()
      let topMes = `<div class='code-block'><div>${lang}</div><div prop-id='${uid}'  class='copy-button'>复制</div></div>`
      return `<div class='hljsMain'>${topMes}<pre prop-id='${uid}' class='hljs'><code class='language-${lang}'>${codeContent}</code></pre></div>`
    }
  })
  return md
}
