import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            // 영화의 따라서 id가 변경될 수 있으므로 이 부분의 주소를 동적으로 변경될 수 있는 주로소 바꿔줘야 된다.
            // 그때 작석할 수 있는 것이 :으로 시작하는 파라미터 이름이다. : 뒤쪽의 이름은 변수처럼 내가 원하는 이름으로 정의해줄 수 있다.
            path: '/movie/:id',
            component: Movie
        },
        {
            path: '/about',
            component: About
        }
    ]
})