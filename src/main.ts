import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './assets/font/index.css'
// import { InstantSearch } from 'vue-instantsearch'

const app = createApp(App)

// // 初始化 Algolia
// app.use(InstantSearch, {
//   indexName: 'YOUR_INDEX_NAME', // 替换为你的索引名
//   searchClient: algoliasearch(
//     'GQZDTMZ9M6',
//     'd34fa0d761f03fa6be1c3f936869585e'
//   )
// })

const pinia = createPinia()
pinia.use(persistedstate)
app.use(pinia)


app.use(router)
app.use(Antd)
app.mount('#app')
