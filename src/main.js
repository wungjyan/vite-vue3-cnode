import { createApp } from 'vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import App from './App.vue'
import 'amfe-flexible'
import { registerVant } from '@/vant/index.js'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

const app = createApp(App)

registerVant(app)

app.config.globalProperties.$dayjs = dayjs

app.use(router).use(store).mount('#app')
