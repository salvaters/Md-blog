import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import vueDevTools from 'vite-plugin-vue-devtools'
import { mdConfig } from './utils/MarkdownIt'
import tailwindcss from '@tailwindcss/vite'
import matter from 'gray-matter'
import dynamicImport from 'vite-plugin-dynamic-import'
import yaml from '@rollup/plugin-yaml'

export default defineConfig({
  plugins: [
    // include: [/\.vue$/, /\.md$/],
    vue({}),
    vueJsx(),
    // vueDevTools(),
    tailwindcss(),
    dynamicImport(),
    yaml(),
    {
      name: 'vite-md-plugin',
      transform(raw, id) {
        if (!id.endsWith('.md')) return
        const { data, content } = matter(raw)
        const md = mdConfig()
        const html = md.render(content)
        return `export default ${JSON.stringify({
          frontmatter: data,
          html
        })}`
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        // additionalData: `@import "@/assets/less/variables.less";`,
        math: 'always'
      }
    }
  },
  optimizeDeps: {
    include: ['highlight.js/lib/core']
  },
  server: {
    port: 9965,
    host: '0.0.0.0' // 监听所有网络接口
  }
})
