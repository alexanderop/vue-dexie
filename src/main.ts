import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './index.css'
import './assets/main.css'

import { registerSW } from 'virtual:pwa-register'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const updateSW = registerSW({
  onNeedRefresh() {
    // Prompt user to update
  },
  onOfflineReady() {
    // Notify user app is ready for offline use
  },
})

app.mount('#app')
