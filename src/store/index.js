 import {createStore} from 'vuex'
 // movie.js, about.js 파일을 모듈로 불러오기
 import movie from './movie'
 import about from './about'

export default createStore({
    modules:{
        movie,
        about
    }
})  