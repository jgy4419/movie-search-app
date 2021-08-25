<template>
    <div class="container">
        <!-- no-result라는 클래스를 특정한 데이터를 기준으로 해서 출력울 할 것인데 
        그 데이터는 movies의 length 속성이 없는 경우에만 no-result라는 클래스가 추가 되도록 정리.
        movies는 영화의 목록을 가지고 있는 데이터이다. 그 데이터의 개수를 선택해서 0이면 목록이 없다는 뜻이고 그러면
        no-result가 출력이 되어야 하니 반대되는 의미인 !를 넣어줬다.-->
        <!--영화 제목이 없는 경우에 true가 돼서 클래스가 출력이 된다.-->
        <div 
            :class="{'no-result' : !movies.length}" 
            class="inner">
            <Loader v-if="loading"/>
            <!--메시지가 표시가 되어져 있을 때는 영화의 목록이 나타나지 않고, 메시지가 없는 경우에만 목록이 나타나도록 지정.-->
            <div 
                v-if="message"
                class="message">
                {{ message }}
            </div>
            <div 
            v-else
            class="movies">
                <MovieItem 
                    v-for="movie in movies" 
                    :key="movie.imdbID"
                    :movie="movie"/>
            <!--위에 :movie 를 추가 MovieItem은 이제 movie라는 이름으로 데이터를 받을 수 있다.-->
            </div>
        </div>
    </div>
</template>

<script>
import MovieItem from '~/components/MovieItem'
import Loader from '~/components/Loader'
export default {
    components: {
        MovieItem,
        Loader
    },
    computed: {
        /* movies()로 이렇게 계산된 데이터로 정의해준다. 이렇게 해주는 이유는 
        return에서 movies라는 상태는 movie.js에서 보면 []빈 배열 데이터이다.*/
        movies(){
            return this.$store.state.movie.movies
        },
        message() {
            // 메시지의 내용이 변경이 되면 위에 div class = "message"부분에 해당하는 내용이 출력된다.
            return this.$store.state.movie.message
        },
        loading(){
            return this.$store.state.movie.loading
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";
/* 내부에 있는 각각의 movieItem이 수평정렬이 될 수 있도록 만들기. */
.container{
    margin-top: 30px;
    .inner{
        background-color: $gray-200;
        padding: 10px 0;
        border-radius: 4px;
        text-align: center;
        // 영화가 없는 경우에는 메시지가 메시지가 출력될 때는 위 아래 padding이 많은 상태로 만들기.
        &.no-result{
            padding: 70px 0;
        }
    }    
    .message{
        color: $gray-400;
        font-size: 20px;
    }
    .movies{
        display: flex; // 기본적으로 flex는 한 줄의 수평 내용만 적용이되기 때문에 
        flex-wrap: wrap; // 줄 바꿈이 가능하도록 다음과 같이 정의
        justify-content: center;
    }
}

</style>