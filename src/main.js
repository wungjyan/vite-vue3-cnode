import { createApp } from 'vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import App from './App.vue'
import 'amfe-flexible'
import { registerVant } from '@/vant/index.js'

const app = createApp(App)

registerVant(app)

app.use(router).use(store).mount('#app')
