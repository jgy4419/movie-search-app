<template>
    <div class="container">
        <div class="inner">
            <MovieItem 
            v-for="movie in movies" 
            :key="movie.imdbID"
            :movie="movie"/>
            <!--위에 :movie 를 추가 MovieItem은 이제 movie라는 이름으로 데이터를 받을 수 있다.-->
        </div>
    </div>
</template>

<script>
import MovieItem from '~/components/MovieItem'
export default {
    components: {
        MovieItem
    },
    computed: {
        /* movies()로 이렇게 계산된 데이터로 정의해준다. 이렇게 해주는 이유는 
        return에서 movies라는 상태는 movie.js에서 보면 []빈 배열 데이터이다.*/
        movies(){
            return this.$store.state.movie.movies
        }
    }
}
</script>