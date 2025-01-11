import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'



const app = createApp(App)


// 註冊 Element Plus 圖標
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 設置繁體中文
app.use(ElementPlus, {
  locale: zhTw,
})

app.use(router)
app.mount('#app')