import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'

createApp(App)
    .use(router) 
    .use(store) // 이 부분
    .mount('#app')