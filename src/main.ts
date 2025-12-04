import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './assets/font/index.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(persistedstate)
app.use(pinia)
app.use(router)
app.use(Antd)
app.mount('#app')
