import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Mount the app to the container
const mountEl = document.getElementById('app')
if (mountEl) {
  app.mount('#app')
}
