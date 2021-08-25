import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import loadImage from './plugins/loadImage'

createApp(App)
// 자주 사용하는 플러그인들
    .use(router)  // ㅇㅕ기에 등록하면 다른 파일에서 router을 사용할 때  $router로 적어서 vue 컴포넌트 내부에서 this와 함께 사용 가능하게 만들어준다.
    .use(store) // $store 
    .use(loadImage) // $loadImage
    .mount('#app')